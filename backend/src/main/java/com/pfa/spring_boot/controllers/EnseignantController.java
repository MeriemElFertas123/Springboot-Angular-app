package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.EnseignantDto;
import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.enums.etudiant.AnneeEtude;
import com.pfa.spring_boot.enums.etudiant.Filiere;
import com.pfa.spring_boot.enums.etudiant.Genre;
import com.pfa.spring_boot.enums.professeur.Specialite;
import com.pfa.spring_boot.service.enseignant.EnseignantService;
import com.pfa.spring_boot.service.student.EtudiantService;
import com.pfa.spring_boot.service.utilisateur.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("enseignant")
@CrossOrigin("http://localhost:4200")

public class EnseignantController {
    @Autowired
    private EnseignantService enseignantService;
    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> getAllEnseignants(){
        try{
            List<EnseignantDto> enseignantDtos=enseignantService.getAllEnseignants();
            return new ResponseEntity<>(enseignantDtos, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Erreur lors de la récupération des étudiants"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createEnseignant(@RequestParam("nom") String nom,
                                              @RequestParam("prenom") String prenom,
                                              @RequestParam("email") String email,
                                              @RequestParam("password") String password,
                                              @RequestParam("telephone") String telephone,
                                              @RequestParam("genre") String genre,
                                              @RequestParam("specialite") String specialite,
                                              @RequestParam("image") MultipartFile image
                                              ) {

        try {
            byte[] imageBytes=image.getBytes();

            EnseignantDto enseignantDto=new EnseignantDto();
            enseignantDto.setNom(nom);
            enseignantDto.setPrenom(prenom);
            enseignantDto.setEmail(email);
            enseignantDto.setPassword(password);
            enseignantDto.setTelephone(telephone);
            enseignantDto.setGenre(Genre.valueOf(genre));
            enseignantDto.setSpecialite(Specialite.valueOf(specialite));
            enseignantDto.setImage(imageBytes);


            EnseignantDto createdEnseignant = enseignantService.createEnseignant(enseignantDto);
            return new ResponseEntity<>(createdEnseignant, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Valeur invalide pour Genre ou Spécialité", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la création de l'enseignant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateEnseignant(@PathVariable Long id,
                                              @RequestParam("nom") String nom,
                                              @RequestParam("prenom") String prenom,
                                              @RequestParam("email") String email,
                                              @RequestParam("password") String password,
                                              @RequestParam("telephone") String telephone,
                                              @RequestParam("genre") String genre,
                                              @RequestParam("specialite") String specialite,
                                              @RequestParam(value = "image",required = false) MultipartFile image
                                              ) {
        try {


            EnseignantDto enseignantDto=new EnseignantDto();
            enseignantDto.setNom(nom);
            enseignantDto.setPrenom(prenom);
            enseignantDto.setEmail(email);
            enseignantDto.setPassword(password);
            enseignantDto.setTelephone(telephone);
            enseignantDto.setGenre(Genre.valueOf(genre));
            enseignantDto.setSpecialite(Specialite.valueOf(specialite));
            if(image!=null){
                byte[] imageBytes=image.getBytes();
                enseignantDto.setImage(imageBytes);
            }

            EnseignantDto updatedEnseignant = enseignantService.updateEnseignant(enseignantDto, id);
            return new ResponseEntity<>(updatedEnseignant, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getEnseignantById(@PathVariable Long id) {
        try {
            EnseignantDto enseignant = enseignantService.getEnseignantById(id);
            if (enseignant != null) {
                return new ResponseEntity<>(enseignant, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Étudiant non trouvé avec l'ID : " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteEnseignant(@PathVariable Long id) {
        try {
            String msg = enseignantService.deleteEnseignant(id);
            utilisateurService.deleteUserById(id);
            return new ResponseEntity<>(msg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getEnseignantByEmail(@PathVariable String email) {
        try {
            EnseignantDto enseignant = enseignantService.getEnseignantByEmail(email);
            if (enseignant != null) {
                return new ResponseEntity<>(enseignant, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Étudiant non trouvé avec l'émail: " + email, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}