package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Enseignant;
import com.pfa.spring_boot.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnseignantRepository extends JpaRepository<Enseignant,Long> {
    Optional<Enseignant> findByEmail(String email);
}
