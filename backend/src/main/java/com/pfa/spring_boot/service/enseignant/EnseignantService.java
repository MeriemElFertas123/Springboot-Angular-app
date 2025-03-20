package com.pfa.spring_boot.service.enseignant;

import com.pfa.spring_boot.dto.EnseignantDto;
import com.pfa.spring_boot.dto.EtudiantDto;

import java.util.List;

public interface EnseignantService {
    public List<EnseignantDto> getAllEnseignants();
    public EnseignantDto createEnseignant(EnseignantDto payload);
    public EnseignantDto updateEnseignant(EnseignantDto payload,Long id);
    EnseignantDto getEnseignantById(Long id);
    public String deleteEnseignant(Long id);
}