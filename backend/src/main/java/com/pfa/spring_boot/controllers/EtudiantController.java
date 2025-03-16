package com.pfa.spring_boot.controllers;


import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.service.student.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
@CrossOrigin("http://localhost:4200")
public class EtudiantController {

    @Autowired
    public EtudiantService etudiantService;

    @GetMapping
    public ResponseEntity<?> getAllStudents(){
        try{
            List<EtudiantDto> etudiantDtos=etudiantService.getAllStudents();
            return new ResponseEntity<>(etudiantDtos, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Erreur lors de la récupération des étudiants"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("create")
    public ResponseEntity<?> createStudent(@RequestBody EtudiantDto dto) {

        EtudiantDto student = etudiantService.createStudent(dto);
            return new ResponseEntity<>(student, HttpStatus.OK);
        }


    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStudent(@RequestBody EtudiantDto dto, @PathVariable Long id) {
        try {
            EtudiantDto updatedStudent = etudiantService.updateStudent(dto, id);
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



    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            String msg = etudiantService.deleteStudent(id);
            return new ResponseEntity<>(msg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
