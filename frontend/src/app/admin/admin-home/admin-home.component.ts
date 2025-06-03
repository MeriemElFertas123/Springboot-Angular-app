import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";

@Component({
  selector: 'app-admin-home',
  standalone:true,
  imports: [SideBarAdminComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  isStudentMenuOpen = false;
  isDropdownOpen = false;

  toggleStudentMenu() {
    this.isStudentMenuOpen = !this.isStudentMenuOpen;
  }

  toggleDropdownMenu() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor(private router:Router)
    {
  
    }
    navigateToAjouterStage() {
      this.router.navigate(['/ajouterStage']);
    }
    
  
  
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
    // Fermer le menu si on clique à l'extérieur
    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event) {
      const userProfile = document.querySelector('.user-profile');
      if (userProfile && !userProfile.contains(event.target as Node)) {
        this.isDropdownOpen = false;
      }
    }
    logout() {
      console.log("Déconnexion en cours...");
      // Implémente ici la logique de déconnexion, par ex. suppression du token, redirection
      this.router.navigate(['/login']);
    }
    profilePicture: string = '/img/profil2.png'; // Image par défaut
  
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  updateProfilePicture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Met à jour la photo de profil
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
