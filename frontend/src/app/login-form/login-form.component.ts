import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EtudiantService } from '../service/etudiant.service';
import { Etudiant } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  httpClient=inject(HttpClient);
  authenticationService=inject(AuthenticationService);
  snackBar=inject(MatSnackBar);
  etudiantService=inject(EtudiantService);
  router=inject(Router);

  roleOfConnected='';
  

  // Show/hide password onClick of button using Javascript only
  isPasswordVisible:boolean=false;

  togglePasswordVisibility(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }


  userLogin=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

/*
  authenticate(){
    const email=this.userLogin.get('email')?.value;
    const password=this.userLogin.get('password')?.value;
   if(email==null ||password==null ||email=='' ||password==''){
    this.snackBar.open("entrez l'email et le mot de passe","erreur");
    return;
   }
   const body={email,password}

   this.httpClient.post<boolean>(`${URL}api/auth`,body).subscribe(
     (res:any)=>{
      console.log(res)
       if(res){
         // avoir les roles de l'utilisateur connecté
        //  this.authenticationService.getRolesByEmail(email).subscribe(
        //   (res)=>{
        //     console.log(res);
        //   }
        //  );

         // à partir du role, on peut l'étudiant/professeur/admin et le stocker dans le localStorage

         // diriger l'utilisateur vers son espace selon son rôle
       }
     }
   )
  }*/

   authenticate(){
    const email=this.userLogin.get('email')?.value;
    const password=this.userLogin.get('password')?.value;
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
                    localStorage.setItem("connectedUser",JSON.stringify(etudiant));
                    this.router.navigate(['/espace-etudiant']);
                  }
                )
              }else if(roles.includes("ROLE_TEACHER")){
                this.roleOfConnected='TEACHER';
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
