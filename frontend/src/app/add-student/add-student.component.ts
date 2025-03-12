import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student'; // Utilisez le type Student
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student: Student = { // Utilisez le type Student
    username: '',
    phone: '',
    email: '',
    gender: '',
    imageUrl: ''
  };

  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Données envoyées :', this.student);

    if (!this.student.username || !this.student.phone || !this.student.email || !this.student.gender) {
      this.message = 'Veuillez remplir tous les champs obligatoires.';
      this.isSuccess = false;
      return;
    }

    this.studentService.addStudent(this.student).subscribe({
      next: (response) => {
        this.message = 'Étudiant ajouté avec succès !';
        this.isSuccess = true;
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 2000);
      },
      error: (err) => {
        this.message = "Erreur lors de l'ajout de l'étudiant : " + (err.error?.message || err.message);
        this.isSuccess = false;
      }
    });
  }

  resetForm(): void {
    this.student = {
      username: '',
      phone: '',
      email: '',
      gender: '',
      imageUrl: ''
    };
  }
}