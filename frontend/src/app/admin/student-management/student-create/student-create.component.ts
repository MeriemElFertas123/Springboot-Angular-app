import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { Student } from '../../../model/model';
import { AnneeEtude, FiliereEtude } from '../../../model/enums';





@Component({
  selector: 'app-student-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {
  student: Student = { 
      id:0,
      nom:'',
      prenom:'',
      email:'',
      filiere:FiliereEtude.INFO,
      anneeEtude:AnneeEtude.A,
      imageUrl:'' }; // Objet pour stocker les données du formulaire

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

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
  }
}
