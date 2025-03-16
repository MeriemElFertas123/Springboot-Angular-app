import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../../service/etudiant.service';
import { RouterLink ,Router} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone:true,
  imports: [RouterLink,NgIf,NgFor],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  students: any[] = [];
  isDeleting: boolean = false; // Indicateur de chargement pour la suppression
  constructor(private etudiantService: EtudiantService,private router:Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.etudiantService.getStudents().subscribe({
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
  
      this.etudiantService.deleteStudent(id).subscribe({
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
  // Convertir l'image BLOB en URL utilisable dans une balise <img>
  getImageUrl(image: any): string {
    if (typeof image === 'string') {
      // Si l'image est déjà en base64
      return image;
    } else if (image instanceof Blob) {
      // Si l'image est un Blob
      return URL.createObjectURL(image);
    } else if (image instanceof ArrayBuffer || Array.isArray(image)) {
      // Si l'image est un tableau de bytes (BLOB)
      const blob = new Blob([new Uint8Array(image)], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } else {
      // Si l'image est dans un format non pris en charge
      return ''; // Retourner une chaîne vide ou une image par défaut
    }
  }
}
