package com.pfa.spring_boot.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {

    private Long id;

    private String title;

    private String content;

    private String author;

    private String category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    private Integer likes;
    private Boolean isLiked;
    private List<ReplyDTO> replies;

    // Constructeurs
    public QuestionDTO() {}

    public QuestionDTO(Long id, String title, String content, String author,
                       String category, LocalDateTime createdAt, Integer likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.category = category;
        this.createdAt = createdAt;
        this.likes = likes;
        this.isLiked = false;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }

    public Boolean getIsLiked() { return isLiked; }
    public void setIsLiked(Boolean isLiked) { this.isLiked = isLiked; }

    public List<ReplyDTO> getReplies() { return replies; }
    public void setReplies(List<ReplyDTO> replies) { this.replies = replies; }
}

