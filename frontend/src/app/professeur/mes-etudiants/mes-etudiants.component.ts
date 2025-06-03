import { Component, OnInit ,inject} from '@angular/core';
import { Etudiant } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';
import { EtudiantService } from '../../service/etudiant.service';
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { HttpClient } from '@angular/common/http';
import { EnseignantService } from '../../service/enseignant.service';

@Component({
  selector: 'app-mes-etudiants',
  standalone:true,
  imports: [SideBarProfComponent, UserProfileMenuComponent],
  templateUrl: './mes-etudiants.component.html',
  styleUrl: './mes-etudiants.component.css'
})
export class MesEtudiantsComponent implements OnInit{

  connectedUser:any;
  enseignantService = inject(EnseignantService);
  etudiantService = inject(EtudiantService);

  ngOnInit(): void {
    const userData = localStorage.getItem('connectedUser');
    if(userData){
      this.connectedUser=JSON.parse(userData);
      console.log("==> : "+typeof this.connectedUser.id);
    }


    this.etudiantService.getStudents().subscribe(
     (res:Etudiant[])=>{
        this.mesEtudiants=res;
       }
     );
  }



   mesEtudiants:Etudiant[]=[];
  // constructor(){
  //   
  // }
}
