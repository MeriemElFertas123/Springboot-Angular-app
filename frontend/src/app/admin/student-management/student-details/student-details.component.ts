import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { Etudiant } from '../../../model/model'; // Importer le modèle Student
import { AnneeEtude, Filiere, Genre } from '../../../model/enums';
import { EtudiantService } from '../../../service/etudiant.service';


@Component({
  selector: 'app-student-details',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  student: Etudiant = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    filiere: Filiere.Informatique,
    anneeEtude: AnneeEtude.Deuxieme,
    image: undefined,
    password: '',
    telephone: '',
    genre: Genre.Homme
  }; // Initialiser avec des valeurs par défaut

  constructor(
    private etudiantService: EtudiantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idEtudiant=Number.parseInt(id);
      this.etudiantService.getStudentById(idEtudiant).subscribe({
        next: (data) => (this.student = data),
        error: (err) => console.error('Failed to load student', err),
      });
    }
  }
}
