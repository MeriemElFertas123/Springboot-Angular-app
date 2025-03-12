package com.ProjetPfa.ProjetPfa.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "enseignant_DB")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EnseignantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idE;

    @Column
    private String imageUrlE; // URL de l'image
    @Column
    private String Ename;
    @Column
    private String emailE;
    @Column
    private String phoneE;
    @Column
    private String specialite;

    public void setId(Long idE) {
        this.idE = idE;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrlE = imageUrl;
    }

    public void setEmail(String email) {
        this.emailE = email;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public void setPhone(String phone) {
        this.phoneE = phone;
    }

    public void setUsername(String username) {
        this.Ename = username;
    }

    public String getEmail() {
        return emailE;
    }

    public Long getId() {
        return idE;
    }

    public String getImageUrl() {
        return imageUrlE;
    }

    public String getUsername() {
        return Ename;
    }

    public String getSpecialite() {
        return specialite;
    }

    public String getPhone() {
        return phoneE;
    }
}
