package com.pfa.spring_boot.service.stage;

import com.pfa.spring_boot.dto.ArchiveDto;
import com.pfa.spring_boot.entities.Stage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
public interface StageService {
    List<Stage> getAllStages();
    Stage getStageById(Long id);
    Stage addStage(Stage stage);
    Stage updateStage(Long id, Stage stage);
    void deleteStage(Long id);
    Stage addStageWithReport(Stage stage, MultipartFile rapport) throws IOException;


    void validerRapport(Long idRapport);

    // Nouvelles méthodes
    List<ArchiveDto> getArchives(Integer annee, String etat);
    List<Integer> getAvailableYears();
    byte[] exportToExcel(Integer annee, String etat) throws IOException;
}

