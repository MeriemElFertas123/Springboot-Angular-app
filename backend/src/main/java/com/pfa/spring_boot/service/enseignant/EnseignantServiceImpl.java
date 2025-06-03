package com.pfa.spring_boot.service.enseignant;

import com.pfa.spring_boot.dto.EnseignantDto;
import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.Enseignant;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.repositories.EnseignantRepository;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import com.pfa.spring_boot.utilities.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class EnseignantServiceImpl implements EnseignantService{
    @Autowired
    public EnseignantRepository enseignantRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private Mapper mapper;

    @Override
    public List<EnseignantDto> getAllEnseignants() {
        List<Enseignant> enseignants=enseignantRepository.findAll();
        return enseignants.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    EnseignantDto  convertToDto(Enseignant enseignant){
        EnseignantDto enseignantDto=new EnseignantDto();
        enseignantDto.setId(enseignant.getId());
        enseignantDto.setNom(enseignant.getNom());
        enseignantDto.setPrenom(enseignant.getPrenom());
        enseignantDto.setPassword(enseignant.getPassword());
        enseignantDto.setEmail(enseignant.getEmail());
        enseignantDto.setTelephone(enseignant.getTelephone());
        enseignantDto.setImage(enseignant.getImage());
        enseignantDto.setGenre(enseignant.getGenre());
        enseignantDto.setSpecialite(enseignant.getSpecialite());

        return enseignantDto;
    }



    @Override
    public EnseignantDto createEnseignant(EnseignantDto payload){

        UtilisateurDto utilisateurDto=new UtilisateurDto();
        utilisateurDto.setEmail(payload.getEmail());
        utilisateurDto.setPassword(payload.getPassword());
        Set<String> roles=new HashSet<>();
        roles.add("ROLE_ENSEIGNANT");
        utilisateurDto.setRoles(roles);
        this.utilisateurRepository.save(this.mapper.toUtilisateurEntity(utilisateurDto));

        Enseignant enseignant= convertToEntity(payload);
        Enseignant savedEntity = enseignantRepository.save(enseignant);
        return convertToDto(savedEntity);
    }
    Enseignant convertToEntity(EnseignantDto dto){
        Enseignant enseignant=new Enseignant();
        enseignant.setId(dto.getId());
        enseignant.setNom(dto.getNom());
        enseignant.setPrenom(dto.getPrenom());
        enseignant.setEmail(dto.getEmail());
        enseignant.setPassword(dto.getPassword());
        enseignant.setTelephone(dto.getTelephone());
        enseignant.setGenre(dto.getGenre());
        enseignant.setSpecialite(dto.getSpecialite());

        enseignant.setImage(dto.getImage());
        return enseignant;
    }



    @Override
    public EnseignantDto updateEnseignant(EnseignantDto payload,Long id){
        Enseignant enseignant = enseignantRepository.findById(id).orElseThrow(()-> new RuntimeException("Data with the id : " + id + "is not found"));
        enseignant.setNom(payload.getNom());
        enseignant.setPrenom(payload.getPrenom());
        enseignant.setEmail(payload.getEmail());
        enseignant.setTelephone(payload.getTelephone());
        enseignant.setGenre(payload.getGenre());
        enseignant.setPassword(payload.getPassword());
        if(payload.getImage()==null){
            enseignant.setImage(this.enseignantRepository.findById(id).get().getImage());
        }else{
            enseignant.setImage(payload.getImage());
        }

        Enseignant savedEnseignant = enseignantRepository.save(enseignant);
        return convertToDto(savedEnseignant);
    }

    @Override
    public EnseignantDto getEnseignantById(Long id) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Énseignant non trouvé avec l'ID : " + id));
        return convertToDto(enseignant);
    }

    @Override
    public String deleteEnseignant(Long id){
        Enseignant enseignant = enseignantRepository.findById(id).orElseThrow( () -> new RuntimeException(" the data with the id : " + id + "not found"));
        enseignantRepository.delete(enseignant);
        return "";
    }


    @Override
    public EnseignantDto getEnseignantByEmail(String email) {
        Enseignant enseignant=enseignantRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Enseignant non trouvé avec l'émail : "+email));
        return convertToDto(enseignant);
    }
}