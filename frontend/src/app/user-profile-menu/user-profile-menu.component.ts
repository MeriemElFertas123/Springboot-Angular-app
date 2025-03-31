import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from '../service/etudiant.service';
import { NgIf } from '@angular/common';
import { EnseignantService } from '../service/enseignant.service';

@Component({
  selector: 'app-user-profile-menu',
  imports: [NgIf],
  templateUrl: './user-profile-menu.component.html',
  styleUrl: './user-profile-menu.component.css'
})
export class UserProfileMenuComponent implements OnInit {

  constructor(private router:Router,
              private etudiantService:EtudiantService,
              private enseignantService : EnseignantService
            ){}
  imageUser='';
  emailUser='';

  connectedUser:any={
    id:'',
    nom:'',
    prenom:'',
    espace:''
  }

  ngOnInit(): void {
    const connectedUser=localStorage.getItem('connectedUser');
    if(connectedUser){
      this.connectedUser=JSON.parse(connectedUser);
      if(this.connectedUser.espace=="etudiant"){
        this.etudiantService.getStudentById(this.connectedUser.id).subscribe((etudiant)=>{
          this.imageUser=etudiant.image;
          this.emailUser=etudiant.email;
        })
      }
      else if(this.connectedUser.espace=="enseignant"){
        this.enseignantService.getEnseignantById(this.connectedUser.id).subscribe((enseignant)=>{
          this.imageUser=enseignant.image;
          this.emailUser=enseignant.email;
        })
      }
      
    }
  }

  // Fonction pour changer la photo(ouvrire la boîte de dialogue)
  changePhoto(){
    document.getElementById('file-input')?.click();
  }


  // Fonction pour gérer le changement de la photo
  onFileChange(event:any){
    const file=event.target.files[0];
    if(file){
      // ici on met la logique pour mettre à jour la photo de profil
      console.log("fichier sélectionné ==>  "+file);
    }
  }



  
  logout(){
    // afficher une boîte de dialogue de confirmation
    const confirmation=window.confirm("ête-vous sûr de quitter ?")
    if(confirmation){
      // supprimer le contenu du localstorage
      localStorage.clear();
      // redirection vers la page de login
      this.router.navigate(['/login-form']);
    }
  }




}
