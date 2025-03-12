import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  standalone:true,
  imports:[FormsModule],
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student: Student = {
    username: '',
    phone: '',
    email: '',
    gender: '',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID depuis l'URL
    if (id) {
      this.loadStudent(+id); // Charger les données de l'étudiant
    }
  }

  // Charger les données de l'étudiant
  loadStudent(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'étudiant :', err);
      }
    });
  }

  // Soumettre le formulaire de modification
  onSubmit(): void {
    if (this.student.id) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe({
        next: () => {
          this.router.navigate(['/list']); // Rediriger vers la liste après la modification
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'étudiant :', err);
        }
      });
    }
  }
}