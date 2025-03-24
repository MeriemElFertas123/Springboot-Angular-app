package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.service.authentication.AuthentificationService;
import com.pfa.spring_boot.service.utilisateur.UtilisateurService;
import com.pfa.spring_boot.utilities.UtilisateurAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api")
public class UtilisateurController {

    @Autowired
    private AuthentificationService authentificationService;
    @Autowired
    private UtilisateurService utilisateurService;


    @PostMapping("/auth")
    @CrossOrigin(origins = "http://localhost:4200")
    public Boolean authUser(@RequestBody UtilisateurAuth utilisateurAuth){
        return this.authentificationService.authenticateUser(utilisateurAuth);
    }


    @GetMapping("/role")
    public Set<String> getRolesByUserEmail(@RequestParam String email){
        System.out.println("==> chercher les roles de l'utilisateur avec email : "+email);
        return this.utilisateurService.getRolesByUserEmail(email);
    }
}
