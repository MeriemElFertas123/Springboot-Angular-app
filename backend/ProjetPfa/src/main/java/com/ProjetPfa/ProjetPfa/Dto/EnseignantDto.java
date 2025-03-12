package com.ProjetPfa.ProjetPfa.Dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnseignantDto {
    private Long idE;
    private String imageUrlE; // URL de l'image
    private String Ename;
    private String emailE;
    private String phoneE;
    private String specialite;


    public void setIdE(Long idE) {
        this.idE = idE;
    }

    public void setEmailE(String emailE) {
        this.emailE = emailE;
    }

    public void setEname(String ename) {
        Ename = ename;
    }

    public void setImageUrlE(String imageUrlE) {
        this.imageUrlE = imageUrlE;
    }

    public void setPhoneE(String phoneE) {
        this.phoneE = phoneE;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public Long getIdE() {
        return idE;
    }

    public String getEname() {
        return Ename;
    }

    public String getImageUrlE() {
        return imageUrlE;
    }

    public String getEmailE() {
        return emailE;
    }

    public String getPhoneE() {
        return phoneE;
    }

    public String getSpecialite() {
        return specialite;
    }
}
