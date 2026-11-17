package org.FamilyLifeNetwork.MotherCare.user;

import org.FamilyLifeNetwork.MotherCare.user.enums.*;

import com.autoauth.model.AutoAuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Optional<AutoAuthUser> findEnabledIdentity(String subject) {
        UUID userId;

        try {
            userId = UUID.fromString(subject);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }

        return userRepository.findById(userId)
            .filter(User::isEnabled)
            .map(user -> new AutoAuthUser(
                user.getId().toString(),
                user.getRoles().stream().map(UserRole::name).toList(),
                Map.of()
            ));
    }

    @Transactional(readOnly = true)
    public Optional<AutoAuthUser> authenticate(String username, String password) {
        if (username == null || username.isBlank() || password == null || password.isEmpty()) {
            return Optional.empty();
        }

        return userRepository.findByUsername(username)
            .filter(User::isEnabled)
            .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()))
            .map(this::toAutoAuthUser);
    }

    private AutoAuthUser toAutoAuthUser(User user){
        return new AutoAuthUser (
            user.getId().toString(),
            user.getRoles().stream().map(UserRole::name).toList(),
            Map.of()
        );
    }
}