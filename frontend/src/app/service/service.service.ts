import { Injectable } from '@angular/core';
import { DepotRapportStage, Evaluation, Etudiant } from '../model/model';
import { AnneeEtude, Filiere, Genre, StatutRapport } from '../model/enums';
import { stat } from 'fs';
import { EtudiantService } from './etudiant.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // *****  Etudiants ******
  etudiants:Etudiant[]=[];

  etudiant1:Etudiant={
    id: 1,
    nom: 'Aouassar',
    prenom: 'Asmae',
    email: 'Asmae@gmail.com',
    image: undefined,
    password: '',
    telephone: '',
    genre: Genre.Femme,
    filiere: Filiere.Electronique,
    anneeEtude: AnneeEtude.Premiere
  }
  etudiant2:Etudiant={
    id: 2,
    nom: 'El Fertas',
    prenom: 'Meriem',
    image: undefined,
    email: '',
    password: '',
    telephone: '',
    genre: Genre.Femme,
    filiere: Filiere.Informatique,
    anneeEtude: AnneeEtude.Deuxieme
  }
  etudiant3:Etudiant={
    id: 3,
    nom: 'Boumlal',
    prenom: 'Ilham',
    email: 'Ilham@gmail.com',
    image: undefined,
    password: '',
    telephone: '',
    genre: Genre.Femme,
    filiere: Filiere.Mathematique,
    anneeEtude: AnneeEtude.Troisieme
  }
  etudiant4:Etudiant={
    id: 4,
    nom: 'Taoussi',
    prenom: 'Mouad',
    email: 'Mouad@gmail.com',
    image: undefined,
    password: '',
    telephone: '',
    genre: Genre.Femme,
    filiere: Filiere.Electronique,
    anneeEtude: AnneeEtude.Premiere
  }


  // Evaluations
  evaluation1:Evaluation={
    id:1,
    note:18,
    commentaire:'très bon travail'
  }
  evaluation2:Evaluation={
    id:2,
    note:18,
    commentaire:'travail terminé avec succès'
  }



  // *****  Rapports ******
  
  depotsRapports:DepotRapportStage[]=[];
  
  depotRapport1:DepotRapportStage={
    id:1,
    titre:"Développement d'une application pour la gestion des rendez-vous",
    description:"Dans ce stage j'ai développé une application pour un service hospitalier  ....",
    etudiants:[this.etudiant1,this.etudiant2],
    evaluation:this.evaluation1,
    statut:StatutRapport.VALIDE,
    submissionDate:new Date(2024,5,3,14,30)
  }
  depotRapport2:DepotRapportStage={
    id:2,
    titre:"Etude de satifaction au SIH chez les employées",
    description:"Dans ce stage on a fait une étude de satisfaction au système d'information ...",
    etudiants:[this.etudiant3],
    evaluation:this.evaluation2,
    statut:StatutRapport.VALIDE,
    submissionDate:new Date(2025,0,2,10,5)
  }
  depotRapport3:DepotRapportStage={
    id:3,
    titre:"Conception et développement d'un système de gestion des employées",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam nam corrupti, voluptatem quos tempore a iusto reprehenderit veniam voluptate!.",
    etudiants:[this.etudiant4],
    evaluation:null,
    statut:StatutRapport.REFUSE,
    submissionDate:new Date(2024,8,25,12,45)
  }



  constructor(private etudiantService:EtudiantService) { 
    /*
    this.etudiants.push(this.etudiant1);
    this.etudiants.push(this.etudiant2);
    this.etudiants.push(this.etudiant3);
    this.etudiants.push(this.etudiant4);
*/
    this.depotsRapports.push(this.depotRapport1);
    this.depotsRapports.push(this.depotRapport2);
    this.depotsRapports.push(this.depotRapport3);
    this.etudiantService.getStudents().subscribe(
      (res:Etudiant[])=>{
        this.etudiants=res;
      }
    )
  }




  getRapports():DepotRapportStage[]{
    return this.depotsRapports;
  }


  getDepotById(id:number):DepotRapportStage | null{
    for(let depot of this.depotsRapports){
      if(depot.id==id) return depot;
    }
    return null;
  }



  setEvaluation(idDepotStage:number,evaluation:Evaluation){
    for(let depot of this.depotsRapports){
      if(depot.id===idDepotStage){
        depot.evaluation=evaluation;
        return;
      }
    }
  }


 setStatutRapportById(id:number,statut:string):DepotRapportStage[]{
  for(let depot of this.depotsRapports){
    if(depot.id===id){
      if(statut==='V'){
        depot.statut=StatutRapport.VALIDE;
      }else{
        depot.statut=StatutRapport.REFUSE;
      }
    }
  }
  return this.depotsRapports;
 }
  
}
