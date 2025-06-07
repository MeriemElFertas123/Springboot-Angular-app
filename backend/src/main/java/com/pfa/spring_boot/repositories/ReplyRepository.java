package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

    /// ///////////////
    // Réponses par question
    List<Reply> findByQuestionIdOrderByCreatedAtAsc(Long questionId);

    // Réponses par auteur
    List<Reply> findByAuthorOrderByCreatedAtDesc(String author);

    // Réponses les plus récentes
    List<Reply> findTop10ByOrderByCreatedAtDesc();

    // Réponses les plus likées
    List<Reply> findTop10ByOrderByLikesDesc();

    // Compter les réponses par question
    long countByQuestionId(Long questionId);

    // Réponses d'une question avec un minimum de likes
    @Query("SELECT r FROM Reply r WHERE r.question.id = :questionId AND r.likes >= :minLikes")
    List<Reply> findByQuestionIdAndMinLikes(@Param("questionId") Long questionId, @Param("minLikes") Integer minLikes);

    // Statistiques des réponses par auteur
    @Query("SELECT r.author, COUNT(r) FROM Reply r GROUP BY r.author ORDER BY COUNT(r) DESC")
    List<Object[]> countRepliesByAuthor();
}