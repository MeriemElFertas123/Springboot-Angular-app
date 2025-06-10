package com.pfa.spring_boot.dto;

public class EtudiantImportDto {
    private String nom;
    private String prenom;
    private String email;
    private String genre;
    private String filiere;
    private String anneeEtude;

    // Constructeurs
    public EtudiantImportDto() {}

    public EtudiantImportDto(String nom, String prenom, String email, String genre, String filiere, String anneeEtude) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.genre = genre;
        this.filiere = filiere;
        this.anneeEtude = anneeEtude;
    }

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }

    public String getAnneeEtude() { return anneeEtude; }
    public void setAnneeEtude(String anneeEtude) { this.anneeEtude = anneeEtude; }

    @Override
    public String toString() {
        return "EtudiantImportDto{" +
                "nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", genre='" + genre + '\'' +
                ", filiere='" + filiere + '\'' +
                ", anneeEtude='" + anneeEtude + '\'' +
                '}';
    }
}
