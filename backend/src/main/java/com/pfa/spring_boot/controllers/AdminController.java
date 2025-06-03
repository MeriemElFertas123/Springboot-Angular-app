package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UtilisateurDto> getAllUsersDtp(){
        return adminService.getAllUsersDto();
    }


    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> saveUser(@RequestBody UtilisateurDto utilisateurDto){
        try{
            UtilisateurDto savedUserDto=this.adminService.saveUser(utilisateurDto);
            return ResponseEntity.ok("l'utilisateur est ajoutée avec succès");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
