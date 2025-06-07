package com.pfa.spring_boot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.enums.stage.TypeStage;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomEntreprise;
    private String adresseEntreprise;
    private String numEncadrant;
    private String nomEncadrant;
    private String intituleSujet;
    private String descriptionSujet;

    private LocalDate dateDepot; // Changé de String à LocalDate

    private String domaine;
    private String note;

    @Enumerated(EnumType.STRING)
    private TypeStage typeStage;

    // Champs pour le rapport
    private String nomFichierRapport;
    private String typeFichierRapport;



    @Lob
    @Column(length = 16777215)
    private byte[] contenuRapport;




    @Enumerated(EnumType.STRING)
    @Column(name = "statut_rapport")
    private StatutRapport statutRapport = StatutRapport.EN_ATTENTE;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonBackReference //côté enfant (retour, souvent @ManyToOne)
    private Etudiant etudiant;



    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomEntreprise() { return nomEntreprise; }
    public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }
    public String getAdresseEntreprise() { return adresseEntreprise; }
    public void setAdresseEntreprise(String adresseEntreprise) { this.adresseEntreprise = adresseEntreprise; }
    public String getNumEncadrant() { return numEncadrant; }
    public void setNumEncadrant(String numEncadrant) { this.numEncadrant = numEncadrant; }
    public String getNomEncadrant() { return nomEncadrant; }
    public void setNomEncadrant(String nomEncadrant) { this.nomEncadrant = nomEncadrant; }
    public String getIntituleSujet() { return intituleSujet; }
    public void setIntituleSujet(String intituleSujet) { this.intituleSujet = intituleSujet; }
    public String getDescriptionSujet() { return descriptionSujet; }
    public void setDescriptionSujet(String descriptionSujet) { this.descriptionSujet = descriptionSujet; }
    public LocalDate getDateDepot() { return dateDepot; }
    public void setDateDepot(LocalDate dateDepot) { this.dateDepot = dateDepot; }
    public String getDomaine() { return domaine; }
    public void setDomaine(String domaine) { this.domaine = domaine; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public TypeStage getTypeStage() { return typeStage; }
    public void setTypeStage(TypeStage typeStage) { this.typeStage = typeStage; }
    public String getNomFichierRapport() { return nomFichierRapport; }
    public void setNomFichierRapport(String nomFichierRapport) { this.nomFichierRapport = nomFichierRapport; }
    public String getTypeFichierRapport() { return typeFichierRapport; }
    public void setTypeFichierRapport(String typeFichierRapport) { this.typeFichierRapport = typeFichierRapport; }
    public byte[] getContenuRapport() { return contenuRapport; }
    public void setContenuRapport(byte[] contenuRapport) { this.contenuRapport = contenuRapport; }
    public StatutRapport getStatutRapport() { return statutRapport; }
    public void setStatutRapport(StatutRapport statutRapport) { this.statutRapport = statutRapport; }
    public Etudiant getEtudiant() { return etudiant; }
    public void setEtudiant(Etudiant etudiant) { this.etudiant = etudiant; }
}
