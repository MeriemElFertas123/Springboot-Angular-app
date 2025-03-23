package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.service.authentication.AuthentificationService;
import com.pfa.spring_boot.utilities.UtilisateurAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class UtilisateurController {

    @Autowired
    private AuthentificationService authentificationService;


    @PostMapping("/auth")

    public Boolean authUser(@RequestBody UtilisateurAuth utilisateurAuth){
        return this.authentificationService.authenticateUser(utilisateurAuth);
    }
}
