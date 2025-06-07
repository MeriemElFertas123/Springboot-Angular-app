package com.pfa.spring_boot.service;
import com.pfa.spring_boot.entities.Question;
import com.pfa.spring_boot.repositories.QuestionRepository;
import com.pfa.spring_boot.repositories.ReplyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QAServicr {

    private final QuestionRepository questionRepository;
    private final ReplyRepository replyRepository;

    public QAServicr(QuestionRepository questionRepository,
                     ReplyRepository replyRepository) {
        this.questionRepository = questionRepository;
        this.replyRepository = replyRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question non trouvée"));
    }

    // Implémentez toutes les autres méthodes du contrôleur...
}