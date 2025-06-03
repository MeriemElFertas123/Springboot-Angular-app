package com.pfa.spring_boot.utilities;


import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.UserRole;
import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.repositories.RoleRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class Mapper {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Utilisateur toUtilisateurEntity(UtilisateurDto utilisateurDto){
        Utilisateur utilisateur=new Utilisateur();
        utilisateur.setEmail(utilisateurDto.getEmail());
        utilisateur.setPassword(passwordEncoder.encode(utilisateurDto.getPassword()));

        Set<UserRole> userRoles=new HashSet<>();
        for(String role:utilisateurDto.getRoles()){
            UserRole userRole=roleRepository.findByNom(role).orElseThrow(()-> new RuntimeException("role "+role+" not found"));
            userRoles.add(userRole);
        }
        utilisateur.setRoles(userRoles);
        return utilisateur;
    }


    public UtilisateurDto toUtilisateurDto(Utilisateur utilisateur){
        UtilisateurDto utilisateurDto=new UtilisateurDto();

        utilisateurDto.setEmail(utilisateur.getEmail());
        utilisateur.setPassword(null);

        Set<String> roles=new HashSet<>();
        for(UserRole userRole:utilisateur.getRoles()){
            roles.add(userRole.getNom());
        }
        utilisateurDto.setRoles(roles);
        return utilisateurDto;
    }
}
