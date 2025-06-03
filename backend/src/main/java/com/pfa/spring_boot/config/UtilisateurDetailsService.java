package com.pfa.spring_boot.config;

import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UtilisateurDetailsService  implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur=utilisateurRepository.findByEmail(email);
        Set<GrantedAuthority> authorities=utilisateur.getRoles().stream().map(
                (roles)->new SimpleGrantedAuthority(roles.getNom())
        ).collect(Collectors.toSet());

        return new User(
                email,
                utilisateur.getPassword(),
                authorities
        );
    }
}
