package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.service.stage.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//**@RestController** indique que la classe est un contrôleur
// Spring Boot qui gère les requêtes HTTP et renvoie des réponses au format JSON.
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


}
