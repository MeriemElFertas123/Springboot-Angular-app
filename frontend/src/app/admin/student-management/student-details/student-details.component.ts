import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { Student } from '../../../model/model'; // Importer le modèle Student
import { AnneeEtude, FiliereEtude } from '../../../model/enums';


@Component({
  selector: 'app-student-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  student: Student = { 
       id:0,
        nom:'',
        prenom:'',
        email:'',
        filiere:FiliereEtude.INFO,
        anneeEtude:AnneeEtude.A,
        imageUrl:''
   }; // Initialiser avec des valeurs par défaut

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudent(id).subscribe({
        next: (data) => (this.student = data),
        error: (err) => console.error('Failed to load student', err),
      });
    }
  }
}
