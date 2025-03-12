package com.ProjetPfa.ProjetPfa.Controllers;

import com.ProjetPfa.ProjetPfa.Dto.StudentDto;
import com.ProjetPfa.ProjetPfa.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
@CrossOrigin(origins = "http://localhost:57568")
public class StudentController {
    @Autowired
    public StudentService studentService;


    @PostMapping("create")
    public ResponseEntity<?> createStudent(@RequestBody StudentDto dto) {
        try {
            if (dto.getUsername() == null || dto.getUsername().isEmpty() ||
                    dto.getPhone() == null || dto.getPhone().isEmpty() ||
                    dto.getEmail() == null || dto.getEmail().isEmpty() ||
                    dto.getGender() == null || dto.getGender().isEmpty()) {
                return new ResponseEntity<>("Tous les champs obligatoires doivent être remplis.", HttpStatus.BAD_REQUEST);
            }

            StudentDto student = studentService.createStudent(dto);
            return new ResponseEntity<>(student, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Ajoute cette ligne pour afficher l'exception dans les logs
            return new ResponseEntity<>("Erreur lors de la création de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStudent(@RequestBody StudentDto dto, @PathVariable Long id) {
        try {
            StudentDto updatedStudent = studentService.updateStudent(dto, id);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            String msg = studentService.deleteStudent(id);
            return new ResponseEntity<>(msg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        try {
            StudentDto student = studentService.getStudentById(id);
            if (student != null) {
                return new ResponseEntity<>(student, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Étudiant non trouvé avec l'ID : " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération de l'étudiant : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("all")
    public ResponseEntity<?> getAllStudents() {
        try {
            List<StudentDto> students = studentService.getAllStudents();
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la récupération des étudiants : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}