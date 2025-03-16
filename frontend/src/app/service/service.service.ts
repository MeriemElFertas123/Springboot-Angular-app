import { Injectable } from '@angular/core';
import { DepotRapportStage, Evaluation, Student } from '../model/model';
import { AnneeEtude, FiliereEtude, StatutRapport } from '../model/enums';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // *****  Etudiants ******
  etudiants:Student[]=[];

  etudiant1:Student={
    id:1,
    nom:'Aouassar',
    prenom:'Asmae',
    email:'Asmae@gmail.com',
    filiere:FiliereEtude.INFO,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/Asmae.jpg"
  }
  etudiant2:Student={
    id:2,
    nom:'El Fertas',
    prenom:'Meriem',
    email:'Meriem@gmail.com',
    filiere:FiliereEtude.INFO,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/Meriem.jpg"
  }
  etudiant3:Student={
    id:3,
    nom:'Boumlal',
    prenom:'Ilham',
    email:'Ilham@gmail.com',
    filiere:FiliereEtude.INFO,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/Ilham.jpg"
  }
  etudiant4:Student={
    id:4,
    nom:'Taoussi',
    prenom:'Mouad',
    email:'Mouad@gmail.com',
    filiere:FiliereEtude.INDUS,
    anneeEtude:AnneeEtude.A,
    imageUrl:"/img/Mouad.jpg"
  }


  // Evaluations
  evaluation1:Evaluation={
    id:1,
    note:18,
    comment:'très bon travail'
  }
  evaluation2:Evaluation={
    id:2,
    note:18,
    comment:'travail terminé avec succès'
  }



  // *****  Rapports ******
  depotsRapports:DepotRapportStage[]=[];
  depotRapport1:DepotRapportStage={
    id:1,
    titre:"Développement d'une application pour la gestion des rendez-vous",
    description:"Dans ce stage j'ai développé une application pour un service hospitalier  ....",
    etudiants:[this.etudiant1,this.etudiant2],
    evaluation:this.evaluation1,
    statut:StatutRapport.V,
    submissionDate:new Date(2024,5,3,14,30)
  }
  depotRapport2:DepotRapportStage={
    id:2,
    titre:"Etude de satifaction au SIH chez les employées",
    description:"Dans ce stage on a fait une étude de satisfaction au système d'information ...",
    etudiants:[this.etudiant3],
    evaluation:this.evaluation2,
    statut:StatutRapport.V,
    submissionDate:new Date(2025,0,2,10,5)
  }
  depotRapport3:DepotRapportStage={
    id:3,
    titre:"Conception et développement d'un système de gestion des employées",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam nam corrupti, voluptatem quos tempore a iusto reprehenderit veniam voluptate!.",
    etudiants:[this.etudiant4],
    evaluation:null,
    statut:StatutRapport.N,
    submissionDate:new Date(2024,8,25,12,45)
  }



  constructor() { 
    this.etudiants.push(this.etudiant1);
    this.etudiants.push(this.etudiant2);
    this.etudiants.push(this.etudiant3);
    this.etudiants.push(this.etudiant4);

    this.depotsRapports.push(this.depotRapport1);
    this.depotsRapports.push(this.depotRapport2);
    this.depotsRapports.push(this.depotRapport3);
  }


  getStudents():Student[]{
    return this.etudiants;
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
        depot.statut=StatutRapport.V;
      }else{
        depot.statut=StatutRapport.NV;
      }
    }
  }
  return this.depotsRapports;
 }
  
}
