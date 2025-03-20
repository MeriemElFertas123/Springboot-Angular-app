package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Enseignant;
import com.pfa.spring_boot.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnseignantRepository extends JpaRepository<Enseignant,Long> {
}
