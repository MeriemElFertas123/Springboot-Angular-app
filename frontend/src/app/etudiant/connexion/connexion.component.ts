import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  username : string ="";
  password : string = "";

  onSubmit() {
    console.log('Nom d\'utilisateur:', this.username);
    console.log('Mot de passe:', this.password);
  }
}
