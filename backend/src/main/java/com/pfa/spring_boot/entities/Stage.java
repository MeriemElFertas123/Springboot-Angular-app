package com.pfa.spring_boot.entities;

import com.pfa.spring_boot.enums.stage.TypeStage;
import jakarta.persistence.*;

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

    @Enumerated(EnumType.STRING)
    private TypeStage typeStage;

    public String getAdresseEntreprise() {
        return adresseEntreprise;
    }

    public void setAdresseEntreprise(String adresseEntreprise) {
        this.adresseEntreprise = adresseEntreprise;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEntreprise() {
        return nomEntreprise;
    }

    public void setNomEntreprise(String nomEntreprise) {
        this.nomEntreprise = nomEntreprise;
    }

    public String getNumEncadrant() {
        return numEncadrant;
    }

    public void setNumEncadrant(String numEncadrant) {
        this.numEncadrant = numEncadrant;
    }

    public String getNomEncadrant() {
        return nomEncadrant;
    }

    public void setNomEncadrant(String nomEncadrant) {
        this.nomEncadrant = nomEncadrant;
    }

    public String getIntituleSujet() {
        return intituleSujet;
    }

    public void setIntituleSujet(String intituleSujet) {
        this.intituleSujet = intituleSujet;
    }

    public String getDescriptionSujet() {
        return descriptionSujet;
    }

    public void setDescriptionSujet(String descriptionSujet) {
        this.descriptionSujet = descriptionSujet;
    }

    public TypeStage getTypeStage() {
        return typeStage;
    }

    public void setTypeStage(TypeStage typeStage) {
        this.typeStage = typeStage;
    }


}
