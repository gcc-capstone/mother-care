package org.FamilyLifeNetwork.MotherCare;

import com.autoauth.annotation.PublicEndpoint;
import com.autoauth.annotation.RequiresRole;
import com.autoauth.jwt.JwtCookies;
import com.autoauth.jwt.JwtGenerator;
import com.autoauth.jwt.JwtValidator;
import com.autoauth.config.AutoAuthProperties;
import com.autoauth.exception.JwtValidationException;
import com.autoauth.model.AutoAuthUser;
import com.autoauth.util.AuthContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Disposable accounts for manually exercising AutoAuth; enabled only by explicit profile. */
@Profile("autoauth-demo")
@RestController
@RequestMapping("/api/test/auth")
public class AutoAuthTestController {
    private final JwtGenerator jwtGenerator;
    private final JwtCookies jwtCookies;
    private final JwtValidator jwtValidator;
    private final AutoAuthProperties properties;

    public AutoAuthTestController(JwtGenerator jwtGenerator, JwtCookies jwtCookies,
                                  JwtValidator jwtValidator, AutoAuthProperties properties) {
        this.jwtGenerator = jwtGenerator;
        this.jwtCookies = jwtCookies;
        this.jwtValidator = jwtValidator;
        this.properties = properties;
    }

    @PublicEndpoint
    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of("message", "AutoAuth public endpoint is working");
    }

    @PublicEndpoint
    @PostMapping("/login")
    public AutoAuthUser login(@RequestBody LoginRequest request, HttpServletResponse response) {
        // Identities and roles come from these demo accounts, never from request claims.
        AutoAuthUser user = demoAccount("demo-" + request.username());
        if (user == null || !"demo-password".equals(request.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid demo credentials");
        }
        jwtCookies.write(response, jwtGenerator.generateTokenPair(user));
        response.setHeader("Cache-Control", "no-store");
        return user;
    }

    @PublicEndpoint
    @PostMapping("/refresh")
    public AutoAuthUser refresh(HttpServletRequest request, HttpServletResponse response) {
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (properties.getRefreshCookieName().equals(cookie.getName())) {
                    if (token != null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Duplicate refresh cookies");
                    }
                    token = cookie.getValue();
                }
            }
        }
        if (token == null || token.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing refresh cookie");
        }
        AutoAuthUser user;
        try {
            user = demoAccount(jwtValidator.validateRefreshToken(token).userId());
        } catch (JwtValidationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh credential");
        }
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unknown demo account");
        }
        // Stateless demo policy: older tokens remain usable until expiry; no revocation or replay store.
        jwtCookies.write(response, jwtGenerator.generateTokenPair(user));
        response.setHeader("Cache-Control", "no-store");
        return user;
    }

    private AutoAuthUser demoAccount(String userId) {
        return switch (userId) {
            case "demo-user" -> new AutoAuthUser(userId, List.of("USER"), Map.of("tenantId", "demo"));
            case "demo-admin" -> new AutoAuthUser(userId, List.of("USER", "ADMIN"), Map.of("tenantId", "demo"));
            default -> null;
        };
    }

    @GetMapping("/me")
    public AutoAuthUser currentUser() {
        return AuthContext.getCurrentUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

    @RequiresRole("ADMIN")
    @GetMapping("/admin")
    public Map<String, String> admin() {
        return Map.of("message", "Admin access granted");
    }

    @RequiresRole(value = {"USER", "ADMIN"}, requireAll = true)
    @GetMapping("/all-roles")
    public Map<String, String> allRoles() {
        return Map.of("message", "USER and ADMIN access granted");
    }

    @PublicEndpoint
    @PostMapping("/logout")
    public Map<String, String> logout(HttpServletResponse response) {
        jwtCookies.clear(response);
        response.setHeader("Cache-Control", "no-store");
        return Map.of("message", "Authentication cookies cleared");
    }

    public record LoginRequest(String username, String password) {}
}
