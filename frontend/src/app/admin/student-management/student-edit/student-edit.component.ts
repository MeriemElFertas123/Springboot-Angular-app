import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EtudiantService } from '../../../service/etudiant.service';
import { AnneeEtude, Filiere } from '../../../model/enums';
import { SideBarAdminComponent } from "../../side-bar-admin/side-bar-admin.component";

@Component({
  selector: 'app-student-edit',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink, SideBarAdminComponent],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  etudiant: any = { 
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    genre: '',
    filiere: '',
    anneeEtude: '',
    image: null  
  };

  hidePassword=true;


  imageFile: File | null = null; // Pour stocker le fichier image sélectionné

  // Gérer la sélection de fichier
  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0] as File;
  }

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
      const formData: FormData = new FormData();
      formData.append('nom', this.etudiant.nom);
      formData.append('prenom', this.etudiant.prenom);
      formData.append('email', this.etudiant.email);
      formData.append('password', this.etudiant.password);
      formData.append('telephone', this.etudiant.telephone);
      formData.append('genre', this.etudiant.genre);
      formData.append('filiere', this.etudiant.filiere);
      formData.append('anneeEtude', this.etudiant.anneeEtude);
      
  
      if(this.imageFile){
        formData.append('image',this.imageFile)
      }
      else if (this.etudiant.image) {
        formData.append('image', this.etudiant.image);
      }
      this.etudiantService.updateStudent(this.etudiant.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/students/list']); // Rediriger vers la liste après la modification
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'étudiant :', err);
        }
      });
    }
}

 

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }
}
