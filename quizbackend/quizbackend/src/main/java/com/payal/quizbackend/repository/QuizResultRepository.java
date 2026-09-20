package com.payal.quizbackend.repository;

import com.payal.quizbackend.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findAllByOrderByScoreDesc();

    List<QuizResult> findByEmailOrderByIdDesc(String email);

    long countByEmail(String email);
}