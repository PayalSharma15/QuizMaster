package com.payal.quizbackend.service;

import com.payal.quizbackend.entity.User;
import com.payal.quizbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }
    public User loginUser(User user) {

    return userRepository.findByEmail(user.getEmail())
            .filter(existingUser -> existingUser.getPassword().equals(user.getPassword()))
            .orElse(null);
}
}
