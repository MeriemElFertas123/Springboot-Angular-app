package com.pfa.spring_boot.service.stage;

import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.pfa.spring_boot.dto.ArchiveDto;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static java.time.LocalDate.*;

@Service
public class StageServiceImpl implements StageService {
    @Autowired
    private StageRepository stageRepository;

    @Override
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    @Override
    public Stage getStageById(Long id) {
        return stageRepository.findById(id).orElse(null);
    }

    @Override
    public Stage addStage(Stage stage) {
        return stageRepository.save(stage);
    }

    @Override
    public Stage updateStage(Long id, Stage stage) {
        stage.setId(id);
        return stageRepository.save(stage);
    }

    @Override
    public void deleteStage(Long id) {
        stageRepository.deleteById(id);
    }

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


    @Override
    public List<ArchiveDto> getArchives(Integer annee, String etat) {
        List<Stage> stages;

        // Convertir la chaîne etat en énumération StatutRapport
        StatutRapport statutRapport = null;
        if (etat != null && !etat.isEmpty()) {
            try {
                statutRapport = StatutRapport.valueOf(etat.toUpperCase());
            } catch (IllegalArgumentException e) {
                System.err.println("Statut rapport invalide: " + etat + ". Utilisation de VALIDE par défaut.");
                statutRapport = StatutRapport.VALIDE;
            }
        }

        if (annee != null && statutRapport != null) {
            // Filtrer par année ET par statut
            stages = stageRepository.findByAnneeAndStatutRapport(annee, statutRapport);
        } else if (annee != null) {
            // Filtrer seulement par année
            stages = stageRepository.findByAnnee(annee);
        } else if (statutRapport != null) {
            // Filtrer seulement par statut
            stages = stageRepository.findByStatutRapport(statutRapport);
        } else {
            // Aucun filtre
            stages = stageRepository.findAll();
        }

        // Filtrer pour ne garder que les stages avec rapport ET du bon statut
        StatutRapport finalStatutRapport = statutRapport;
        return stages.stream()
                .filter(stage -> stage.getContenuRapport() != null) // Seulement les stages avec rapport
                .filter(stage -> finalStatutRapport == null || stage.getStatutRapport() == finalStatutRapport) // Filtrage par statut
                .map(this::convertToArchiveDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<Integer> getAvailableYears() {
        return stageRepository.findDistinctYears();
    }

    @Override
    public byte[] exportToExcel(Integer annee, String etat) throws IOException {
        List<ArchiveDto> archives = getArchives(annee, etat);

        if (archives.isEmpty()) {
            return new byte[0]; // Retourner un tableau vide si aucune donnée
        }

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Archives " + (annee != null ? annee : "Toutes"));

            // Créer l'en-tête
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Étudiant", "Email", "Titre du Stage", "Entreprise", "Tuteur", "Date de Dépôt", "Note", "Statut"};

            // Style pour l'en-tête
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Style pour les données
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);

            // Remplir les données
            int rowNum = 1;
            for (ArchiveDto archive : archives) {
                Row row = sheet.createRow(rowNum++);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(archive.getId());
                cell0.setCellStyle(dataStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(archive.getEtudiant().getNom() + " " + archive.getEtudiant().getPrenom());
                cell1.setCellStyle(dataStyle);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue(archive.getEtudiant().getEmail());
                cell2.setCellStyle(dataStyle);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(archive.getTitre());
                cell3.setCellStyle(dataStyle);

                Cell cell4 = row.createCell(4);
                cell4.setCellValue("Entreprise"); // Vous pouvez ajouter ce champ si nécessaire
                cell4.setCellStyle(dataStyle);

                Cell cell5 = row.createCell(5);
                cell5.setCellValue(archive.getTuteur().getNom());
                cell5.setCellStyle(dataStyle);

                Cell cell6 = row.createCell(6);
                cell6.setCellValue(archive.getDateDepot());
                cell6.setCellStyle(dataStyle);

                Cell cell7 = row.createCell(7);
                cell7.setCellValue(archive.getNote() != null ? archive.getNote() + "/20" : "Non noté");
                cell7.setCellStyle(dataStyle);

                Cell cell8 = row.createCell(8);
                cell8.setCellValue(etat); // Le statut filtré
                cell8.setCellStyle(dataStyle);
            }

            // Ajuster la largeur des colonnes
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convertir en tableau de bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    // Méthode de conversion corrigée
    private ArchiveDto convertToArchiveDto(Stage stage) {
        ArchiveDto dto = new ArchiveDto();
        dto.setId(stage.getId());
        dto.setTitre(stage.getIntituleSujet());
        dto.setDateDepot(stage.getDateDepot());
        dto.setNote(stage.getNote());
        dto.setNomFichierRapport(stage.getNomFichierRapport());
        dto.setTypeFichierRapport(stage.getTypeFichierRapport());
        dto.setAnnee(stage.getDateDepot()); // Vous pouvez extraire l'année si nécessaire

        if (stage.getEtudiant() != null) {
            ArchiveDto.EtudiantDto etudiantDto = new ArchiveDto.EtudiantDto();
            etudiantDto.setId(stage.getEtudiant().getId());
            etudiantDto.setNom(stage.getEtudiant().getNom());
            etudiantDto.setPrenom(stage.getEtudiant().getPrenom());
            etudiantDto.setEmail(stage.getEtudiant().getEmail());
            dto.setEtudiant(etudiantDto);
        }

        if (stage.getNomEncadrant() != null) {
            ArchiveDto.TuteurDto tuteurDto = new ArchiveDto.TuteurDto();
            tuteurDto.setNom(stage.getNomEncadrant());
            dto.setTuteur(tuteurDto);
        }

        return dto;
    }

    ///////////////////////////////////////

}

