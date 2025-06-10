// ArchiveDto.java
package com.pfa.spring_boot.dto;

import java.time.LocalDate;

public class ArchiveDto {
    private Long id;
    private EtudiantDto etudiant;
    private String titre;
    private TuteurDto tuteur;
    private LocalDate dateDepot;
    private String note;
    private String nomFichierRapport;
    private String typeFichierRapport;
    private LocalDate annee;

    // Constructors
    public ArchiveDto() {}

    public ArchiveDto(Long id, EtudiantDto etudiant, String titre, TuteurDto tuteur,
                      LocalDate dateDepot, String note, String nomFichierRapport,
                      String typeFichierRapport, LocalDate annee) {
        this.id = id;
        this.etudiant = etudiant;
        this.titre = titre;
        this.tuteur = tuteur;
        this.dateDepot = dateDepot;
        this.note = note;
        this.nomFichierRapport = nomFichierRapport;
        this.typeFichierRapport = typeFichierRapport;
        this.annee = annee;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public EtudiantDto getEtudiant() { return etudiant; }
    public void setEtudiant(EtudiantDto etudiant) { this.etudiant = etudiant; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public TuteurDto getTuteur() { return tuteur; }
    public void setTuteur(TuteurDto tuteur) { this.tuteur = tuteur; }

    public LocalDate getDateDepot() { return dateDepot; }
    public void setDateDepot(LocalDate dateDepot) { this.dateDepot = dateDepot; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public String getNomFichierRapport() { return nomFichierRapport; }
    public void setNomFichierRapport(String nomFichierRapport) { this.nomFichierRapport = nomFichierRapport; }

    public String getTypeFichierRapport() { return typeFichierRapport; }
    public void setTypeFichierRapport(String typeFichierRapport) { this.typeFichierRapport = typeFichierRapport; }

    public LocalDate getAnnee() { return annee; }
    public void setAnnee(LocalDate annee) { this.annee = annee; }

    // Classes internes pour les DTOs imbriqués
    public static class EtudiantDto {
        private Long id;
        private String nom;
        private String prenom;
        private String email;

        public EtudiantDto() {}

        public EtudiantDto(Long id, String nom, String prenom, String email) {
            this.id = id;
            this.nom = nom;
            this.prenom = prenom;
            this.email = email;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }

        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class TuteurDto {
        private String nom;

        public TuteurDto() {}

        public TuteurDto(String nom) {
            this.nom = nom;
        }

        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }

    }
}