package com.pfa.spring_boot.service.stage;

import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
