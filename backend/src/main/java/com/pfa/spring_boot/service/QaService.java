package com.pfa.spring_boot.service;

import com.pfa.spring_boot.dto.*;
import com.pfa.spring_boot.entities.*;
import com.pfa.spring_boot.repositories.QuestionLikeRepository;
import com.pfa.spring_boot.repositories.QuestionRepository;
import com.pfa.spring_boot.repositories.ReplyLikeRepository;
import com.pfa.spring_boot.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class QaService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private QuestionLikeRepository questionLikeRepository;

    @Autowired
    private ReplyLikeRepository replyLikeRepository;

    // ===== GESTION DES QUESTIONS =====

    public List<QuestionDTO> getAllQuestions() {
        System.out.println("=== Récupération de toutes les questions ===");

        List<Question> questions = questionRepository.findAll();

        return questions.stream()
                .map(question -> {
                    QuestionDTO dto = convertToQuestionDTO(question);

                    // Récupérer les réponses pour chaque question
                    List<Reply> replies = replyRepository.findByQuestionIdOrderByCreatedAtAsc(question.getId());
                    List<ReplyDTO> replyDTOs = replies.stream()
                            .map(this::convertToReplyDTO)
                            .collect(Collectors.toList());

                    dto.setReplies(replyDTOs);

                    System.out.println("Question " + question.getId() + " avec " + replyDTOs.size() + " réponses");

                    return dto;
                })
                .collect(Collectors.toList());
    }

    public QuestionDTO getQuestionById(Long id) {
        System.out.println("=== Récupération de la question ID: " + id + " ===");

        // Récupérer la question
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée avec l'ID: " + id));

        System.out.println("Question trouvée: " + question.getTitle());

        // Convertir la question en DTO
        QuestionDTO questionDTO = convertToQuestionDTO(question);

        // Récupérer les réponses de cette question
        List<Reply> replies = replyRepository.findByQuestionIdOrderByCreatedAtAsc(id);
        System.out.println("Nombre de réponses trouvées en BDD: " + replies.size());

        // Convertir les réponses en DTO
        List<ReplyDTO> replyDTOs = replies.stream()
                .map(this::convertToReplyDTO)
                .collect(Collectors.toList());

        // Assigner les réponses à la question
        questionDTO.setReplies(replyDTOs);

        System.out.println("QuestionDTO créé avec " + questionDTO.getReplies().size() + " réponses");

        return questionDTO;
    }

    public QuestionDTO createQuestion(CreateQuestionDTO createQuestionDTO, String author) {
        Question question = new Question();
        question.setTitle(createQuestionDTO.getTitle());
        question.setContent(createQuestionDTO.getContent());
        question.setCategory(createQuestionDTO.getCategory());
        question.setAuthor(author);
        question.setCreatedAt(LocalDateTime.now());
        question.setLikes(0);

        Question savedQuestion = questionRepository.save(question);
        return convertToQuestionDTO(savedQuestion);
    }

    public QuestionDTO updateQuestion(Long id, UpdateQuestionDTO updateQuestionDTO) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée avec l'ID: " + id));

        if (updateQuestionDTO.getTitle() != null) {
            question.setTitle(updateQuestionDTO.getTitle());
        }
        if (updateQuestionDTO.getContent() != null) {
            question.setContent(updateQuestionDTO.getContent());
        }
        if (updateQuestionDTO.getCategory() != null) {
            question.setCategory(updateQuestionDTO.getCategory());
        }

        Question updatedQuestion = questionRepository.save(question);
        return convertToQuestionDTO(updatedQuestion);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Question non trouvée avec l'ID: " + id);
        }
        questionRepository.deleteById(id);
    }

    public QuestionDTO likeQuestion(Long questionId, String userId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée avec l'ID: " + questionId));

        Optional<QuestionLike> existingLike = questionLikeRepository.findByQuestionIdAndUserId(questionId, userId);

        if (existingLike.isPresent()) {
            // Supprimer le like (unlike)
            questionLikeRepository.delete(existingLike.get());
            question.decrementLikes();
        } else {
            // Ajouter le like
            QuestionLike questionLike = new QuestionLike(question, userId);
            questionLikeRepository.save(questionLike);
            question.incrementLikes();
        }

        Question updatedQuestion = questionRepository.save(question);
        QuestionDTO questionDTO = convertToQuestionDTO(updatedQuestion);
        questionDTO.setIsLiked(!existingLike.isPresent());

        return questionDTO;
    }

    // ===== GESTION DES RÉPONSES =====

    public ReplyDTO addReply(Long questionId, CreateReplyDTO createReplyDTO) {
        System.out.println("=== Ajout d'une réponse à la question " + questionId + " ===");

        // Vérifier que la question existe
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée avec l'ID: " + questionId));

        // Créer la réponse
        Reply reply = new Reply();
        reply.setContent(createReplyDTO.getContent());
        reply.setAuthor(createReplyDTO.getAuthor());
        reply.setCreatedAt(LocalDateTime.now());
        reply.setLikes(0);
        reply.setQuestion(question);

        // Sauvegarder
        Reply savedReply = replyRepository.save(reply);

        System.out.println("Réponse sauvegardée avec l'ID: " + savedReply.getId());

        return convertToReplyDTO(savedReply);
    }

    public ReplyDTO updateReply(Long questionId, Long replyId, UpdateReplyDTO updateReplyDTO) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Réponse non trouvée avec l'ID: " + replyId));

        if (!reply.getQuestion().getId().equals(questionId)) {
            throw new IllegalArgumentException("La réponse n'appartient pas à cette question");
        }

        if (updateReplyDTO.getContent() != null) {
            reply.setContent(updateReplyDTO.getContent());
        }

        Reply updatedReply = replyRepository.save(reply);
        return convertToReplyDTO(updatedReply);
    }

    public void deleteReply(Long questionId, Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Réponse non trouvée avec l'ID: " + replyId));

        if (!reply.getQuestion().getId().equals(questionId)) {
            throw new IllegalArgumentException("La réponse n'appartient pas à cette question");
        }

        replyRepository.delete(reply);
    }

    public ReplyDTO likeReply(Long questionId, Long replyId, String userId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Réponse non trouvée avec l'ID: " + replyId));

        if (!reply.getQuestion().getId().equals(questionId)) {
            throw new IllegalArgumentException("La réponse n'appartient pas à cette question");
        }

        Optional<ReplyLike> existingLike = replyLikeRepository.findByReplyIdAndUserId(replyId, userId);

        if (existingLike.isPresent()) {
            // Supprimer le like (unlike)
            replyLikeRepository.delete(existingLike.get());
            reply.decrementLikes();
        } else {
            // Ajouter le like
            ReplyLike replyLike = new ReplyLike(reply, userId);
            replyLikeRepository.save(replyLike);
            reply.incrementLikes();
        }

        Reply updatedReply = replyRepository.save(reply);
        ReplyDTO replyDTO = convertToReplyDTO(updatedReply);
        replyDTO.setIsLiked(!existingLike.isPresent());

        return replyDTO;
    }

    // ===== RECHERCHE ET FILTRAGE =====

    public List<QuestionDTO> searchQuestions(String searchTerm, String category) {
        List<Question> questions;

        if (category != null && !category.equals("all")) {
            questions = questionRepository.searchByTitleOrContentAndCategory(searchTerm, category);
        } else {
            questions = questionRepository.searchByTitleOrContent(searchTerm);
        }

        return questions.stream()
                .map(this::convertToQuestionDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getQuestionsByCategory(String category) {
        List<Question> questions = questionRepository.findByCategoryOrderByCreatedAtDesc(category);
        return questions.stream()
                .map(this::convertToQuestionDTO)
                .collect(Collectors.toList());
    }

    // ===== STATISTIQUES =====

    public StatisticsDTO getStatistics() {
        StatisticsDTO statistics = new StatisticsDTO();

        // Totaux
        statistics.setTotalQuestions(questionRepository.count());
        statistics.setTotalReplies(replyRepository.count());
        statistics.setTotalLikes(questionLikeRepository.count() + replyLikeRepository.count());

        // Questions par catégorie
        List<Object[]> categoryStats = questionRepository.countQuestionsByCategory();
        Map<String, Long> questionsByCategory = new HashMap<>();
        String mostPopularCategory = null;
        Long maxCount = 0L;

        for (Object[] stat : categoryStats) {
            String category = (String) stat[0];
            Long count = (Long) stat[1];
            questionsByCategory.put(category, count);

            if (count > maxCount) {
                maxCount = count;
                mostPopularCategory = category;
            }
        }

        statistics.setQuestionsByCategory(questionsByCategory);
        statistics.setMostPopularCategory(mostPopularCategory);

        // Auteur le plus actif
        List<Object[]> authorStats = replyRepository.countRepliesByAuthor();
        if (!authorStats.isEmpty()) {
            statistics.setMostActiveAuthor((String) authorStats.get(0)[0]);
        }

        return statistics;
    }

    // ===== MÉTHODES DE CONVERSION =====

    private QuestionDTO convertToQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setTitle(question.getTitle());
        dto.setContent(question.getContent());
        dto.setAuthor(question.getAuthor());
        dto.setCategory(question.getCategory());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setLikes(question.getLikes());
        dto.setIsLiked(false); // À adapter selon votre logique de "like"
        // Initialiser la liste des réponses
        dto.setReplies(new ArrayList<>());
        return dto;
    }

    private ReplyDTO convertToReplyDTO(Reply reply) {
        ReplyDTO dto = new ReplyDTO();
        dto.setId(reply.getId());
        dto.setContent(reply.getContent());
        dto.setAuthor(reply.getAuthor());
        dto.setCreatedAt(reply.getCreatedAt());
        dto.setLikes(reply.getLikes());
        dto.setIsLiked(false); // À adapter selon votre logique de "like"
        return dto;
    }

    // ===== MÉTHODES UTILITAIRES =====

    public boolean isQuestionLikedByUser(Long questionId, String userId) {
        return questionLikeRepository.findByQuestionIdAndUserId(questionId, userId).isPresent();
    }

    public boolean isReplyLikedByUser(Long replyId, String userId) {
        return replyLikeRepository.findByReplyIdAndUserId(replyId, userId).isPresent();
    }

    public List<QuestionDTO> getPopularQuestions(int limit) {
        List<Question> questions = questionRepository.findTop10ByOrderByLikesDesc();
        return questions.stream()
                .limit(limit)
                .map(this::convertToQuestionDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getRecentQuestions(int limit) {
        List<Question> questions = questionRepository.findTop10ByOrderByCreatedAtDesc();
        return questions.stream()
                .limit(limit)
                .map(this::convertToQuestionDTO)
                .collect(Collectors.toList());
    }

    // Méthode simplifiée pour ajouter une réponse
    public Reply addReplyToQuestion(Long questionId, Reply reply) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question non trouvée avec l'ID: " + questionId));

        reply.setQuestion(question);
        reply.setCreatedAt(LocalDateTime.now());
        reply.setLikes(0);

        return replyRepository.save(reply);
    }

    // Exception personnalisée (à ajouter dans un package exceptions)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}