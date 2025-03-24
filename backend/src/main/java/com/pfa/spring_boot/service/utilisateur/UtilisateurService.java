package com.pfa.spring_boot.service.utilisateur;


import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import com.pfa.spring_boot.utilities.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private Mapper mapper;

    public Set<String> getRolesByUserEmail(String email){
        return mapper.toUtilisateurDto(utilisateurRepository.findByEmail(email)).getRoles();
    }
}
