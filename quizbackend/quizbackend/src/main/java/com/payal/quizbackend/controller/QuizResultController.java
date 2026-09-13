package com.payal.quizbackend.controller;

import com.payal.quizbackend.entity.QuizResult;
import com.payal.quizbackend.service.QuizResultService;
import org.springframework.web.bind.annotation.*;

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
}