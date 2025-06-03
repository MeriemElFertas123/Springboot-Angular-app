package com.pfa.spring_boot.repositories;

import com.pfa.spring_boot.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;//(interface de spring data ;Java Persistence API)
//Long : Le type de la clé primaire de l'entité Stage.
public interface StageRepository extends JpaRepository<Stage, Long> {
}
