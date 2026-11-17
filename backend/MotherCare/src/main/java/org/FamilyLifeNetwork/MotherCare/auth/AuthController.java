package org.FamilyLifeNetwork.MotherCare.auth;

import org.FamilyLifeNetwork.MotherCare.auth.dto.*;

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
import jakarta.validation.Valid;

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

    private final JwtCookies jwtCookies;
    private final AutoAuthProperties properties;
    private final AuthService authService;

    public AuthController(
            JwtCookies jwtCookies,
            AutoAuthProperties properties,
            AuthService authService
    ) {
        this.jwtCookies = jwtCookies;
        this.properties = properties;
        this.authService = authService;
    }

    @PublicEndpoint
    @PostMapping("/register")
    public ResponseEntity<Void> register(
        @Valid @RequestBody RegisterRequest request,
        HttpServletResponse response
    ) {
        var tokens = authService.register(request.getUsername(), request.getPassword());
        if (tokens.isEmpty()) {
            return ResponseEntity.status(403).build();
        }

        jwtCookies.write(response, tokens.get());
        return ResponseEntity.noContent().build();
    }

    @PublicEndpoint
    @PostMapping("/login")
    public ResponseEntity<Void> login(
        @RequestBody LoginRequest request,
        HttpServletResponse response
    ){
        var tokens = authService.login(request.getUsername(), request.getPassword());
        if (tokens.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        jwtCookies.write(response, tokens.get());
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

        var tokens = authService.refresh(refreshToken);
        if (tokens.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        jwtCookies.write(response, tokens.get());
        return ResponseEntity.noContent().build();
    }
}