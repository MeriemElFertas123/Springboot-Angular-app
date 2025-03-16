package com.pfa.spring_boot.entities;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.enums.etudiant.AnneeEtude;
import com.pfa.spring_boot.enums.etudiant.Filiere;
import com.pfa.spring_boot.enums.etudiant.Genre;
import jakarta.persistence.*;

@Entity
public class Etudiant {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Enumerated(EnumType.STRING)
    private Filiere filiere;

    private AnneeEtude anneeEtude;



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

    public Filiere getFiliere() {
        return filiere;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public AnneeEtude getAnneeEtude() {
        return anneeEtude;
    }

    public void setAnneeEtude(AnneeEtude anneeEtude) {
        this.anneeEtude = anneeEtude;
    }
}
