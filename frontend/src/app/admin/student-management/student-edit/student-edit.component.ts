import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { Student } from '../../../model/model'; // Importer le modèle Student
import { AnneeEtude, FiliereEtude } from '../../../model/enums';
import { EtudiantService } from '../../../service/etudiant.service';


@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit{
  etudiant: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    genre:'',
    filiere:'',
    anneeEtude:''
  };

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
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
    this.etudiantService.getStudentById(id).subscribe({
      next: (student) => {
        this.etudiant = student;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'étudiant :', err);
      }
    });
  }

  // Soumettre le formulaire de modification
  onSubmit(): void {
    if (this.etudiant.id) {
      this.etudiantService.updateStudent(this.etudiant.id, this.etudiant).subscribe({
        next: () => {
          this.router.navigate(['/students/list']); // Rediriger vers la liste après la modification
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'étudiant :', err);
        }
      });
    }
  }
}
