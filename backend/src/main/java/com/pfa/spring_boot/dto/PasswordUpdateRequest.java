package com.pfa.spring_boot.dto;

public class PasswordUpdateRequest {
    private String currentPassword;


    private String newPassword;

    // Constructeurs
    public PasswordUpdateRequest() {}

    public PasswordUpdateRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    // Getters et Setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
