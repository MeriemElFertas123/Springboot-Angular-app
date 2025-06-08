
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantService } from '../../service/etudiant.service';
import { NgIf } from '@angular/common';
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { SideBarProfComponent } from "../side-bar-prof/side-bar-prof.component";





export interface Etudiant {
  id?: number;
  image?: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  telephone: string;
  genre: Genre;
  filiere: Filiere;
  anneeEtude: AnneeEtude;
}

export enum Genre {
  HOMME = 'HOMME',
  FEMME = 'FEMME'
}

export enum Filiere {
  INFORMATIQUE = 'INFORMATIQUE',
  MATHEMATIQUES = 'MATHEMATIQUES',
  PHYSIQUE = 'PHYSIQUE',
  CHIMIE = 'CHIMIE',
  BIOLOGIE = 'BIOLOGIE'
}

export enum AnneeEtude {
  PREMIERE_ANNEE = 'PREMIERE_ANNEE',
  DEUXIEME_ANNEE = 'DEUXIEME_ANNEE',
  TROISIEME_ANNEE = 'TROISIEME_ANNEE',
  QUATRIEME_ANNEE = 'QUATRIEME_ANNEE',
  CINQUIEME_ANNEE = 'CINQUIEME_ANNEE'
}



@Component({
  selector: 'app-updateprofile2',
  imports: [NgIf, UserProfileMenuComponent, SideBarProfComponent,ReactiveFormsModule],
  templateUrl: './updateprofile2.component.html',
  styleUrl: './updateprofile2.component.css'
})
export class Updateprofile2Component {
profileForm: FormGroup;
  etudiant: Etudiant | null = null;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  
  // Énumérations pour les templates
  genres = Object.values(Genre);
  filieres = Object.values(Filiere);
  anneesEtude = Object.values(AnneeEtude);

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService
  ) {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      genre: ['', Validators.required],
      filiere: ['', Validators.required],
      anneeEtude: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    // this.loading = true;
    // // Supposons que l'ID de l'étudiant connecté est stocké dans le localStorage
    // const etudiantId = localStorage.getItem('etudiantId');
    
    // if (etudiantId) {
    //   this.etudiantService.getEtudiant(+etudiantId).subscribe({
    //     next: (etudiant) => {
    //       this.etudiant = etudiant;
    //       this.populateForm(etudiant);
    //       if (etudiant.image) {
    //         this.imagePreview = `data:image/jpeg;base64,${etudiant.image}`;
    //       }
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors du chargement du profil:', error);
    //       this.loading = false;
    //     }
    //   });
    // }
  }

  populateForm(etudiant: Etudiant): void {
    this.profileForm.patchValue({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      telephone: etudiant.telephone,
      genre: etudiant.genre,
      filiere: etudiant.filiere,
      anneeEtude: etudiant.anneeEtude
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Annuler les modifications
      if (this.etudiant) {
        this.populateForm(this.etudiant);
      }
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.etudiant) {
      this.loading = true;
      
      const formData = new FormData();
      const formValues = this.profileForm.value;
      
      // Ajouter tous les champs du formulaire
      Object.keys(formValues).forEach(key => {
        formData.append(key, formValues[key]);
      });
      
      // Ajouter l'image si elle a été sélectionnée
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      
      formData.append('id', this.etudiant.id!.toString());

      // this.etudiantService.updateEtudiant(this.etudiant.id!, formData).subscribe({
      //   next: (updatedEtudiant) => {
      //     this.etudiant = updatedEtudiant;
      //     this.isEditing = false;
      //     this.selectedFile = null;
      //     this.loading = false;
      //     alert('Profil mis à jour avec succès!');
      //   },
      //   error: (error) => {
      //     console.error('Erreur lors de la mise à jour:', error);
      //     this.loading = false;
      //     alert('Erreur lors de la mise à jour du profil');
      //   }
      // });
    }
  }

  // Méthodes utilitaires pour formater les énumérations
  formatGenre(genre: string): string {
    return genre.charAt(0) + genre.slice(1).toLowerCase();
  }

  formatFiliere(filiere: string): string {
    return filiere.charAt(0) + filiere.slice(1).toLowerCase().replace('_', ' ');
  }

  formatAnneeEtude(annee: string): string {
    const mapping: { [key: string]: string } = {
      'PREMIERE_ANNEE': '1ère année',
      'DEUXIEME_ANNEE': '2ème année',
      'TROISIEME_ANNEE': '3ème année',
      'QUATRIEME_ANNEE': '4ème année',
      'CINQUIEME_ANNEE': '5ème année'
    };
    return mapping[annee] || annee;
  }
}
