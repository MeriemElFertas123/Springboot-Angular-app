package com.pfa.spring_boot.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Encadrement {
    @Id
    @GeneratedValue
    private Long id;

    // Un enseignant peut encadrer plusieurs étudiants,
    // mais un encadrement est lié à un seul enseignant
    @ManyToOne
    @JoinColumn(name="enseignant_id") // Colonne de jointure dans la table Encadrement
    private Enseignant enseignant;// Référence à l'enseignant


    // Un étudiant peut être encadré par plusieurs enseignants,
    // mais un encadrement est lié à un seul étudiant
    @ManyToOne
    @JoinColumn(name="etudiant_id") // Colonne de jointure dans la table Encadrement
    private Etudiant etudiant;// Référence à l'étudiant

    // Attribut supplémentaire pour stocker la date d'affectation
    @Column(name="date_affectation")
    @Temporal(TemporalType.DATE)
    private Date dateAffectation;


    public Encadrement() {
    }

    public Encadrement(Long id, Enseignant enseignant, Etudiant etudiant, Date dateAffectation) {
        this.id = id;
        this.enseignant = enseignant;
        this.etudiant = etudiant;
        this.dateAffectation = dateAffectation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Enseignant getEnseignant() {
        return enseignant;
    }

    public void setEnseignant(Enseignant enseignant) {
        this.enseignant = enseignant;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Date getDateAffectation() {
        return dateAffectation;
    }

    public void setDateAffectation(Date dateAffectation) {
        this.dateAffectation = dateAffectation;
    }
}
