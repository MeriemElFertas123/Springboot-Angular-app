package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Encadrement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface EncadrementRepository extends JpaRepository<Encadrement,Long> {
    boolean existsByEtudiantIdAndDateAffectation(Long etudiantId, Date dateAffectation);
}
