import { Component, ViewChild } from '@angular/core';
import { EtudiantService } from '../../../service/etudiant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  @ViewChild('studentForm') studentForm!: NgForm; // Référence du formulaire

  etudiant: any = { // Utilisez le type Etudiant
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    genre:'',
    filiere:'',
    anneeEtude:''
  };

  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  onSubmit(): void {
/*
    if (!this.student.username || !this.student.phone || !this.student.email || !this.student.gender) {
      this.message = 'Veuillez remplir tous les champs obligatoires.';
      this.isSuccess = false;
      return;
    }*/

    this.etudiantService.addStudent(this.etudiant).subscribe({
      next: (response) => {
        this.message = 'Étudiant ajouté avec succès !';
        this.isSuccess = true;
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/students/list']);
        }, 2000);
      },
      error: (err) => {
        this.message = "Erreur lors de l'ajout de l'étudiant : " + (err.error?.message || err.message);
        this.isSuccess = false;
      }
    });
  }

  resetForm(): void {
    this.studentForm.resetForm(); // Réinitialise complètement le formulaire
  }
}
