package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.QuestionLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionLikeRepository extends JpaRepository<QuestionLike, Long> {

    // Vérifier si un utilisateur a liké une question
    Optional<QuestionLike> findByQuestionIdAndUserId(Long questionId, String userId);

    // Compter les likes d'une question
    long countByQuestionId(Long questionId);

    // Supprimer le like d'un utilisateur pour une question
    void deleteByQuestionIdAndUserId(Long questionId, String userId);

    // Likes d'un utilisateur
    List<QuestionLike> findByUserIdOrderByCreatedAtDesc(String userId);

    // Questions les plus likées
    @Query("SELECT ql.question.id, COUNT(ql) as likeCount FROM QuestionLike ql " +
            "GROUP BY ql.question.id ORDER BY likeCount DESC")
    List<Object[]> findMostLikedQuestions();
}
