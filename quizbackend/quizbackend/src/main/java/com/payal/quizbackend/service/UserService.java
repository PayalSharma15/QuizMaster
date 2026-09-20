package com.payal.quizbackend.service;

import com.payal.quizbackend.entity.User;
import com.payal.quizbackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        String encodedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public User loginUser(User user) {

        return userRepository.findByEmail(user.getEmail())
                .filter(existingUser ->
                        passwordEncoder.matches(
                                user.getPassword(),
                                existingUser.getPassword()
                        )
                )
                .orElse(null);
    }
}