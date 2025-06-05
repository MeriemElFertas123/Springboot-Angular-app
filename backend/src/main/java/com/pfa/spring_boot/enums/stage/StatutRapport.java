package com.pfa.spring_boot.enums.stage;

public enum StatutRapport {
    EN_ATTENTE("En attente"),
    VALIDE("Validé"),
    REFUSE("Refusé");

    private final String libelle;

    StatutRapport(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}