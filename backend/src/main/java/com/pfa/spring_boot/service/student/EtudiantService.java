package com.pfa.spring_boot.service.student;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.entities.Etudiant;

import java.util.List;

public interface EtudiantService {
    public List<EtudiantDto> getAllStudents();
    public EtudiantDto createStudent(EtudiantDto payload);
    public EtudiantDto updateStudent(EtudiantDto payload,Long id);
    EtudiantDto getStudentById(Long id);
    EtudiantDto getStudentByEmail(String email);

    public String deleteStudent(Long id);
}
