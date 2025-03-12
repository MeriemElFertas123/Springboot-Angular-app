import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], // Ajoutez HttpClientModule ici
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  students: Student[] = [];
  isDeleting: boolean = false; // Indicateur de chargement pour la suppression
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Failed to load students', err)
    });
  }

  deleteStudent(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID non défini : impossible de supprimer l\'étudiant.');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      // Afficher un indicateur de chargement (optionnel)
      this.isDeleting = true;
  
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          // Supprimer l'étudiant de la liste locale
          this.students = this.students.filter(student => student.id !== id);
          this.isDeleting = false; // Masquer l'indicateur de chargement
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'étudiant :', err);
          this.isDeleting = false; // Masquer l'indicateur de chargement en cas d'erreur
        }
      });
    }
  }
}