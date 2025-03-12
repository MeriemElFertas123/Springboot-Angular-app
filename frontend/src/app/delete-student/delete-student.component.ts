import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-student',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  studentId!: number;
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!; // Récupère l'ID de l'étudiant depuis l'URL
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.studentId).subscribe({
      next: (response) => {
        this.message = 'Étudiant supprimé avec succès !';
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/list']); // Redirige vers la liste des étudiants après la suppression
        }, 2000); // Redirection après 2 secondes
      },
      error: (err) => {
        this.message = "Erreur lors de la suppression de l'étudiant : " + err.message;
        this.isSuccess = false;
      }
    });
  }
}