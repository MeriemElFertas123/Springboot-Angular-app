package com.pfa.spring_boot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests((authorize) -> {
                    // Endpoints spécifiques publics
                    authorize.requestMatchers("/api/stages/export/excel").permitAll();
                    authorize.requestMatchers("/api/stages/annees").permitAll();
                    authorize.requestMatchers("/api/**").permitAll(); // Si vous avez des endpoints d'auth

                    // Autres endpoints publics généraux
                    authorize.requestMatchers("/student/**", "/enseignant/**", "/ws/**").permitAll();

                    // Endpoints API qui nécessitent une authentification
                    authorize.requestMatchers("/api/stages/**").authenticated(); // Autres endpoints stages
                    authorize.requestMatchers("/api/**").authenticated(); // Autres endpoints API

                    // Tous les autres endpoints nécessitent une authentification
                    authorize.anyRequest().authenticated();
                })
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}