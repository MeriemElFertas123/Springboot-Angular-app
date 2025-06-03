package com.pfa.spring_boot.entities;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.enums.etudiant.AnneeEtude;
import com.pfa.spring_boot.enums.etudiant.Filiere;
import com.pfa.spring_boot.enums.etudiant.Genre;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class Etudiant {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Enumerated(EnumType.STRING)
    private Filiere filiere;
    @Enumerated(EnumType.STRING)
    private AnneeEtude anneeEtude;


    // Relation One-to-Many vers la table de jointure Encadrement
    // Un étudiant peut être encadré par plusieurs enseignants
    @OneToMany(mappedBy = "etudiant",// Champ dans Encadrement qui référence cet Etudiant
            cascade = CascadeType.ALL,// Opérations propagées aux Encadrements liés
            orphanRemoval = true
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
        return "Etudiant{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", telephone='" + telephone + '\'' +
                ", genre=" + genre +
                ", filiere=" + filiere +
                ", anneeEtude=" + anneeEtude +
                '}';
    }
}
