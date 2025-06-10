package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.ArchiveDto;
import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.service.stage.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/stages")
public class StageController {
    @Autowired
    private StageService stageService;

    @GetMapping
    public List<Stage> getAllStages() {
        return stageService.getAllStages();
    }

    @GetMapping("/{id}")
    public Stage getStageById(@PathVariable Long id) {
        return stageService.getStageById(id);
    }

    @PostMapping
    public Stage addStage(@RequestBody Stage stage) {
        return stageService.addStage(stage);
    }

    @PutMapping("/{id}")
    public Stage updateStage(@PathVariable Long id, @RequestBody Stage stage) {
        return stageService.updateStage(id,stage);
    }

    @DeleteMapping("/{id}")
    public void deleteStage(@PathVariable Long id) {
        stageService.deleteStage(id);
    }

    // Récupérer le rapport d'un stage
    @GetMapping("/{id}/rapport")
    public ResponseEntity<ByteArrayResource> getStageReport(@PathVariable Long id) {
        Stage stage = stageService.getStageById(id);
        if (stage != null && stage.getContenuRapport() != null) {
            ByteArrayResource resource = new ByteArrayResource(stage.getContenuRapport());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(stage.getTypeFichierRapport()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + stage.getNomFichierRapport() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint pour créer un stage avec un rapport
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Stage> addStage(
            @RequestPart("stage") Stage stage,
            @RequestPart(value = "rapport", required = false) MultipartFile rapport) {

        try {
            Stage createdStage = stageService.addStageWithReport(stage, rapport);
            return new ResponseEntity<>(createdStage, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/validerStage/{idStage}")
    public ResponseEntity<Void> validerStage(@PathVariable("idStage") Long id){
        this.stageService.validerRapport(id);
        return ResponseEntity.ok().build();
    }

    // Récupérer les années disponibles
    @GetMapping("/annees")
    public ResponseEntity<List<Integer>> getAvailableYears() {
        List<Integer> annees = stageService.getAvailableYears();
        return ResponseEntity.ok(annees);
    }

    @GetMapping("/export/excel")
    public ResponseEntity<ByteArrayResource> exportExcel(
            @RequestParam Integer annee,
            @RequestParam(defaultValue = "VALIDE") String etat) { // Utilisez VALIDE en majuscules
        try {
            System.out.println("Export Excel - Année: " + annee + ", État: " + etat);

            byte[] excelData = stageService.exportToExcel(annee, etat);

            if (excelData == null || excelData.length == 0) {
                return ResponseEntity.noContent().build();
            }

            ByteArrayResource resource = new ByteArrayResource(excelData);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"archives_" + annee + "_" + etat + ".xlsx\"")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(excelData.length))
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/archives")
    public ResponseEntity<List<ArchiveDto>> getArchives(
            @RequestParam(required = false) Integer annee,
            @RequestParam(defaultValue = "VALIDE") String etat) { // Utilisez VALIDE en majuscules

        try {
            System.out.println("Récupération archives - Année: " + annee + ", État: " + etat);

            List<ArchiveDto> archives = stageService.getArchives(annee, etat);

            System.out.println("Nombre d'archives trouvées: " + archives.size());

            return ResponseEntity.ok(archives);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Visualiser un rapport dans le navigateur
    @GetMapping("/{id}/rapport/view")
    public ResponseEntity<ByteArrayResource> viewStageReport(@PathVariable Long id) {
        Stage stage = stageService.getStageById(id);
        if (stage != null && stage.getContenuRapport() != null) {
            ByteArrayResource resource = new ByteArrayResource(stage.getContenuRapport());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(stage.getTypeFichierRapport()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + stage.getNomFichierRapport() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Télécharger un rapport
    @GetMapping("/{id}/rapport/download")
    public ResponseEntity<ByteArrayResource> downloadStageReport(@PathVariable Long id) {
        Stage stage = stageService.getStageById(id);
        if (stage != null && stage.getContenuRapport() != null) {
            ByteArrayResource resource = new ByteArrayResource(stage.getContenuRapport());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(stage.getTypeFichierRapport()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + stage.getNomFichierRapport() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}