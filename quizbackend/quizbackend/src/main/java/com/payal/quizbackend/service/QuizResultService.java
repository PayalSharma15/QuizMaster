package com.payal.quizbackend.service;

import com.payal.quizbackend.entity.QuizResult;
import com.payal.quizbackend.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;

    public QuizResultService(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    public QuizResult saveResult(QuizResult result) {
        return quizResultRepository.save(result);
    }

    public List<QuizResult> getLeaderboard() {
        return quizResultRepository.findAllByOrderByScoreDesc();
    }

    public List<QuizResult> getQuizHistory(String email) {
        return quizResultRepository.findByEmailOrderByIdDesc(email);
    }
    public List<QuizResult> getUserDashboard(String email) {
    return quizResultRepository.findByEmailOrderByIdDesc(email);
}
}