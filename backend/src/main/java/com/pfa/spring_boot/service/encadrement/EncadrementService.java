package com.pfa.spring_boot.service.encadrement;

import com.pfa.spring_boot.entities.Encadrement;
import com.pfa.spring_boot.entities.Enseignant;
import com.pfa.spring_boot.entities.Etudiant;
import com.pfa.spring_boot.repositories.EncadrementRepository;
import com.pfa.spring_boot.repositories.EnseignantRepository;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EncadrementService {
    @Autowired
    private EncadrementRepository encadrementRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    /**
     * Cette méthode est utilisée pour affecter un professeur à de étudiants
     * @param enseignantId l'id de l'enseignant
     * @param etudiantsIds les ids des étudiants
     * @param dateAffectation l'année de l'affectation
     * @return
     */
    public String affecterEnseignantEtudiants(Long enseignantId, List<Long> etudiantsIds, Date dateAffectation){
        Optional<Enseignant> profOptional=enseignantRepository.findById(enseignantId);

        if(profOptional.isEmpty()) return "Professeur introuvable";

        Enseignant enseignant=profOptional.get();

        for(Long etudiantId:etudiantsIds){
            Optional<Etudiant> etudiantOptional=etudiantRepository.findById(etudiantId);
            if(etudiantOptional.isPresent()){
                boolean existe=encadrementRepository.existsByEtudiantIdAndDateAffectation(etudiantId,dateAffectation);
                if(!existe){
                    Encadrement encadrement=new Encadrement();
                    encadrement.setEnseignant(enseignant);
                    encadrement.setEtudiant(etudiantOptional.get());
                    encadrement.setDateAffectation(dateAffectation);
                    encadrementRepository.save(encadrement);
                }
            }
        }
        return "Encadrement(s) ajouté avec succès";
    }

    public List<Etudiant> getEtudiantsByEnseignantId(Long idEnseignant){
        List<Encadrement> encadrements=encadrementRepository.findAll();
        List<Etudiant> etudiants=new ArrayList<>();
        for(Encadrement encadrement:encadrements){
            Long idProf=encadrement.getEnseignant().getId();
            if(idProf==idEnseignant){
                etudiants.add(encadrement.getEtudiant());
            }
        }
        return etudiants;
    }
}
