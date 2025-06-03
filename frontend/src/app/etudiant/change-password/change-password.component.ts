import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule], //**FormsModule** Il permet d'utiliser des directives comme ngModel//**CommonModule **Il fournit des directives communes comme ngIf, ngFor, ngClass */
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      // Logique pour changer le mot de passe
      console.log('Mot de passe changé avec succès');
    } else {
      alert('Les mots de passe ne correspondent pas');
    }}
}
