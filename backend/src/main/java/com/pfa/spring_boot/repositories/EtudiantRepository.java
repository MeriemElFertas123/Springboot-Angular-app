package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {
    Optional<Etudiant> findByEmail(String email);
}
