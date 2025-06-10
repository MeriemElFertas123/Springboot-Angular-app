package com.pfa.spring_boot.dto;

public class CreateReplyDTO {

    private String content;

    private String author;

    // Constructeurs
    public CreateReplyDTO() {}

    public CreateReplyDTO(String content, String author) {
        this.content = content;
        this.author = author;
    }

    // Getters et Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}

