package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.*;
import com.pfa.spring_boot.entities.Question;
import com.pfa.spring_boot.service.QaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qa")
@CrossOrigin(origins = "http://localhost:4200") // Pour Angular
public class QaController {

    @Autowired
    private QaService qaService;

    // ===== ENDPOINTS POUR LES QUESTIONS =====

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        List<QuestionDTO> questions = qaService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        QuestionDTO question = qaService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @PostMapping("/questions")
    public ResponseEntity<QuestionDTO> createQuestion(
             @RequestBody CreateQuestionDTO createQuestionDTO,
            @RequestHeader(value = "X-User-Id", defaultValue = "anonymous") String userId) {
        QuestionDTO createdQuestion = qaService.createQuestion(createQuestionDTO, userId);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(
            @PathVariable Long id,
            @RequestBody UpdateQuestionDTO updateQuestionDTO) {
        QuestionDTO updatedQuestion = qaService.updateQuestion(id, updateQuestionDTO);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        qaService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/questions/{id}/like")
    public ResponseEntity<QuestionDTO> likeQuestion(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", defaultValue = "anonymous") String userId) {
        QuestionDTO likedQuestion = qaService.likeQuestion(id, userId);
        return ResponseEntity.ok(likedQuestion);
    }

    // ===== ENDPOINTS POUR LES RÉPONSES =====

    @PostMapping("/questions/{questionId}/replies")
    public ResponseEntity<ReplyDTO> addReply(
            @PathVariable Long questionId,
           @RequestBody CreateReplyDTO createReplyDTO) {
        ReplyDTO createdReply = qaService.addReply(questionId, createReplyDTO);
        return new ResponseEntity<>(createdReply, HttpStatus.CREATED);
    }

    @PutMapping("/questions/{questionId}/replies/{replyId}")
    public ResponseEntity<ReplyDTO> updateReply(
            @PathVariable Long questionId,
            @PathVariable Long replyId,
            @RequestBody UpdateReplyDTO updateReplyDTO) {
        ReplyDTO updatedReply = qaService.updateReply(questionId, replyId, updateReplyDTO);
        return ResponseEntity.ok(updatedReply);
    }

    @DeleteMapping("/questions/{questionId}/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(
            @PathVariable Long questionId,
            @PathVariable Long replyId) {
        qaService.deleteReply(questionId, replyId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/questions/{questionId}/replies/{replyId}/like")
    public ResponseEntity<ReplyDTO> likeReply(
            @PathVariable Long questionId,
            @PathVariable Long replyId,
            @RequestHeader(value = "X-User-Id", defaultValue = "anonymous") String userId) {
        ReplyDTO likedReply = qaService.likeReply(questionId, replyId, userId);
        return ResponseEntity.ok(likedReply);
    }

    // ===== ENDPOINTS DE RECHERCHE ET FILTRAGE =====

    @GetMapping("/questions/search")
    public ResponseEntity<List<QuestionDTO>> searchQuestions(
            @RequestParam(name = "q") String searchTerm,
            @RequestParam(name = "category", required = false) String category) {
        List<QuestionDTO> questions = qaService.searchQuestions(searchTerm, category);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/category/{category}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByCategory(@PathVariable String category) {
        List<QuestionDTO> questions = qaService.getQuestionsByCategory(category);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/popular")
    public ResponseEntity<List<QuestionDTO>> getPopularQuestions(
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<QuestionDTO> questions = qaService.getPopularQuestions(limit);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/recent")
    public ResponseEntity<List<QuestionDTO>> getRecentQuestions(
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<QuestionDTO> questions = qaService.getRecentQuestions(limit);
        return ResponseEntity.ok(questions);
    }

    // ===== ENDPOINT POUR LES STATISTIQUES =====

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDTO> getStatistics() {
        StatisticsDTO statistics = qaService.getStatistics();
        return ResponseEntity.ok(statistics);
    }

    // ===== ENDPOINTS UTILITAIRES =====

    @GetMapping("/questions/{questionId}/is-liked")
    public ResponseEntity<Boolean> isQuestionLiked(
            @PathVariable Long questionId,
            @RequestHeader(value = "X-User-Id", defaultValue = "anonymous") String userId) {
        boolean isLiked = qaService.isQuestionLikedByUser(questionId, userId);
        return ResponseEntity.ok(isLiked);
    }

    @GetMapping("/replies/{replyId}/is-liked")
    public ResponseEntity<Boolean> isReplyLiked(
            @PathVariable Long replyId,
            @RequestHeader(value = "X-User-Id", defaultValue = "anonymous") String userId) {
        boolean isLiked = qaService.isReplyLikedByUser(replyId, userId);
        return ResponseEntity.ok(isLiked);
    }

    /// //////////

}