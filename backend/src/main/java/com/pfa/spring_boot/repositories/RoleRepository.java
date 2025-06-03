package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<UserRole,Long> {
    Optional<UserRole> findByNom(String nom);
}
