
import { DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';

import { Component ,ElementRef,inject,OnInit,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepotRapportStage, Evaluation } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { StatutRapport } from '../../model/enums';
import { FormGroup,FormControl,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { EncadrementService } from '../../service/encadrement.service';
import { EtudiantService } from '../../service/etudiant.service';
import { StageServiceService } from '../../service/stage-service.service';

@Component({
  selector: 'app-rapports-stage',
  standalone:true,
  imports: [RouterLink,NgIf,
    DatePipe,
    NgStyle,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule, SideBarProfComponent, UserProfileMenuComponent],
  templateUrl: './rapports-stage.component.html',
  styleUrl: './rapports-stage.component.css'
})
export class RapportsStageComponent implements OnInit{

  connectedUser:any;
  idEnseignant=-1;
  encadrementService=inject(EncadrementService);
  etudiantService = inject(EtudiantService)
  mesEtudiants:any[]=[];
  listStages:any[]=[];
  listStagesNonValide:any[]=[];
  listStagesValides:any[]=[];
  

  stageService = inject(StageServiceService);
  
  clickStageValideTemp=false;
  idStageClick=-1;

  // Modal pour l'évaluation d'un rapport
  @ViewChild('voirevaluationmodal') voirEvaluationModal: ElementRef | undefined;
  @ViewChild('addevaluationmodal') addEvaluationModal:ElementRef | undefined;


  // Dépot de stage to evaluate
  formAddEvaluation=new FormGroup({
    note:new FormControl(''),
    comment:new FormControl('')
  })

  // Pour éditer le statut d'un rapport
  idDepotToEditStatut:number=-1;  
 

  evaluationDepotSelectionne!:Evaluation | null | undefined;
  idDepotRapStageToEvaluate:number=-1;

  snackbar=inject(MatSnackBar);

  ngOnInit(){
    const userData = localStorage.getItem('connectedUser');
    if(userData){
      this.connectedUser=JSON.parse(userData);
      this.idEnseignant=this.connectedUser.id;
      this.updateFromDB();
      
    }

    // this.fetchRappStageAddSelectedProp();
  }

  updateFromDB(){
    this.encadrementService.getEtudiantsByEnseignantId(this.idEnseignant).subscribe((res:any)=>{
        this.mesEtudiants=res;
        for(let etudiant of this.mesEtudiants){
          this.etudiantService.getStagesByEtudiantId(etudiant.id).subscribe((stages:any) => {
          this.listStages.push(...stages);
          
          const nonValides = stages.filter((s:any) => s.statutRapport!=='VALIDE');
          this.listStagesNonValide.push(...nonValides);

          const valies = stages.filter((s:any) => s.statutRapport==='VALIDE');
          this.listStagesValides.push(...valies);
          });
        }
        
      })
  }



/*
  fetchRappStageAddSelectedProp(){
    this.listDepotsRapport=this.listDepotsRapport.map(depot=>({
      ...depot,
      selectedRadio:depot.selectedRadio || null // ajouter une propriété 'selectdRadio' si elle n'existe pas
    }))

    this.listDepotsRapport.forEach(depot=>{

      if(depot.statut==StatutRapport.V){
        depot.selectedRadio='V';
      }else if(depot.statut==StatutRapport.NV){
        depot.selectedRadio='NV';
      }else{
        depot.selectedRadio=null;
      }
    })
  }*/


  getColorSelonStatut(statut:StatutRapport | null){
    switch(statut){
      case StatutRapport.VALIDE:
        return 'rgb(68, 193, 68)';
      case StatutRapport.REFUSE:
        return 'rgb(255, 70, 70)';
      default:
        return 'grey';
    }
  }
/*
  voirEvaluationOpenModal(idDepotRapport:number){
    if(this.voirEvaluationModal){
      this.voirEvaluationModal.nativeElement.style.display='block';
      const depotStageCourant=this.service.getDepotById(idDepotRapport);
      this.evaluationDepotSelectionne=depotStageCourant?.evaluation;
    }
  }*/

  closeModal(){
    if(this.voirEvaluationModal){
      this.voirEvaluationModal.nativeElement.style.display='none';
    }
  }


  openModalAddEval(idDepotRapport:number){
    if(this.addEvaluationModal){
      this.addEvaluationModal.nativeElement.style.display='block';
      this.idDepotRapStageToEvaluate=idDepotRapport;
    }
  }

  closeModalAddEval(){
    if(this.addEvaluationModal){
      this.addEvaluationModal.nativeElement.style.display='none';
    }
  }
/*
  saveEvaluation(){
    const newEvaluation:Evaluation={
      id:Math.floor(Math.random()*52),
      note: Number(this.formAddEvaluation.value.note) ?? 0 ,
      commentaire:this.formAddEvaluation.value.comment ?? ''
    }

    this.service.setEvaluation(this.idDepotRapStageToEvaluate,newEvaluation);
    this.closeModalAddEval();
    this.snackbar.open("L'évaluation du rapport est ajouté avec succès","Close",{duration:5000});
  }*/

  resetRadioCheck(depotRapport:DepotRapportStage){
    depotRapport.selectedRadio=null;
  }


  editStatut(id:number,statut:StatutRapport){
    this.idDepotToEditStatut=id;
    
  }
/*
  saveNewStatus(depot:DepotRapportStage){
    if(depot.selectedRadio!=null && depot.selectedRadio!=undefined){
      this.listDepotsRapport=this.service.setStatutRapportById(depot.id,depot.selectedRadio);
      this.idDepotToEditStatut=-1;
      this.fetchRappStageAddSelectedProp();
    }
   

  }*/


    validerRapport(id : number){
     this.idStageClick=id;
      this.clickStageValideTemp=true;

      this.stageService.validerStage(id).subscribe(()=>{

         const stageModifie = this.listStages.find(s=>s.id===id);
       if(stageModifie){
        stageModifie.statutRapport='VALIDE';
       }

       setTimeout(()=>{
        this.clickStageValideTemp=false;
       this.listStagesNonValide=this.listStages.filter(s => s.statutRapport!=='VALIDE');
       },3000)
      })
    }

   telechargerRapport(id : number){
    console.log("==> "+id)
    this.stageService.downloadRapport(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rapport.pdf'; // nom du fichier
      a.click();
      window.URL.revokeObjectURL(url);
    });
   }
  
   filtrerRapportsParType(type : string){
    this.listStagesValides=this.listStages.filter(s => s.statutRapport==='VALIDE')
    if(type!=='none'){
      this.listStagesValides=this.listStagesValides.filter(s => s.typeStage===type);
    }
   }

   filtrerParAnneeDepot(annee : string){
    this.listStagesValides=this.listStages.filter(s => s.statutRapport==='VALIDE');
    if(annee!=='none'){
      this.listStagesValides=this.listStagesValides.filter(s => s.dateDepot.slice(0,4)===annee);
    }
   }

  }


