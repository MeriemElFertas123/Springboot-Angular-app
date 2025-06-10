package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {


    // Recherche par catégorie
    List<Question> findByCategoryOrderByCreatedAtDesc(String category);

    // Recherche par titre ou contenu
    @Query("SELECT q FROM Question q WHERE " +
            "LOWER(q.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(q.content) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Question> searchByTitleOrContent(@Param("searchTerm") String searchTerm);

    // Recherche par titre/contenu et catégorie
    @Query("SELECT q FROM Question q WHERE " +
            "(LOWER(q.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(q.content) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
            "q.category = :category")
    List<Question> searchByTitleOrContentAndCategory(
            @Param("searchTerm") String searchTerm,
            @Param("category") String category);

    // Questions les plus récentes
    List<Question> findTop10ByOrderByCreatedAtDesc();

    // Questions les plus likées
    List<Question> findTop10ByOrderByLikesDesc();

    // Questions par auteur
    List<Question> findByAuthorOrderByCreatedAtDesc(String author);

    // Compter les questions par catégorie
    long countByCategory(String category);

    // Questions avec le plus de réponses
    @Query("SELECT q FROM Question q ORDER BY SIZE(q.replies) DESC")
    List<Question> findQuestionsOrderByRepliesCountDesc(Pageable pageable);

    // Trouver une question avec ses réponses
    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN FETCH q.replies WHERE q.id = :id")
    Optional<Question> findByIdWithReplies(@Param("id") Long id);

    // Questions sans réponse
    @Query("SELECT q FROM Question q WHERE SIZE(q.replies) = 0")
    List<Question> findQuestionsWithoutReplies();

    // Statistiques par catégorie
    @Query("SELECT q.category, COUNT(q) FROM Question q GROUP BY q.category")
    List<Object[]> countQuestionsByCategory();
}
