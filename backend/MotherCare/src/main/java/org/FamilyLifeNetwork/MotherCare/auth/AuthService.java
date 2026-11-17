package org.FamilyLifeNetwork.MotherCare.auth;

import org.FamilyLifeNetwork.MotherCare.user.UserService;

import com.autoauth.exception.JwtValidationException;
import com.autoauth.jwt.JwtGenerator;
import com.autoauth.jwt.JwtValidator;
import com.autoauth.model.AutoAuthUser;
import com.autoauth.model.TokenPair;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtValidator jwtValidator;
    private final JwtGenerator jwtGenerator;
    private final UserService userService;

    public Optional<TokenPair> refresh(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return Optional.empty();
        }

        AutoAuthUser subject;
        try {
            subject = jwtValidator.validateRefreshToken(refreshToken);
        } catch (JwtValidationException ex) {
            return Optional.empty();
        }

        return userService.findEnabledIdentity(subject.userId())
                .map(jwtGenerator::generateTokenPair);
    }

}