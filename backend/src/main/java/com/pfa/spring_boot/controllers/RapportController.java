// RapportController.java
package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.RapportStageDto;
import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.service.Rapport.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/rapports")
public class RapportController {

    @Autowired
    private RapportService rapportService;

    /**
     * Récupérer tous les rapports avec filtrage optionnel par statut
     */
    @GetMapping
    public ResponseEntity<List<RapportStageDto>> getAllRapports(
            @RequestParam(value = "etat", required = false) String etat) {

        List<RapportStageDto> rapports = rapportService.getRapportsWithEtudiants(etat);
        return ResponseEntity.ok(rapports);
    }

    /**
     * Récupérer un rapport spécifique par ID de stage
     */
    @GetMapping("/stage/{stageId}")
    public ResponseEntity<RapportStageDto> getRapportByStageId(@PathVariable Long stageId) {
        RapportStageDto rapport = rapportService.getRapportByStageId(stageId);
        if (rapport != null) {
            return ResponseEntity.ok(rapport);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Mettre à jour le statut d'un rapport
     */
    @PutMapping("/stage/{stageId}/statut")
    public ResponseEntity<Stage> updateRapportStatus(
            @PathVariable Long stageId,
            @RequestBody UpdateStatusRequest request) {

        Stage updatedStage = rapportService.updateRapportStatus(stageId, request.getStatutRapport());
        if (updatedStage != null) {
            return ResponseEntity.ok(updatedStage);
        }
        return ResponseEntity.notFound().build();
    }

    // Classe interne pour la requête de mise à jour du statut
    public static class UpdateStatusRequest {
        private String statutRapport;

        public String getStatutRapport() {
            return statutRapport;
        }

        public void setStatutRapport(String statutRapport) {
            this.statutRapport = statutRapport;
        }
    }
}