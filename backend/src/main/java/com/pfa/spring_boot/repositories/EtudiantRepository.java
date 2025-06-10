// EtudiantRepository.java - Si vous n'en avez pas encore
package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    // Rechercher un étudiant par email
    Optional<Etudiant> findByEmail(String email);

    // Rechercher des étudiants par nom ou prénom
    @Query("SELECT e FROM Etudiant e WHERE e.nom LIKE %:searchTerm% OR e.prenom LIKE %:searchTerm%")
    List<Etudiant> findByNomOrPrenom(@Param("searchTerm") String searchTerm);

    // Rechercher des étudiants par filière
    List<Etudiant> findByFiliere(String filiere);

    // Rechercher des étudiants par année d'étude
    List<Etudiant> findByAnneeEtude(String anneeEtude);
}