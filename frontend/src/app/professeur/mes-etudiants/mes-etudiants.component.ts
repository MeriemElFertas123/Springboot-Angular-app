import { Component, OnInit ,inject} from '@angular/core';
import { Etudiant } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';
import { EtudiantService } from '../../service/etudiant.service';
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { HttpClient } from '@angular/common/http';
import { EnseignantService } from '../../service/enseignant.service';
import { EncadrementService } from '../../service/encadrement.service';

@Component({
  selector: 'app-mes-etudiants',
  standalone:true,
  imports: [SideBarProfComponent, UserProfileMenuComponent],
  templateUrl: './mes-etudiants.component.html',
  styleUrl: './mes-etudiants.component.css'
})
export class MesEtudiantsComponent implements OnInit{

  connectedUser:any;
  idEnseignant=-1;
  mesEtudiants:any[]=[];

  enseignantService = inject(EnseignantService);
  encadrementService=inject(EncadrementService);

  ngOnInit(): void {
    const userData = localStorage.getItem('connectedUser');
    if(userData){
      this.connectedUser=JSON.parse(userData);
      this.idEnseignant=this.connectedUser.id;

      this.encadrementService.getEtudiantsByEnseignantId(this.idEnseignant).subscribe((res:any)=>{
        this.mesEtudiants=res;
      })
    }
  }



  // constructor(){
  //   
  // }
}
