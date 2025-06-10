import { Component, inject, OnInit } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { Enseignant } from '../../model/model';
import { EnseignantService } from '../../service/enseignant.service';
import { EtudiantService } from '../../service/etudiant.service';
import { NgClass, NgFor } from '@angular/common';
import { EncadrementService } from '../../service/encadrement.service';

@Component({
  selector: 'app-affectation',
  imports: [SideBarAdminComponent,NgFor,NgClass],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.css'
})
export class AffectationComponent implements OnInit{
  
  enseignantService = inject(EnseignantService);
  etudiantService = inject(EtudiantService);

  listEnseignants : any[]=[];
  listEtudiants : any[]=[];

  idEnseignant=-1;
  idEtudiant=-1;

  selectedIdEtudiants:any[]=[];
  selectedIdEnseignant=-1;

  encadrementService=inject(EncadrementService);

  clickAffecter=0;

  ngOnInit(): void {
    this.enseignantService.getEnseignants().subscribe((resizeBy:any)=>{
      this.listEnseignants=resizeBy;
    })

    this.etudiantService.getStudents().subscribe((res:any)=>{
      this.listEtudiants=res;
    })
  }

  toggleEtudiantSelection(id:number){
    const index=this.selectedIdEtudiants.indexOf(id);
    if(index==-1){
      this.selectedIdEtudiants.push(id);
    }else{
      this.selectedIdEtudiants.splice(index,1);
    }
  }
  isEtudiantSelected(id:number):boolean{
    return this.selectedIdEtudiants.includes(id);
  }
  getSelectedEnseignantName():string{
    const prof=this.listEnseignants.find(e=>e.id==this.selectedIdEnseignant);
    return prof ? prof.nom : 'enseignant encadrant';
  }

  choisirEnseignant(id:number){
    this.selectedIdEnseignant=id;
  }

  soumettre(){
    if(this.selectedIdEtudiants.length<=2 && this.selectedIdEtudiants.length>0 ){
          const encadrement = {
          enseignantId:this.selectedIdEnseignant,
          etudiantsIds:this.selectedIdEtudiants,
          dateAffectation : new Date()
        }
        this.encadrementService.associer(encadrement).subscribe({
          next  : (res) => console.log("Succès: "+res),
          error : (err) => console.log("Erreur : "+err)
        });

        console.log(encadrement);

        this.selectedIdEtudiants=[];
        this.selectedIdEnseignant=-1;

        this.clickAffecter=1;
    }else{
      this.clickAffecter=-1;
      
    }
    
  // attendre 3 secondes puis remettre x à false
        setTimeout(() => {
          this.clickAffecter = 0;
        }, 3000); // 3000 ms = 3 secondes
  }
}
