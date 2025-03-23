package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
    Utilisateur findByEmail(String email);
    Boolean existsByEmail(String email);
}
