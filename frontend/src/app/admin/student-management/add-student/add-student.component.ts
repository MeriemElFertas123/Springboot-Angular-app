import { Component, ViewChild } from '@angular/core';
import { EtudiantService } from '../../../service/etudiant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  @ViewChild('studentForm') studentForm!: NgForm; // Référence du formulaire

  etudiant: any = { // Utilisez le type Etudiant
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    genre: '',
    filiere: '',
    anneeEtude: '',
    image: ''
  };
  imageFile: File | null = null; // Pour stocker le fichier image sélectionné
  message: string = '';
  isSuccess: boolean = false;

  // Gérer la sélection de fichier
  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0] as File;
  }

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Vérifier les champs
    if (!this.etudiant.nom || !this.etudiant.prenom || !this.etudiant.email || !this.etudiant.password || !this.etudiant.telephone || !this.etudiant.genre || !this.etudiant.filiere || !this.etudiant.anneeEtude || !this.imageFile) {
      console.error('Tous les champs doivent être remplis.');
      return;
    }
  
    // Créer un FormData pour envoyer les données
    const formData = new FormData();
    formData.append('nom', this.etudiant.nom);
    formData.append('prenom', this.etudiant.prenom);
    formData.append('telephone', this.etudiant.telephone);
    formData.append('email', this.etudiant.email);
    formData.append('password', this.etudiant.password); // Ensure password is included
    formData.append('genre', this.etudiant.genre);
    formData.append('filiere', this.etudiant.filiere);
    formData.append('anneeEtude', this.etudiant.anneeEtude);
  
    if (this.imageFile) {
      formData.append('image', this.imageFile); // Ajouter l'image au FormData
    }
  
    // Log des données envoyées
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    this.etudiantService.addStudent(formData).subscribe({
      next: (response) => {
        this.message = 'Étudiant ajouté avec succès !';
        this.isSuccess = true;
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/students/list']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);  // Afficher l'erreur dans la console pour plus de détails
        this.message = "Erreur lors de l'ajout de l'étudiant : " + (err.error?.message || err.message);
        this.isSuccess = false;
      }
    });
  }

  resetForm(): void {
    this.studentForm.resetForm(); // Réinitialise complètement le formulaire
  }
}
