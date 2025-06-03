package com.pfa.spring_boot.dto;

import com.pfa.spring_boot.enums.etudiant.Genre;
import com.pfa.spring_boot.enums.professeur.Specialite;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;

import java.util.Arrays;


public class EnseignantDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;
    private Genre genre;
    private Specialite specialite;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;



    public byte[] getImage() { return image;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Specialite getSpecialite() {
        return specialite;
    }

    public void setSpecialite(Specialite specialite) {
        this.specialite = specialite;
    }

    public void setImage(byte[] image) {
        this.image=image;
    }


    @Override
    public String toString() {
        return "EnseignantDto{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", telephone='" + telephone + '\'' +
                ", genre=" + genre +
                ", specialite=" + specialite +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}