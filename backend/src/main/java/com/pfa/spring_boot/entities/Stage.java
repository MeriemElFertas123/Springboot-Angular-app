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
}
