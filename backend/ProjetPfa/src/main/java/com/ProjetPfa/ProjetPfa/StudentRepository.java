package com.ProjetPfa.ProjetPfa;

import com.ProjetPfa.ProjetPfa.Entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {

}
