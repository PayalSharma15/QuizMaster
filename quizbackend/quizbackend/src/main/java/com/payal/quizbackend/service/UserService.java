
package com.payal.quizbackend.service;

import com.payal.quizbackend.entity.User;
import com.payal.quizbackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User registerUser(User user) {

        if (user.getEmail() == null ||
            user.getEmail().isBlank()) {
            throw new IllegalArgumentException(
                "Email is required."
            );
        }

        if (user.getPassword() == null ||
            user.getPassword().isBlank()) {
            throw new IllegalArgumentException(
                "Password is required."
            );
        }

        String email = user.getEmail().trim().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new DuplicateEmailException(
                "This email is already registered. Please login."
            );
        }

        user.setEmail(email);
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        // Never allow public registration to create an admin.
        user.setRole("USER");

        return userRepository.save(user);
    }

    public User loginUser(User user) {

        if (user.getEmail() == null ||
            user.getPassword() == null) {
            return null;
        }

        String email = user.getEmail().trim().toLowerCase();

        return userRepository.findByEmail(email)
            .filter(existingUser ->
                existingUser.getPassword() != null &&
                passwordEncoder.matches(
                    user.getPassword(),
                    existingUser.getPassword()
                )
            )
            .orElse(null);
    }

    public static class DuplicateEmailException
            extends RuntimeException {

        public DuplicateEmailException(String message) {
            super(message);
        }
    }
}
