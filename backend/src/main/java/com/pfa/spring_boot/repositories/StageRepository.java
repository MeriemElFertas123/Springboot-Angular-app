package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {

    // Filtrage par année
    @Query("SELECT s FROM Stage s WHERE YEAR(s.dateDepot) = :annee")
    List<Stage> findByAnnee(@Param("annee") int annee);

    // Filtrage par année et statut
    @Query("SELECT s FROM Stage s WHERE YEAR(s.dateDepot) = :annee AND s.statutRapport = :statutRapport")
    List<Stage> findByAnneeAndStatutRapport(@Param("annee") int annee, @Param("statutRapport") StatutRapport statutRapport);

    // Filtrage par statut
    List<Stage> findByStatutRapport(StatutRapport statutRapport);

    // Statuts avec rapport non null
    @Query("SELECT s FROM Stage s WHERE s.statutRapport = :statutRapport AND s.contenuRapport IS NOT NULL")
    List<Stage> findByStatutRapportWithReport(@Param("statutRapport") StatutRapport statutRapport);

    // Année + statut + rapport
    @Query("SELECT s FROM Stage s WHERE YEAR(s.dateDepot) = :annee AND s.statutRapport = :statutRapport AND s.contenuRapport IS NOT NULL")
    List<Stage> findByAnneeAndStatutRapportWithReport(@Param("annee") int annee, @Param("statutRapport") StatutRapport statutRapport);

    // Années distinctes pour rapports validés
    @Query(value = "SELECT DISTINCT YEAR(s.date_depot) FROM stage s WHERE s.statut_rapport = 'VALIDE' ORDER BY YEAR(s.date_depot) DESC", nativeQuery = true)
    List<Integer> findDistinctYears();

    // Années distinctes pour rapports validés avec contenu
    @Query(value = "SELECT DISTINCT YEAR(s.date_depot) FROM stage s WHERE s.statut_rapport = 'VALIDE' AND s.contenu_rapport IS NOT NULL ORDER BY YEAR(s.date_depot) DESC", nativeQuery = true)
    List<Integer> findDistinctYearsForValidatedReports();

    // Stages avec rapport pour une année
    @Query("SELECT s FROM Stage s WHERE s.contenuRapport IS NOT NULL AND YEAR(s.dateDepot) = :annee")
    List<Stage> findStagesWithReportsByAnnee(@Param("annee") Integer annee);

    // Stages avec rapport
    @Query("SELECT s FROM Stage s WHERE s.nomFichierRapport IS NOT NULL")
    List<Stage> findStagesWithReports();

    // Recherche par nom d’entreprise ou domaine
    List<Stage> findByNomEntrepriseContainingIgnoreCase(String nomEntreprise);
    List<Stage> findByDomaineContainingIgnoreCase(String domaine);

    // Filtrage par statut et domaine
    @Query("SELECT s FROM Stage s WHERE s.statutRapport = :statut AND s.domaine LIKE %:domaine%")
    List<Stage> findByStatutRapportAndDomaine(@Param("statut") StatutRapport statut, @Param("domaine") String domaine);

    // ✅ Corrigé : Compter par **StatutRapport** (anciennement countByEtat)
    long countByStatutRapport(StatutRapport statutRapport);

    // Compter par date
    long countByDateDepot(LocalDate date);

    // Compter par mois et année
    @Query("SELECT COUNT(s) FROM Stage s WHERE MONTH(s.dateDepot) = :month AND YEAR(s.dateDepot) = :year")
    long countByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
