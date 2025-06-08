package com.pfa.spring_boot.controllers;


import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.dto.PasswordUpdateRequest;
import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.enums.etudiant.AnneeEtude;
import com.pfa.spring_boot.enums.etudiant.Filiere;
import com.pfa.spring_boot.enums.etudiant.Genre;
import com.pfa.spring_boot.service.student.EtudiantService;
import com.pfa.spring_boot.service.utilisateur.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Stack;

@RestController
@RequestMapping("student")
@CrossOrigin("http://localhost:4200")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;
    @Autowired
    private UtilisateurService utilisateurService;


    @GetMapping
    public ResponseEntity<?> getAllStudents(){
        try{
            List<EtudiantDto> etudiantDtos=etudiantService.getAllStudents();
            return new ResponseEntity<>(etudiantDtos, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Erreur lors de la récupération des étudiants"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createStudent(@RequestParam("nom") String nom,
                                           @RequestParam("prenom") String prenom,
                                           @RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("telephone") String telephone,
                                           @RequestParam("genre") String genre,
                                           @RequestParam("filiere") String filiere,
                                           @RequestParam("anneeEtude") String anneeEtude,
                                           @RequestParam("image") MultipartFile image) {
        try {
            // Convertir l'image en byte[]
            byte[] imageBytes = image.getBytes();


            // Créer un DTO et le remplir avec les données
            EtudiantDto etudiantDto = new EtudiantDto();
            etudiantDto.setNom(nom);
            etudiantDto.setPrenom(prenom);
            etudiantDto.setEmail(email);
            etudiantDto.setPassword(password); // Ensure password is set
            etudiantDto.setTelephone(telephone);
            etudiantDto.setGenre(Genre.valueOf(genre));  // Convertir le genre
            etudiantDto.setFiliere(Filiere.valueOf(filiere));  // Convertir la filière
            etudiantDto.setAnneeEtude(AnneeEtude.valueOf(anneeEtude));  // Convertir l'année d'étude
            etudiantDto.setImage(imageBytes);  // Set the image

            EtudiantDto createdStudent = etudiantService.createStudent(etudiantDto);


            return new ResponseEntity<>(createdStudent, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Erreur lors de l'enregistrement de l'image : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id,
                                           @RequestParam("nom") String nom,
                                           @RequestParam("prenom") String prenom,
                                           @RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("telephone") String telephone,
                                           @RequestParam("genre") String genre,
                                           @RequestParam("filiere") String filiere,
                                           @RequestParam("anneeEtude") String anneeEtude,
                                           @RequestPart(value = "image",required = false) MultipartFile image) {
        try {
            // Créer un DTO et le remplir avec les données
            EtudiantDto etudiantDto = new EtudiantDto();
            etudiantDto.setNom(nom);
            etudiantDto.setPrenom(prenom);
            etudiantDto.setEmail(email);
            etudiantDto.setPassword(password); // Ensure password is set
            etudiantDto.setTelephone(telephone);
            etudiantDto.setGenre(Genre.valueOf(genre));  // Convertir le genre
            etudiantDto.setFiliere(Filiere.valueOf(filiere));  // Convertir la filière
            etudiantDto.setAnneeEtude(AnneeEtude.valueOf(anneeEtude));  // Convertir l'année d'étude
            if(image!=null && !image.isEmpty()){
                // Convertir l'image en byte[]
                byte[] imageBytes = image.getBytes();
                etudiantDto.setImage(imageBytes);  // Set the image
            }

            EtudiantDto updatedStudent = etudiantService.updateStudent(etudiantDto, id);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        try {
            EtudiantDto student = etudiantService.getStudentById(id);
            if (student != null) {
                return new ResponseEntity<>(student, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Étudiant non trouvé avec l'ID : " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<?> getStudentByEmail(@PathVariable String email) {
        try {
            EtudiantDto student = etudiantService.getStudentByEmail(email);
            if (student != null) {
                return new ResponseEntity<>(student, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Étudiant non trouvé avec l'émail: " + email, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            String msg = etudiantService.deleteStudent(id);
            return new ResponseEntity<>(msg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("stages/{idEtudiant}")
    public  ResponseEntity<List<Stage>> getStagesByEtdudiantId(@PathVariable("idEtudiant") Long etudiantId){
        return ResponseEntity.ok(this.etudiantService.getStagesByEtudiantId(etudiantId));
    }


    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long id,
             @RequestBody PasswordUpdateRequest request) {

        try {
            etudiantService.updatePassword(id, request);
            return ResponseEntity.ok().build();

        } catch (IllegalArgumentException e) {
            // Mot de passe actuel incorrect
            return ResponseEntity.badRequest()
                    .body("Mot de passe actuel incorrect");

        } catch (RuntimeException e) {
            // Étudiant non trouvé
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            // Erreur serveur
            return ResponseEntity.internalServerError()
                    .body("Erreur lors de la mise à jour du mot de passe");
        }
    }


}
