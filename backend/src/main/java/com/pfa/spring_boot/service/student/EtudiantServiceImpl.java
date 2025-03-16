package com.pfa.spring_boot.service.student;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EtudiantServiceImpl implements EtudiantService{

    @Autowired
    public EtudiantRepository etudiantRepository;

    @Override
    public List<EtudiantDto> getAllStudents() {
        List<Etudiant> etudiants=etudiantRepository.findAll();
        return etudiants.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    EtudiantDto convertToDto(Etudiant etudiant){
        EtudiantDto etudiantDto=new EtudiantDto();
        etudiantDto.setId(etudiant.getId());
        etudiantDto.setNom(etudiant.getNom());
        etudiantDto.setPrenom(etudiant.getPrenom());
        etudiantDto.setEmail(etudiant.getEmail());
        etudiantDto.setTelephone(etudiant.getTelephone());
        etudiantDto.setImage(etudiant.getImage());
        etudiantDto.setGenre(etudiant.getGenre());
        etudiantDto.setFiliere(etudiant.getFiliere());
        etudiantDto.setAnneeEtude(etudiant.getAnneeEtude());
        return etudiantDto;
    }



    @Override
    public EtudiantDto createStudent(EtudiantDto payload){
        Etudiant etudiant = convertToEntity(payload);
        Etudiant savedEntity = etudiantRepository.save(etudiant);
        return convertToDto(savedEntity);
    }
    Etudiant convertToEntity(EtudiantDto dto){
        Etudiant etudiant=new Etudiant();
        etudiant.setId(dto.getId());
        etudiant.setNom(dto.getNom());
        etudiant.setPrenom(dto.getPrenom());
        etudiant.setEmail(dto.getEmail());
        etudiant.setPassword(dto.getPassword());
        etudiant.setTelephone(dto.getTelephone());
        etudiant.setGenre(dto.getGenre());
        etudiant.setFiliere(dto.getFiliere());
        etudiant.setAnneeEtude(dto.getAnneeEtude());
        etudiant.setImage(dto.getImage());
        return etudiant;
    }



    @Override
    public EtudiantDto updateStudent(EtudiantDto payload,Long id){
        Etudiant etudiant = etudiantRepository.findById(id).orElseThrow(()-> new RuntimeException("Data with the id : " + id + "is not found"));
        etudiant.setNom(payload.getNom());
        etudiant.setPrenom(payload.getPrenom());
        etudiant.setEmail(payload.getEmail());
        etudiant.setTelephone(payload.getTelephone());
        etudiant.setGenre(payload.getGenre());
        etudiant.setPassword(payload.getPassword());

        etudiant.setFiliere(payload.getFiliere());
        etudiant.setAnneeEtude(payload.getAnneeEtude());
        etudiant.setImage(payload.getImage());

        Etudiant savedEtudiant = etudiantRepository.save(etudiant);
        return convertToDto(savedEtudiant);
    }

    @Override
    public EtudiantDto getStudentById(Long id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID : " + id));
        return convertToDto(etudiant);
    }

    @Override
    public String deleteStudent(Long id){
        Etudiant student = etudiantRepository.findById(id).orElseThrow( () -> new RuntimeException(" the data with the id : " + id + "not found"));
        etudiantRepository.delete(student);
        return "";
    }
}
