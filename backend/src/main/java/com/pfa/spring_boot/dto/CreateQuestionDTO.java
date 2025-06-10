package com.pfa.spring_boot.dto;


public class CreateQuestionDTO {

    private String title;

    private String content;

    private String category;

    // Constructeurs
    public CreateQuestionDTO() {}

    public CreateQuestionDTO(String title, String content, String category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }

    // Getters et Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
