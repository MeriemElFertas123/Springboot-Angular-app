
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnseignantService } from '../../service/enseignant.service';
import { NgFor, NgIf } from '@angular/common';
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { SideBarProfComponent } from '../side-bar-prof/side-bar-prof.component';



export interface Enseignant {
  id?: number;
  image?: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  telephone: string;
  specialite:string;
  genre:Genre
}
export enum Genre{
    Homme='Homme',
    Femme='Femme'
}





@Component({
  selector: 'app-updateprofile2',
  imports: [NgIf,NgFor, ReactiveFormsModule,SideBarProfComponent, UserProfileMenuComponent],
  templateUrl: './updateprofile2.component.html',
  styleUrl: './updateprofile2.component.css'
})
export class Updateprofile2Component {
profileForm: FormGroup;
  enseignant: Enseignant | null = null;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;


  // pour la modification du mot de passe
  showPasswordSection = false;
  passwordForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private enseignantService: EnseignantService
  ) {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      genre: [''],
      specialite: ['', Validators.required],
      password: [''],
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
     const connectedEnseignant = localStorage.getItem('connectedUser');
    
    if (connectedEnseignant) {
      const idConnectedEnseignant=JSON.parse(connectedEnseignant).id;
      this.enseignantService.getEnseignantById(idConnectedEnseignant).subscribe({
        
        next: (enseignant) => {
          this.enseignant = enseignant;
          this.populateForm(enseignant);
          if (enseignant.image) {
            this.imagePreview = `data:image/jpeg;base64,${enseignant.image}`;
          }
          this.loading = false;
          console.log(enseignant)
        },
        error: (error) => {
          console.error('Erreur lors du chargement du profil:', error);
          this.loading = false;
        }
      });
    }
  }

  populateForm(enseignant: Enseignant): void {
    this.profileForm.patchValue({
      nom: enseignant.nom,
      prenom: enseignant.prenom,
      email: enseignant.email,
      telephone: enseignant.telephone,
      specialite: enseignant.specialite,
      password : enseignant.password,
      genre : enseignant.genre
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Annuler les modifications
      if (this.enseignant) {
        this.populateForm(this.enseignant);
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
    if ( this.enseignant) {
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
      
      formData.append('id', this.enseignant.id!.toString());

      this.enseignantService.updateEnseignant(this.enseignant.id!, formData).subscribe({
        next: (updatedEnseignant) => {
          this.enseignant = updatedEnseignant;
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
    console.log(this.enseignant)
    this.isEditing=false;
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
    
    // this.enseignantService.updateEnseignant(this.enseignant!.id!, passwordData).subscribe({
    //   next: () => {
    //     alert('Mot de passe mis à jour avec succès!');
    //     this.showPasswordSection = false;
    //     this.passwordForm.reset();
    //   },
    //   error: (error) => {
    //     if (error.status === 400) {
    //       alert('Mot de passe actuel incorrect');
    //     } else {
    //       alert('Erreur lors de la mise à jour du mot de passe');
    //     }
    //   }
    // });
  }
}
}
