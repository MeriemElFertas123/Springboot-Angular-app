package com.pfa.spring_boot.utilities;

public class UtilisateurAuth {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UtilisateurAuth{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
