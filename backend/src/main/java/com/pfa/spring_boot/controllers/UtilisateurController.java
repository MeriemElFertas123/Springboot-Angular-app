package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.service.authentication.AuthentificationService;
import com.pfa.spring_boot.service.utilisateur.UtilisateurService;
import com.pfa.spring_boot.utilities.UtilisateurAuth;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")

public class UtilisateurController {

    @Autowired
    private AuthentificationService authentificationService;
    @Autowired
    private UtilisateurService utilisateurService;


    @PostMapping("/auth")
    public ResponseEntity<Boolean> authUser(@RequestBody UtilisateurAuth utilisateurAuth){
        System.out.println("email: "+utilisateurAuth.getEmail()+" , pswrd : "+utilisateurAuth.getPassword());
       Boolean isAuthenticated=this.authentificationService.authenticateUser(utilisateurAuth);
       return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(isAuthenticated);
    }


    @GetMapping("/role")
    public Set<String> getRolesByUserEmail(@RequestParam String email){
        return this.utilisateurService.getRolesByUserEmail(email);
    }


}
