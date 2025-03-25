import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-student-delete',
  standalone:true,
  imports: [NgIf],
  templateUrl: './student-delete.component.html',
  styleUrl: './student-delete.component.css'
})
export class StudentDeleteComponent {
  studentId: string | null = null; // ID de l'étudiant à supprimer

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'étudiant depuis l'URL
    this.studentId = this.route.snapshot.paramMap.get('id');
  }
/*
  // Méthode pour supprimer l'étudiant
  deleteStudent(): void {
    if (this.studentId) {
      this.studentService.deleteStudent(this.studentId).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.router.navigate(['/students']); // Rediriger vers la liste des étudiants
        },
        error: (err) => console.error('Failed to delete student', err),
      });
    } else {
      console.error('Student ID is missing');
    }
  }

  // Méthode pour annuler et revenir à la liste des étudiants
  cancel(): void {
    this.router.navigate(['/students']);
  }*/
}
