package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.EncadrementRequest;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.service.encadrement.EncadrementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encadrement")
@CrossOrigin("http://localhost:4200")
public class EncadrementController {
    @Autowired
    private EncadrementService encadrementService;

    @PostMapping("/affecter")
    public ResponseEntity<String> affecter(@RequestBody EncadrementRequest request){
        String result=encadrementService.affecterEnseignantEtudiants(
                request.getEnseignantId(),
                request.getEtudiantsIds(),
                request.getDateAffectation()
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{idProf}")
    public ResponseEntity<List<Etudiant>> getEtudiantsByProfId(@PathVariable("idProf") Long enseignantId){
        return ResponseEntity.ok(this.encadrementService.getEtudiantsByEnseignantId(enseignantId));
    }
}
