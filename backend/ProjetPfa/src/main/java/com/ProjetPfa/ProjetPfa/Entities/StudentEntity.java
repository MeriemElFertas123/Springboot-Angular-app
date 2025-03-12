package com.ProjetPfa.ProjetPfa.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "Student_DB")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imageUrl; // URL de l'image
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String gender;

    public void setId(Long id) {
        this.id = id;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getUsername() {
        return username;
    }

    public String getGender() {
        return gender;
    }

    public String getPhone() {
        return phone;
    }
}
