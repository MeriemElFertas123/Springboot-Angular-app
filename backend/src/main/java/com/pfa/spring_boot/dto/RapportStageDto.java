// RapportStageDto.java
package com.pfa.spring_boot.dto;

import com.pfa.spring_boot.enums.stage.StatutRapport;

import java.time.LocalDate;

public class RapportStageDto {
    private Long id;
    private EtudiantDto etudiant;
    private StageDto stage;

    // Constructeurs
    public RapportStageDto() {}

    public RapportStageDto(Long id, EtudiantDto etudiant, StageDto stage) {
        this.id = id;
        this.etudiant = etudiant;
        this.stage = stage;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EtudiantDto getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(EtudiantDto etudiant) {
        this.etudiant = etudiant;
    }

    public StageDto getStage() {
        return stage;
    }

    public void setStage(StageDto stage) {
        this.stage = stage;
    }

    // Classes internes pour les DTOs
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

        // Getters et Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }
        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class StageDto {
        private Long id;
        private String nomEntreprise;
        private String intituleSujet;
        private String dateDepot;
        private String domaine;
        private StatutRapport statutRapport;
        private String nomFichierRapport;
        private String typeFichierRapport;

        public StageDto() {}

        public StageDto(Long id, String nomEntreprise, String intituleSujet,
                        String dateDepot, String domaine, StatutRapport statutRapport,
                        String nomFichierRapport, String typeFichierRapport) {
            this.id = id;
            this.nomEntreprise = nomEntreprise;
            this.intituleSujet = intituleSujet;
            this.dateDepot = dateDepot;
            this.domaine = domaine;
            this.statutRapport = statutRapport;
            this.nomFichierRapport = nomFichierRapport;
            this.typeFichierRapport = typeFichierRapport;
        }

        public StageDto(Long id, String nomEntreprise, String intituleSujet, LocalDate dateDepot, String domaine, StatutRapport statutRapport, String nomFichierRapport, String typeFichierRapport) {
        }

        // Getters et Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNomEntreprise() { return nomEntreprise; }
        public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }
        public String getIntituleSujet() { return intituleSujet; }
        public void setIntituleSujet(String intituleSujet) { this.intituleSujet = intituleSujet; }
        public String getDateDepot() { return dateDepot; }
        public void setDateDepot(String dateDepot) { this.dateDepot = dateDepot; }
        public String getDomaine() { return domaine; }
        public void setDomaine(String domaine) { this.domaine = domaine; }
        public StatutRapport getStatutRapport() { return statutRapport; }
        public void setStatutRapport(StatutRapport statutRapport) { this.statutRapport = statutRapport; }
        public String getNomFichierRapport() { return nomFichierRapport; }
        public void setNomFichierRapport(String nomFichierRapport) { this.nomFichierRapport = nomFichierRapport; }
        public String getTypeFichierRapport() { return typeFichierRapport; }
        public void setTypeFichierRapport(String typeFichierRapport) { this.typeFichierRapport = typeFichierRapport; }
    }
}