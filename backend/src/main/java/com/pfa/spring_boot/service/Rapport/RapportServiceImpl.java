// RapportServiceImpl.java (Implémentation)
package com.pfa.spring_boot.service.Rapport;

import com.pfa.spring_boot.dto.RapportStageDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import com.pfa.spring_boot.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RapportServiceImpl implements RapportService {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Override
    public List<RapportStageDto> getRapportsWithEtudiants(String etat) {
        List<Stage> stages;

        // Filtrer par statut si spécifié
        if (etat != null && !etat.isEmpty()) {
            try {
                StatutRapport statut = StatutRapport.valueOf(etat.toUpperCase());
                stages = stageRepository.findByStatutRapport(statut);
            } catch (IllegalArgumentException e) {
                // Si le statut n'est pas valide, retourner tous les stages
                stages = stageRepository.findAll();
            }
        } else {
            stages = stageRepository.findAll();
        }

        List<RapportStageDto> rapportsDto = new ArrayList<>();

        for (Stage stage : stages) {
            // Récupérer l'étudiant associé au stage
            Etudiant etudiant = stage.getEtudiant();

            if (etudiant != null) {
                RapportStageDto rapportDto = createRapportDto(stage, etudiant);
                rapportsDto.add(rapportDto);
            } else {
                // Si pas d'étudiant associé, créer un DTO avec des données nulles
                RapportStageDto.EtudiantDto etudiantDto = new RapportStageDto.EtudiantDto(
                        null, "Non assigné", "", ""
                );

                RapportStageDto.StageDto stageDto = new RapportStageDto.StageDto(
                        stage.getId(),
                        stage.getNomEntreprise(),
                        stage.getIntituleSujet(),
                        stage.getDateDepot(),
                        stage.getDomaine(),
                        stage.getStatutRapport(),
                        stage.getNomFichierRapport(),
                        stage.getTypeFichierRapport()
                );

                rapportsDto.add(new RapportStageDto(stage.getId(), etudiantDto, stageDto));
            }
        }

        return rapportsDto;
    }

    @Override
    public RapportStageDto getRapportByStageId(Long stageId) {
        Optional<Stage> stageOpt = stageRepository.findById(stageId);
        if (stageOpt.isPresent()) {
            Stage stage = stageOpt.get();

            // Trouver l'étudiant associé (à adapter selon votre logique)
            List<Etudiant> etudiants = etudiantRepository.findAll();
            if (!etudiants.isEmpty()) {
                Etudiant etudiant = etudiants.get(0); // À remplacer par votre logique
                return createRapportDto(stage, etudiant);
            }
        }
        return null;
    }

    @Override
    public Stage updateRapportStatus(Long stageId, String statut) {
        Optional<Stage> stageOpt = stageRepository.findById(stageId);
        if (stageOpt.isPresent()) {
            Stage stage = stageOpt.get();
            try {
                StatutRapport nouveauStatut = StatutRapport.valueOf(statut.toUpperCase());
                stage.setStatutRapport(nouveauStatut);
                return stageRepository.save(stage);
            } catch (IllegalArgumentException e) {
                // Statut invalide
                return null;
            }
        }
        return null;
    }

    private RapportStageDto createRapportDto(Stage stage, Etudiant etudiant) {
        // Créer le DTO de l'étudiant
        RapportStageDto.EtudiantDto etudiantDto = new RapportStageDto.EtudiantDto(
                etudiant.getId(),
                etudiant.getNom(),
                etudiant.getPrenom(),
                etudiant.getEmail()
        );
        // Convertir la date au bon format si nécessaire
        String dateDepotStr = (stage.getDateDepot() != null)
                ? stage.getDateDepot().toString()
                : null;
        // Créer le DTO du stage
        RapportStageDto.StageDto stageDto = new RapportStageDto.StageDto(
                stage.getId(),
                stage.getNomEntreprise(),
                stage.getIntituleSujet(),
                dateDepotStr,
                stage.getDomaine(),
                stage.getStatutRapport(),
                stage.getNomFichierRapport(),
                stage.getTypeFichierRapport()
        );

        // Créer le DTO principal
        return new RapportStageDto(stage.getId(), etudiantDto, stageDto);
    }
}