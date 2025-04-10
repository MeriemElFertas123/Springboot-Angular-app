package com.pfa.spring_boot.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pfa.spring_boot.enums.etudiant.Genre;
import com.pfa.spring_boot.enums.professeur.Specialite;
import jakarta.persistence.*;
import org.springframework.aop.target.LazyInitTargetSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Entity
public class Enseignant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("nom")
    private String nom;
    @JsonProperty("prenom")

    private String prenom;
    private String email;
    private String password;
    private String telephone;


    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;


    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Enumerated(EnumType.STRING)
    @JsonProperty("specialite")
    private Specialite specialite;


    // Relation One-to-Many vers la table de jointure Encadrement
    // Un enseignant peut avoir plusieurs relations d'encadrement avec des étudiants
    @OneToMany(mappedBy = "enseignant",// Champ dans Encadrement qui référence cet Enseignant
            cascade = CascadeType.ALL,// Opérations (save, delete) propagées aux Encadrements liés
            orphanRemoval = true// Supprime les Encadrements sans parent
    )
    private List<Encadrement> encadrements=new ArrayList<>();





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



    public byte[] getImage() { return image;}

    public void setImage(byte[] image) {this.image = image;}

    public List<Encadrement> getEncadrements() {
        return encadrements;
    }

    public void setEncadrements(List<Encadrement> encadrements) {
        this.encadrements = encadrements;
    }

    @Override
    public String toString() {
        return "Enseignant{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", telephone='" + telephone + '\'' +
                ", image=" + Arrays.toString(image) +
                ", genre=" + genre +
                ", specialite=" + specialite +
                '}';
    }
}
