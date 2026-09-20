package com.payal.quizbackend.controller;

import com.payal.quizbackend.entity.QuizResult;
import com.payal.quizbackend.service.QuizResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class QuizResultController {

    private final QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    @PostMapping
    public QuizResult saveResult(@RequestBody QuizResult result) {
        return quizResultService.saveResult(result);
    }

    @GetMapping("/leaderboard")
    public List<QuizResult> getLeaderboard() {
        return quizResultService.getLeaderboard();
    }

    @GetMapping("/history/{email}")
    public List<QuizResult> getQuizHistory(@PathVariable String email) {
        return quizResultService.getQuizHistory(email);
    }
    @GetMapping("/dashboard/{email}")
public List<QuizResult> getUserDashboard(@PathVariable String email) {
    return quizResultService.getUserDashboard(email);
}
}