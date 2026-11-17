package org.FamilyLifeNetwork.MotherCare.auth;

// import org.FamilyLifeNetwork.MotherCare.user.UserService;

import com.autoauth.annotation.PublicEndpoint;
import com.autoauth.config.AutoAuthProperties;
import com.autoauth.exception.JwtValidationException;
import com.autoauth.jwt.JwtCookies;
import com.autoauth.jwt.JwtGenerator;
import com.autoauth.jwt.JwtValidator;
import com.autoauth.model.AutoAuthUser;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mother-care/api/v1/auth")
public class AuthController {

    private static final AutoAuthUser DEMO_ADMIN = new AutoAuthUser(
            "00000000-0000-4000-8000-000000000001",
            List.of("ADMIN"),
            Map.of()
    );

    private final JwtValidator jwtValidator;
    private final JwtCookies jwtCookies;
    private final AutoAuthProperties properties;
    private final JwtGenerator jwtGenerator;
    // private final UserService userService;

    public AuthController(
            JwtValidator jwtValidator,
            JwtCookies jwtCookies,
            AutoAuthProperties properties,
            JwtGenerator jwtGenerator
            // , UserService userService
    ) {
        this.jwtValidator = jwtValidator;
        this.jwtCookies = jwtCookies;
        this.properties = properties;
        this.jwtGenerator = jwtGenerator;
        // this.userService = userService;
    }

    public record LoginRequest(String username, String password) {}

    @PublicEndpoint
    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        // Local test only. Replace with database-backed password verification.
        if (!"admin".equals(request.username())
                || !"password123".equals(request.password())) {
            return ResponseEntity.status(401).build();
        }

        jwtCookies.write(response, jwtGenerator.generateTokenPair(DEMO_ADMIN));
        return ResponseEntity.noContent().build();
    }

    @PublicEndpoint
    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String cookieName = properties.getRefreshCookieName();
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    if (refreshToken != null) {
                        return ResponseEntity.status(401).build();
                    }
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null || refreshToken.isBlank()) {
            return ResponseEntity.status(401).build();
        }

        AutoAuthUser user;
        try {
            user = jwtValidator.validateRefreshToken(refreshToken);
        } catch (JwtValidationException ex) {
            return ResponseEntity.status(401).build();
        }

        // Restore this block when the database is ready.
        /*
        var identity = userService.findEnabledIdentity(user.userId());
        if (identity.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        jwtCookies.write(response, jwtGenerator.generateTokenPair(identity.get()));
        return ResponseEntity.noContent().build();
        */

        // Local test only. Remove this block when restoring the lookup above.
        if (!DEMO_ADMIN.userId().equals(user.userId())) {
            return ResponseEntity.status(401).build();
        }

        jwtCookies.write(response, jwtGenerator.generateTokenPair(DEMO_ADMIN));
        return ResponseEntity.noContent().build();
    }
}