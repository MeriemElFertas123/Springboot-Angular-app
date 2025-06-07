package com.pfa.spring_boot.service.student;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.entities.Stage;

import java.util.List;

public interface EtudiantService {
    List<EtudiantDto> getAllStudents();
    public EtudiantDto createStudent(EtudiantDto payload);
    public EtudiantDto updateStudent(EtudiantDto payload,Long id);
    EtudiantDto getStudentById(Long id);
    EtudiantDto getStudentByEmail(String email);

    public String deleteStudent(Long id);

    List<Stage> getStagesByEtudiantId(Long etudiantId);

    int getNombreRapportsDeposes(Long idProf,int annee);
    int getNombreRapportsDeposesValides(Long idProf,int annnee);

}
