package com.payal.quizbackend.service;

import com.payal.quizbackend.entity.QuizResult;
import com.payal.quizbackend.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;

    public QuizResultService(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    public QuizResult saveResult(QuizResult result) {
        return quizResultRepository.save(result);
    }
}