import { Component, ViewChild } from '@angular/core';
import { SideBarAdminComponent } from "../../side-bar-admin/side-bar-admin.component";
import { FormsModule, NgForm } from '@angular/forms';
import { EnseignantService } from '../../../service/enseignant.service';
import { Router } from '@angular/router';
import { Enseignant } from '../../../model/model';
import { Genre } from '../../../model/enums';

@Component({
  selector: 'app-enseignant-create',
  imports: [SideBarAdminComponent,FormsModule],
  templateUrl: './enseignant-create.component.html',
  styleUrl: './enseignant-create.component.css'
})
export class EnseignantCreateComponent {
  @ViewChild('enseignantForm') enseignantForm!: NgForm; // Référence du formulaire
   
    enseignant: any = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      password: '',
      genre: Genre.Femme,
      specialite: '',
      image: undefined,
      
    };
    imageFile: File | null = null; // Pour stocker le fichier image sélectionné
    message: string = '';
    isSuccess: boolean = false;
  
    // Gérer la sélection de fichier
    onFileSelected(event: any): void {
      this.imageFile = event.target.files[0] as File;
    }
  
    constructor(
      private enseignantService: EnseignantService,
      private router: Router
    ) {}
  
    onSubmit(): void {
      // Vérifier les champs
      if (!this.enseignant.nom || !this.enseignant.prenom || !this.enseignant.email ||  !this.enseignant.telephone || !this.enseignant.password || !this.enseignant.genre  || !this.enseignant.specialite || !this.imageFile) {
        console.error('Tous les champs doivent être remplis.');
        return;
      }

    
      // Créer un FormData pour envoyer les données
      const formData = new FormData();
      formData.append('nom', this.enseignant.nom);
      formData.append('prenom', this.enseignant.prenom);
  
      formData.append('email', this.enseignant.email);
      formData.append('telephone', this.enseignant.telephone);
      formData.append('password', this.enseignant.password); // Ensure password is included
      formData.append('genre', this.enseignant.genre);
      formData.append('specialite', this.enseignant.specialite);
    
      if (this.imageFile) {
        formData.append('image', this.imageFile); // Ajouter l'image au FormData
      }
    
      // Log des données envoyées
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      this.enseignantService.addEnseignant(formData).subscribe({
        next: (response) => {
          this.message = 'Enseignant ajouté avec succès !';
          this.isSuccess = true;
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/enseignants/list']);
          }, 2000);
        },
        error: (err) => {
          console.error(err);  // Afficher l'erreur dans la console pour plus de détails
          this.message = "Erreur lors de l'ajout de l'enseignant : " + (err.error?.message || err.message);
          this.isSuccess = false;
        }
      });
    }
  
    resetForm(): void {
      this.enseignantForm.resetForm(); // Réinitialise complètement le formulaire
    }
}
