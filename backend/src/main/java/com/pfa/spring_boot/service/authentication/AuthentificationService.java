package com.pfa.spring_boot.service.authentication;

import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import com.pfa.spring_boot.utilities.UtilisateurAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthentificationService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Boolean authenticateUser(UtilisateurAuth utilisateurAuth){
        Utilisateur fetchedUser=utilisateurRepository.findByEmail(utilisateurAuth.getEmail());
        if(fetchedUser==null) return false;
        return passwordEncoder.matches(utilisateurAuth.getPassword(),fetchedUser.getPassword());
    }
}
