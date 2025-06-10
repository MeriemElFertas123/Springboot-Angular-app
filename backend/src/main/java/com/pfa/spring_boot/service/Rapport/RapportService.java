// RapportService.java (Interface)
package com.pfa.spring_boot.service.Rapport;

import com.pfa.spring_boot.dto.RapportStageDto;
import com.pfa.spring_boot.entities.Stage;
import java.util.List;

public interface RapportService {
    List<RapportStageDto> getRapportsWithEtudiants(String etat);
    RapportStageDto getRapportByStageId(Long stageId);
    Stage updateRapportStatus(Long stageId, String statut);
}