package com.pfa.spring_boot.service;
import com.pfa.spring_boot.dto.EtudiantImportDto;
import org.apache.poi.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelImportService {

    public List<EtudiantImportDto> parseExcelFile(MultipartFile file) throws IOException {
        List<EtudiantImportDto> etudiants = new ArrayList<>();

        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            // Vérifier si le fichier a au moins une ligne d'en-tête
            if (sheet.getLastRowNum() < 1) {
                throw new RuntimeException("Le fichier Excel est vide ou ne contient pas de données");
            }

            // Commencer à partir de la ligne 1 (après l'en-tête)
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null && !isRowEmpty(row)) {
                    try {
                        EtudiantImportDto etudiant = new EtudiantImportDto();
                        etudiant.setNom(getCellValue(row.getCell(0)));
                        etudiant.setPrenom(getCellValue(row.getCell(1)));
                        etudiant.setEmail(getCellValue(row.getCell(2)));
                        etudiant.setGenre(mapGenre(getCellValue(row.getCell(3))));
                        etudiant.setFiliere(mapFiliere(getCellValue(row.getCell(4))));
                        etudiant.setAnneeEtude(mapAnneeEtude(getCellValue(row.getCell(5))));

                        // Validation basique
                        if (isValidEtudiant(etudiant)) {
                            etudiants.add(etudiant);
                        }
                    } catch (Exception e) {
                        System.err.println("Erreur ligne " + (i + 1) + ": " + e.getMessage());
                    }
                }
            }
        }

        if (etudiants.isEmpty()) {
            throw new RuntimeException("Aucun étudiant valide trouvé dans le fichier");
        }

        return etudiants;
    }

    public byte[] generateTemplate() throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Etudiants");

            // Créer l'en-tête
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Nom", "Prénom", "Email", "Genre", "Filière", "Année d'Étude"};

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 4000);
            }

            // Ajouter quelques exemples
            String[][] examples = {
                    {"Dupont", "Jean", "jean.dupont@email.com", "HOMME", "INFO", "DEUXIEMEANNEE"},
                    {"Martin", "Marie", "marie.martin@email.com", "FEMME", "INDUS", "PREMIEREANNEE"},
                    {"Durand", "Pierre", "pierre.durand@email.com", "HOMME", "SEII", "TROISIEMEANNEE"}
            };

            for (int i = 0; i < examples.length; i++) {
                Row row = sheet.createRow(i + 1);
                for (int j = 0; j < examples[i].length; j++) {
                    row.createCell(j).setCellValue(examples[i][j]);
                }
            }

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                workbook.write(outputStream);
                return outputStream.toByteArray();
            }
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }

    private boolean isRowEmpty(Row row) {
        for (int i = 0; i < 6; i++) {
            Cell cell = row.getCell(i);
            if (cell != null && !getCellValue(cell).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private String mapGenre(String genre) {
        if (genre == null || genre.isEmpty()) return "";

        String upperGenre = genre.toUpperCase().trim();
        return switch (upperGenre) {
            case "HOMME", "MASCULIN", "M", "MALE" -> "HOMME";
            case "FEMME", "FÉMININ", "FEMININ", "F", "FEMALE" -> "FEMME";
            default -> upperGenre;
        };
    }

    private String mapFiliere(String filiere) {
        if (filiere == null || filiere.isEmpty()) return "";

        String upperFiliere = filiere.toUpperCase().trim();
        return switch (upperFiliere) {
            case "INFORMATIQUE", "COMPUTER SCIENCE", "CS" -> "INFO";
            case "INDUSTRIEL", "INDUSTRIAL" -> "INDUS";
            case "SYSTÈME EMBARQUÉ", "SYSTEME EMBARQUE", "EMBEDDED SYSTEMS" -> "SEII";
            case "MÉCANIQUE", "MECANIQUE", "MECHANICAL" -> "MECA";
            default -> upperFiliere;
        };
    }

    private String mapAnneeEtude(String annee) {
        if (annee == null || annee.isEmpty()) return "";

        String upperAnnee = annee.toUpperCase().trim();
        return switch (upperAnnee) {
            case "1", "PREMIÈRE", "PREMIERE", "FIRST", "1ÈRE", "1ERE" -> "PREMIEREANNEE";
            case "2", "DEUXIÈME", "DEUXIEME", "SECOND", "2ÈME", "2EME" -> "DEUXIEMEANNEE";
            case "3", "TROISIÈME", "TROISIEME", "THIRD", "3ÈME", "3EME" -> "TROISIEMEANNEE";
            default -> upperAnnee;
        };
    }

    private boolean isValidEtudiant(EtudiantImportDto etudiant) {
        return etudiant.getNom() != null && !etudiant.getNom().isEmpty() &&
                etudiant.getPrenom() != null && !etudiant.getPrenom().isEmpty() &&
                etudiant.getEmail() != null && !etudiant.getEmail().isEmpty() &&
                etudiant.getEmail().contains("@");
    }
}
