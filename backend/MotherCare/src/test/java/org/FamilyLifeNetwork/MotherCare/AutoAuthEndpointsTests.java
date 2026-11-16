package org.FamilyLifeNetwork.MotherCare;

import com.autoauth.config.AutoAuthProperties;
import com.autoauth.jwt.JwtGenerator;
import com.autoauth.jwt.JwtKeyProvider;
import com.autoauth.model.AutoAuthUser;
import com.jayway.jsonpath.JsonPath;
import jakarta.servlet.http.Cookie;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles({"test", "autoauth-demo"})
class AutoAuthEndpointsTests {
    private static final String BASE = "/api/test/auth";
    private static final AutoAuthUser USER = new AutoAuthUser("test-user", List.of("USER"), Map.of());
    private static final KeyPair KEYS = generateKeys();

    @Autowired MockMvc mvc;
    @Autowired JwtGenerator generator;
    @Autowired JwtKeyProvider keyProvider;
    @Autowired AutoAuthProperties properties;

    @DynamicPropertySource
    static void disposableKeys(DynamicPropertyRegistry registry) {
        registry.add("autoauth.private-key", () -> pem("PRIVATE KEY", KEYS.getPrivate().getEncoded()));
        registry.add("autoauth.public-key", () -> pem("PUBLIC KEY", KEYS.getPublic().getEncoded()));
    }

    @Test
    void publicAccessDoesNotExposeOtherMethodsOrProtectedRoutes() throws Exception {
        mvc.perform(get(BASE + "/public")).andExpect(status().isOk());
        mvc.perform(get(BASE + "/me")).andExpect(status().isUnauthorized());
        MvcResult csrf = bootstrap();
        mvc.perform(post(BASE + "/public").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void bearerIdentityAndRolesAreEnforced() throws Exception {
        String token = generator.generateAccessToken(USER);
        mvc.perform(get(BASE + "/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.userId").value("test-user"));
        mvc.perform(get(BASE + "/admin").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
        mvc.perform(get(BASE + "/all-roles").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
        String admin = generator.generateAccessToken(new AutoAuthUser("admin", List.of("USER", "ADMIN"), Map.of()));
        mvc.perform(get(BASE + "/admin").header("Authorization", "Bearer " + admin)).andExpect(status().isOk());
        mvc.perform(get(BASE + "/all-roles").header("Authorization", "Bearer " + admin)).andExpect(status().isOk());
    }

    @Test
    void invalidAndWrongPurposeCredentialsFail() throws Exception {
        mvc.perform(get(BASE + "/me").header("Authorization", "Bearer invalid"))
                .andExpect(status().isUnauthorized());
        mvc.perform(get(BASE + "/me").header("Authorization", "Bearer " + generator.generateRefreshToken(USER)))
                .andExpect(status().isUnauthorized());
        mvc.perform(get(BASE + "/me").cookie(new Cookie("AUTOAUTH_REFRESH", generator.generateRefreshToken(USER))))
                .andExpect(status().isUnauthorized());
        mvc.perform(get(BASE + "/me").cookie(new Cookie("AUTOAUTH", generator.generateAccessToken(USER)))
                        .header("Authorization", "Bearer invalid"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void expiredCookieIsIgnoredOnlyOnPublicRoutes() throws Exception {
        Clock past = Clock.fixed(Instant.now().minus(Duration.ofDays(1)), ZoneOffset.UTC);
        String expired = new JwtGenerator(keyProvider, properties, past).generateAccessToken(USER);
        mvc.perform(get(BASE + "/me").cookie(new Cookie("AUTOAUTH", expired))).andExpect(status().isUnauthorized());
        mvc.perform(get(BASE + "/public").cookie(new Cookie("AUTOAUTH", expired))).andExpect(status().isOk());
        mvc.perform(get(BASE + "/public").header("Authorization", "Bearer " + expired)).andExpect(status().isUnauthorized());
    }

    @Test
    void loginRequiresCsrfAndIssuesHttpOnlyCookies() throws Exception {
        mvc.perform(post(BASE + "/login").contentType("application/json")
                .content("{\"username\":\"user\",\"password\":\"demo-password\"}"))
                .andExpect(status().isForbidden());
        MvcResult csrf = bootstrap();
        MvcResult login = mvc.perform(post(BASE + "/login").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)).contentType("application/json")
                        .content("{\"username\":\"user\",\"password\":\"demo-password\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.roles[0]").value("USER")).andReturn();
        assertTrue(login.getResponse().getCookie("AUTOAUTH").isHttpOnly());
        assertTrue(login.getResponse().getCookie("AUTOAUTH_REFRESH").isHttpOnly());
        mvc.perform(get(BASE + "/me").cookie(login.getResponse().getCookie("AUTOAUTH")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.userId").value("demo-user"));
    }

    @Test
    void invalidLoginAndLogout() throws Exception {
        MvcResult csrf = bootstrap();
        mvc.perform(post(BASE + "/login").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)).contentType("application/json")
                        .content("{\"username\":\"admin\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());
        mvc.perform(post(BASE + "/logout")).andExpect(status().isForbidden());
        mvc.perform(post(BASE + "/logout").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)))
                .andExpect(status().isOk()).andExpect(cookie().maxAge("AUTOAUTH", 0))
                .andExpect(cookie().maxAge("AUTOAUTH_REFRESH", 0));
    }

    private MvcResult bootstrap() throws Exception {
        return mvc.perform(get("/autoauth/csrf")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void refreshReloadsDemoRolesAfterAccessExpiryAndRejectsDuplicateInput() throws Exception {
        MvcResult csrf = bootstrap();
        AutoAuthUser stale = new AutoAuthUser("demo-user", List.of("ADMIN"), Map.of());
        String refresh = generator.generateRefreshToken(stale);
        String expired = new JwtGenerator(keyProvider, properties,
                Clock.fixed(Instant.now().minus(Duration.ofDays(1)), ZoneOffset.UTC)).generateAccessToken(stale);
        mvc.perform(post(BASE + "/refresh").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"),
                        new Cookie("AUTOAUTH", expired), new Cookie("AUTOAUTH_REFRESH", refresh))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.roles.length()").value(1))
                .andExpect(jsonPath("$.roles[0]").value("USER"));
        mvc.perform(post(BASE + "/refresh").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"),
                        new Cookie("AUTOAUTH_REFRESH", refresh), new Cookie("AUTOAUTH_REFRESH", refresh))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)))
                .andExpect(status().isUnauthorized());
        mvc.perform(post(BASE + "/refresh").cookie(csrf.getResponse().getCookie("XSRF-TOKEN"))
                        .header("X-XSRF-TOKEN", csrfToken(csrf)))
                .andExpect(status().isUnauthorized());
    }

    private String csrfToken(MvcResult result) throws Exception {
        return JsonPath.read(result.getResponse().getContentAsString(), "$.token");
    }

    private static KeyPair generateKeys() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            return generator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static String pem(String type, byte[] bytes) {
        return "-----BEGIN " + type + "-----\n" + Base64.getMimeEncoder(64, new byte[]{'\n'}).encodeToString(bytes)
                + "\n-----END " + type + "-----";
    }
}
