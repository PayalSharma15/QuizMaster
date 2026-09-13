package com.payal.quizbackend.repository;

import com.payal.quizbackend.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

}