import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { Etudiant } from '../../../model/model';
import { AnneeEtude, Filiere, Genre } from '../../../model/enums';





@Component({
  selector: 'app-student-create',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {
  student: Etudiant = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    filiere: Filiere.Industriel,
    image: undefined,
    password: '',
    telephone: '',
    genre: Genre.Femme,
    anneeEtude: AnneeEtude.Premiere
  }; 

      imageFile: File | null = null; // Pour stocker le fichier image sélectionné
      message: string = '';
      isSuccess: boolean = false;
    
  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}
  /*

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    this.studentService.createStudent(this.student).subscribe({
      next: () => {
        console.log('Student created successfully');
        this.router.navigate(['/studentCreate']); // Rediriger vers la liste des étudiants
      },
      error: (err) => console.error('Failed to create student', err),
    });
  }

  // Méthode pour annuler et revenir à la liste des étudiants
  cancel(): void {
    this.router.navigate(['/studentCreate']);
  }*/
}
