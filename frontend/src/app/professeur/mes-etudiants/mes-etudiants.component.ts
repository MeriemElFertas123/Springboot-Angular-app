import { Component } from '@angular/core';
import { Etudiant } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';
import { EtudiantService } from '../../service/etudiant.service';
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";

@Component({
  selector: 'app-mes-etudiants',
  standalone:true,
  imports: [RouterLink, SideBarProfComponent],
  templateUrl: './mes-etudiants.component.html',
  styleUrl: './mes-etudiants.component.css'
})
export class MesEtudiantsComponent {
  mesEtudiants:Etudiant[]=[];
  constructor(private etudiantService:EtudiantService){
    etudiantService.getStudents().subscribe(
      (res:Etudiant[])=>{
        this.mesEtudiants=res;
      }
    );
  }
}
