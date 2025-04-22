package com.pfa.spring_boot.service.stage;

import com.pfa.spring_boot.entities.Stage;

import java.util.List;

public interface StageService {
    List<Stage> getAllStages();
    Stage getStageById(Long id);
    Stage addStage(Stage stage);
    Stage updateStage(Long id, Stage stage);
    void deleteStage(Long id);
}
