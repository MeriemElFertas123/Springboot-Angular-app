package com.pfa.spring_boot.service.stage;

import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class StageServiceImpl implements StageService {
    @Autowired // Injection du repository
    private StageRepository stageRepository ;


    @Override
    public List<Stage> getAllStages() {
        return stageRepository.findAll(); // Utilise le repository pour récupérer tous les stages
    }

    @Override
    public Stage getStageById(Long id) {
        return stageRepository.findById(id).orElse(null); // Récupère un stage par son ID
    }

    @Override
    public Stage addStage(Stage stage) {
        return stageRepository.save(stage); // Ajoute un nouveau stage
    }

    @Override
    public Stage updateStage(Long id, Stage stage) {
        stage.setId(id); // Assure que l'ID du stage est correct
        return stageRepository.save(stage); // Met à jour le stage
    }

    @Override
    public void deleteStage(Long id) {
        stageRepository.deleteById(id); // Supprime un stage par son ID
    }

    // Nouvelle méthode pour ajouter un stage avec un fichier rapport
    public Stage addStageWithReport(Stage stage, MultipartFile rapport) throws IOException {
        if (rapport != null && !rapport.isEmpty()) {
            stage.setNomFichierRapport(rapport.getOriginalFilename());
            stage.setTypeFichierRapport(rapport.getContentType());
            stage.setContenuRapport(rapport.getBytes());
        }

        return stageRepository.save(stage);
    }

    public byte[] getStageReport(Long stageId) {
        Stage stage = stageRepository.findById(stageId).orElse(null);
        if (stage != null) {
            return stage.getContenuRapport();
        }
        return null;
    }


    @Override
    public void validerRapport(Long idRapport) {
        Stage stage=stageRepository.findById(idRapport).orElseThrow(
                ()-> new RuntimeException("Stage with id "+idRapport+" nt found")
        );
        stage.setStatutRapport(StatutRapport.VALIDE);
        stageRepository.save(stage);
    }
}
