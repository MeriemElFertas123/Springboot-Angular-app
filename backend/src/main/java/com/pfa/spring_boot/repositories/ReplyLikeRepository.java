package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.ReplyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Long> {

    // Vérifier si un utilisateur a liké une réponse
    Optional<ReplyLike> findByReplyIdAndUserId(Long replyId, String userId);

    // Compter les likes d'une réponse
    long countByReplyId(Long replyId);

    // Supprimer le like d'un utilisateur pour une réponse
    void deleteByReplyIdAndUserId(Long replyId, String userId);

    // Likes d'un utilisateur sur les réponses
    List<ReplyLike> findByUserIdOrderByCreatedAtDesc(String userId);

    // Réponses les plus likées
    @Query("SELECT rl.reply.id, COUNT(rl) as likeCount FROM ReplyLike rl " +
            "GROUP BY rl.reply.id ORDER BY likeCount DESC")
    List<Object[]> findMostLikedReplies();
}