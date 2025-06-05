// AdminController.java
package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.EtudiantImportDto;
import com.pfa.spring_boot.service.ExcelImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private ExcelImportService excelImportService;

    @PostMapping("/import-etudiants")
    public ResponseEntity<?> importEtudiants(@RequestParam("file") MultipartFile file) {
        try {
            // Vérifications du fichier
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide");
            }

            String fileName = file.getOriginalFilename();
            if (fileName == null || (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls"))) {
                return ResponseEntity.badRequest().body("Format de fichier non supporté. Utilisez .xlsx ou .xls");
            }

            List<EtudiantImportDto> etudiants = excelImportService.parseExcelFile(file);

            return ResponseEntity.ok(etudiants);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la lecture du fichier: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'import: " + e.getMessage());
        }
    }

    @GetMapping("/template-excel")
    public ResponseEntity<byte[]> downloadTemplate() {
        try {
            byte[] template = excelImportService.generateTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "template_etudiants.xlsx");
            headers.setContentLength(template.length);

            return new ResponseEntity<>(template, headers, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}