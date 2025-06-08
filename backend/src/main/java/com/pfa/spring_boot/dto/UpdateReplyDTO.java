package com.pfa.spring_boot.dto;


public class UpdateReplyDTO {

    private String content;

    // Constructeurs
    public UpdateReplyDTO() {}

    public UpdateReplyDTO(String content) {
        this.content = content;
    }

    // Getters et Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}

