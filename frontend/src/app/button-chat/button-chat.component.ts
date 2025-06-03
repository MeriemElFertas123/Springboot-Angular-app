import { Component, ElementRef, ViewChild,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { EtudiantService } from '../service/etudiant.service';
import { Enseignant, Etudiant } from '../model/model';
import { EnseignantService } from '../service/enseignant.service';

@Component({
  selector: 'app-button-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './button-chat.component.html',
  styleUrl: './button-chat.component.css'
})
export class ButtonChatComponent {

  @ViewChild('modalogin') modalLogin : ElementRef | undefined;

  router=inject(Router);
  snackBar=inject(MatSnackBar);
  authenticationService=inject(AuthenticationService);
  etudiantService=inject(EtudiantService);
  enseignantService=inject(EnseignantService);
  
  roleOfConnected='';


  userLogin = new FormGroup(
    {
      email:new FormControl(''),
      password:new FormControl('')
    }
  )
  
  openModal(){
   if(this.modalLogin){
    this.modalLogin.nativeElement.style.display='block';
   }
  }
  closeModal(){
    if(this.modalLogin){
      this.modalLogin.nativeElement.style.display='none';
    }
  }




  
     authenticate(){
      console.log('hi')
      const email=this.userLogin.get('email')?.value;
      const password=this.userLogin.get('password')?.value;
      console.log("authentification : "+email+" , "+password)
  
      if(!email || !password || email=='' || password==''){
        this.snackBar.open("entrez l'email et le mot de passe","erreur",{duration:3000});
        return;
      }
      const body={email,password};
      this.authenticationService.authUser(body).subscribe(
        (res)=>{
          if(res){
            this.authenticationService.getRolesByEmail(email).subscribe(
              (roles)=>{
                console.log(roles)
                if(roles.includes("ROLE_ADMIN")){
                  this.roleOfConnected='ADMIN';
                  
                }else if(roles.includes("ROLE_STUDENT")){
                  this.roleOfConnected='STUDENT';
                  this.etudiantService.getStudentByEmail(email).subscribe(
                    (etudiant:Etudiant)=>{
                      this.router.navigate(['/chat-home']);
                    }
                  )
                }else if(roles.includes("ROLE_ENSEIGNANT")){
                  this.roleOfConnected='ENSEIGNANT';
                  this.enseignantService.getEnseignantByEmail(email).subscribe(
                    (enseignant:Enseignant)=>{
                      this.router.navigate(['/chat-home']);
                    }
                  )
                }else {
                  console.log("erreur dans l'affectation des roles");
                }
              }
            )
          }
  
          else{
            this.snackBar.open("email ou mot de passe incorrect","erreur",{duration:3000});
          }
  
        }
      )
  
    
      console.log("role of connected one : "+this.roleOfConnected)
  
     }
  
}
