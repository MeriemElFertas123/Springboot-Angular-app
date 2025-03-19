import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Etudiant } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";
import { NgIf } from '@angular/common';
import { EtudiantService } from '../../service/etudiant.service';

@Component({
  selector: 'app-espace-professeur',
  standalone: true,
  imports: [SideBarProfComponent],
  templateUrl: './espace-professeur.component.html',
  styleUrl: './espace-professeur.component.css'
})
export class EspaceProfesseurComponent {

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //********************************** 
  listEtudiantsEncadre:Etudiant[]=[];
  constructor(private etudiantService:EtudiantService){
    etudiantService.getStudents().subscribe(
      (res:Etudiant[])=>{
        this.listEtudiantsEncadre=res;
      }
    );
  }


}
