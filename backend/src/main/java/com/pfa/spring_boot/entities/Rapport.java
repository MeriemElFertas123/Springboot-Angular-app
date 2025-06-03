package com.pfa.spring_boot.entities;

import com.pfa.spring_boot.enums.stage.StatutRapport;
import jakarta.persistence.*;

@Entity
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String document;

    @Enumerated(EnumType.STRING)
    private StatutRapport statutRapport;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public StatutRapport getStatutRapport() {
        return statutRapport;
    }

    public void setStatutRapport(StatutRapport statutRapport) {
        this.statutRapport = statutRapport;
    }
}
