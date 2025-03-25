package com.pfa.spring_boot.service.admin;


import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import com.pfa.spring_boot.utilities.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private Mapper mapper;

    public List<UtilisateurDto> getAllUsersDto(){
      return this.utilisateurRepository.findAll().stream().map(
              user->mapper.toUtilisateurDto(user)
      ).collect(Collectors.toList());
    }


    public UtilisateurDto saveUser(UtilisateurDto utilisateurDto){
        if(utilisateurRepository.existsByEmail(utilisateurDto.getEmail())){
            throw new RuntimeException("email "+utilisateurDto.getEmail()+" already exist");
        }
        Utilisateur utilisateur=this.mapper.toUtilisateurEntity(utilisateurDto);
        return this.mapper.toUtilisateurDto(this.utilisateurRepository.save(utilisateur));
    }

}
