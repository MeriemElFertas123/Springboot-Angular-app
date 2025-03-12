import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-espace-etudiant',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './espace-etudiant.component.html',
  styleUrl: './espace-etudiant.component.css'
})
export class EspaceEtudiantComponent {
  isStudentMenuOpen = false;
  isDropdown = false;

  toggleStudentMenu() {
    this.isStudentMenuOpen = !this.isStudentMenuOpen;
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }
}
