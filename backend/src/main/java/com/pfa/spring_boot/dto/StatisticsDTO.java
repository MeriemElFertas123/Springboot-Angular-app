package com.pfa.spring_boot.dto;

import java.util.Map;

public class StatisticsDTO {

    private Long totalQuestions;
    private Long totalReplies;
    private Long totalLikes;
    private Map<String, Long> questionsByCategory;
    private String mostActiveAuthor;
    private String mostPopularCategory;

    // Constructeurs
    public StatisticsDTO() {}

    public StatisticsDTO(Long totalQuestions, Long totalReplies, Long totalLikes) {
        this.totalQuestions = totalQuestions;
        this.totalReplies = totalReplies;
        this.totalLikes = totalLikes;
    }

    // Getters et Setters
    public Long getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Long totalQuestions) { this.totalQuestions = totalQuestions; }

    public Long getTotalReplies() { return totalReplies; }
    public void setTotalReplies(Long totalReplies) { this.totalReplies = totalReplies; }

    public Long getTotalLikes() { return totalLikes; }
    public void setTotalLikes(Long totalLikes) { this.totalLikes = totalLikes; }

    public Map<String, Long> getQuestionsByCategory() { return questionsByCategory; }
    public void setQuestionsByCategory(Map<String, Long> questionsByCategory) {
        this.questionsByCategory = questionsByCategory;
    }

    public String getMostActiveAuthor() { return mostActiveAuthor; }
    public void setMostActiveAuthor(String mostActiveAuthor) { this.mostActiveAuthor = mostActiveAuthor; }

    public String getMostPopularCategory() { return mostPopularCategory; }
    public void setMostPopularCategory(String mostPopularCategory) { this.mostPopularCategory = mostPopularCategory; }
}
