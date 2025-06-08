package com.pfa.spring_boot.service.student;

import com.pfa.spring_boot.dto.EtudiantDto;
import com.pfa.spring_boot.dto.PasswordUpdateRequest;
import com.pfa.spring_boot.dto.UtilisateurDto;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.entities.Stage;
import com.pfa.spring_boot.entities.Utilisateur;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.repositories.EnseignantRepository;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import com.pfa.spring_boot.repositories.UtilisateurRepository;
import com.pfa.spring_boot.service.admin.AdminService;
import com.pfa.spring_boot.service.encadrement.EncadrementService;
import com.pfa.spring_boot.service.enseignant.EnseignantService;
import com.pfa.spring_boot.utilities.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EtudiantServiceImpl implements EtudiantService{

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EncadrementService encadrementService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AdminService adminService;
    @Autowired
    private Mapper mapper;
    @Autowired
    private UtilisateurRepository utilisateurRepository;



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
        etudiantDto.setPassword(etudiant.getPassword());
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

        // Sauvegarder également dans la table utilisateur
        UtilisateurDto utilisateurDto=new UtilisateurDto();
        utilisateurDto.setEmail(payload.getEmail());
        utilisateurDto.setPassword(payload.getPassword());
        Set<String> roles=new HashSet<>();
        roles.add("ROLE_STUDENT");
        utilisateurDto.setRoles(roles);
        utilisateurRepository.save(this.mapper.toUtilisateurEntity(utilisateurDto));


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
        if(payload.getImage()==null){
            etudiant.setImage(this.etudiantRepository.findById(id).get().getImage());
        }
        else{
            etudiant.setImage(payload.getImage());
        }


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
    public EtudiantDto getStudentByEmail(String email) {
        Etudiant etudiant=etudiantRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Étudiant non trouvé avec l'émail : "+email));
        return convertToDto(etudiant);
    }

    @Override
    public String deleteStudent(Long id){
        Etudiant student = etudiantRepository.findById(id).orElseThrow( () -> new RuntimeException(" the data with the id : " + id + "not found"));
        etudiantRepository.delete(student);

        Utilisateur userToDelete=this.utilisateurRepository.findByEmail(student.getEmail());

        // 1-> Supprimer l'id de l'utilisateur de la table users_roles
        userToDelete.getRoles().clear();
        this.utilisateurRepository.save(userToDelete);

        //2 -> supprimer l'utilisateur
        this.utilisateurRepository.delete(this.utilisateurRepository.findByEmail(student.getEmail()));


        return "";
    }

    @Override
    public List<Stage> getStagesByEtudiantId(Long etudiantId) {
        Etudiant etudiant=etudiantRepository.findById(etudiantId).orElseThrow(
                ()->new RuntimeException("Etudiant avec id "+etudiantId+" non trouvé"));
        return  etudiant.getStages();
    }

    public int getNombreRapportsDeposes(Long idProf,int annee){
        List<Etudiant> etudiants=encadrementService.getEtudiantsByEnseignantId(idProf);
        int nbrTotalRapport=0;
        LocalDate dateDepot = LocalDate.of(2024, 1, 1);
        for(Etudiant etudiant:etudiants){
            List<Stage> stages=etudiant.getStages();
            for(Stage stage:stages){
                if(stage.getDateDepot().isAfter(dateDepot)){
                    nbrTotalRapport+=1;
                }
            }
        }
        return nbrTotalRapport;
    }

    public int getNombreRapportsDeposesValides(Long idProf,int annee){
        List<Etudiant> etudiants=encadrementService.getEtudiantsByEnseignantId(idProf);
        int nbrTotalRapport=0;
        LocalDate dateDepot = LocalDate.of(2024, 1, 1);
        for(Etudiant etudiant:etudiants){
            List<Stage> stages=etudiant.getStages();
            for(Stage stage:stages){
                if(stage.getDateDepot().isAfter(dateDepot) && stage.getStatutRapport()== StatutRapport.VALIDE){
                    nbrTotalRapport+=1;
                }
            }
        }
        return nbrTotalRapport;
    }


    public void updatePassword(Long etudiantId, PasswordUpdateRequest request) {
        // 1. Récupérer l'étudiant
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID: " + etudiantId));

        // 2. Vérifier le mot de passe actuel
        if (!passwordEncoder.matches(request.getCurrentPassword(), etudiant.getPassword())) {
            throw new IllegalArgumentException("Mot de passe actuel incorrect");
        }

        // 3. Encoder et sauvegarder le nouveau mot de passe
        String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
        etudiant.setPassword(encodedNewPassword);

        etudiantRepository.save(etudiant);
    }

}
