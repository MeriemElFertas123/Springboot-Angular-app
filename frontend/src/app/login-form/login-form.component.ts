import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  httpClient=inject(HttpClient);
  URL='http://localhost:8080/';

  // Show/hide password onClick of button using Javascript only
  isPasswordVisible:boolean=false;

  togglePasswordVisibility(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }


  userLogin=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })


  authenticate(){
    const email=this.userLogin.get('email')?.value;
    const password=this.userLogin.get('password')?.value;
    const body={email,password}
    this.httpClient.post(`${URL}api/auth`,body).subscribe(
      (res:any)=>{
        if(res){
          // avoir les roles de l'utilisateur connecté
          getRolesByEmail();

          // à partir du role, on peut l'étudiant/professeur/admin et le stocker dans le localStorage

          // diriger l'utilisateur vers son espace selon son rôle
        }
      }
    )
  }

}
