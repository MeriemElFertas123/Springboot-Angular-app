package com.pfa.spring_boot.dto;

import java.util.Date;
import java.util.List;

public class EncadrementRequest {
    private Long enseignantId;
    private List<Long> etudiantsIds;
    private Date dateAffectation;

    public EncadrementRequest() {
    }

    public EncadrementRequest(Long enseignantId, List<Long> etudiantsIds, Date dateAffectation) {
        this.enseignantId = enseignantId;
        this.etudiantsIds = etudiantsIds;
        this.dateAffectation = dateAffectation;
    }

    public Long getEnseignantId() {
        return enseignantId;
    }

    public void setEnseignantId(Long enseignantId) {
        this.enseignantId = enseignantId;
    }

    public List<Long> getEtudiantsIds() {
        return etudiantsIds;
    }

    public void setEtudiantsIds(List<Long> etudiantsIds) {
        this.etudiantsIds = etudiantsIds;
    }

    public Date getDateAffectation() {
        return dateAffectation;
    }

    public void setDateAffectation(Date dateAffectation) {
        this.dateAffectation = dateAffectation;
    }
}
