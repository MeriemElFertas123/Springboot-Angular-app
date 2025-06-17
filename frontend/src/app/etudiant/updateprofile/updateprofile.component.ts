
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantService } from '../../service/etudiant.service';
import { NgIf } from '@angular/common';
import { SideBarEtudiantComponent } from "../side-bar-etudiant/side-bar-etudiant.component";
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";



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
  selector: 'app-updateprofile',
  imports: [NgIf, ReactiveFormsModule, SideBarEtudiantComponent, UserProfileMenuComponent],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  profileForm: FormGroup;
  etudiant: Etudiant | null = null;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;


  // pour la modification du mot de passe
  showPasswordSection = false;
  passwordForm!: FormGroup;


  
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
      anneeEtude: ['', Validators.required],
      password: ['', Validators.required],
    });


    // pour le changement du mot de passe
    this.passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
     this.loading = true;
     // l'ID de l'étudiant connecté est stocké dans le localStorage
     const connectedEtudiant = localStorage.getItem('connectedUser');
    
    if (connectedEtudiant) {
      const idConnectedEtudiant=JSON.parse(connectedEtudiant).id;
      this.etudiantService.getStudentById(idConnectedEtudiant).subscribe({
        
        next: (etudiant) => {
          this.etudiant = etudiant;
          this.populateForm(etudiant);
          if (etudiant.image) {
            this.imagePreview = `data:image/jpeg;base64,${etudiant.image}`;
          }
          this.loading = false;
          console.log(etudiant)
        },
        error: (error) => {
          console.error('Erreur lors du chargement du profil:', error);
          this.loading = false;
        }
      });
    }
  }

  populateForm(etudiant: Etudiant): void {
    this.profileForm.patchValue({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      telephone: etudiant.telephone,
      genre: etudiant.genre,
      filiere: etudiant.filiere,
      anneeEtude: etudiant.anneeEtude,
      password : etudiant.password
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

      this.etudiantService.updateStudent(this.etudiant.id!, formData).subscribe({
        next: (updatedEtudiant) => {
          this.etudiant = updatedEtudiant;
          this.isEditing = false;
          this.selectedFile = null;
          this.loading = false;
          alert('Profil mis à jour avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.loading = false;
          alert('Erreur lors de la mise à jour du profil');
        }
      });
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





  // les méthodes suivantes pour la modification du mot de passe
  passwordMatchValidator(form: AbstractControl) {
  const newPassword = form.get('newPassword');
  const confirmPassword = form.get('confirmPassword');
  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

togglePasswordSection() {
  this.showPasswordSection = !this.showPasswordSection;
  if (!this.showPasswordSection) {
    this.passwordForm.reset();
  }
}

onPasswordSubmit() {
  if (this.passwordForm.valid) {
    const passwordData = {
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword
    };
    
    this.etudiantService.updatePassword(this.etudiant!.id!, passwordData).subscribe({
      next: () => {
        alert('Mot de passe mis à jour avec succès!');
        this.showPasswordSection = false;
        this.passwordForm.reset();
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Mot de passe actuel incorrect');
        } else {
          alert('Erreur lors de la mise à jour du mot de passe');
        }
      }
    });
  }
}
}
