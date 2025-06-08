import { Component, ViewChild } from '@angular/core';
import { EtudiantService } from '../../../service/etudiant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SideBarAdminComponent } from "../../side-bar-admin/side-bar-admin.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, SideBarAdminComponent, NgClass, NgFor, NgIf],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  @ViewChild('studentForm') studentForm!: NgForm;

  etudiant: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    genre: '',
    filiere: '',
    anneeEtude: '',
    image: ''
  };

  imageFile: File | null = null;
  message: string = '';
  isSuccess: boolean = false;
  
  // Properties for Excel import functionality
  importedStudents: any[] = [];
  showImportPreview: boolean = false;
  isImporting: boolean = false;

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  // Handle file selection (both image and Excel files)
  onFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    
    if (!file) return;

    // Check if it's an Excel file
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      this.handleExcelImport(file);
    } else {
      // It's an image file
      this.imageFile = file;
    }
  }

  // Handle Excel file import
  handleExcelImport(file: File): void {
    this.isImporting = true;
    this.importedStudents = [];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Skip header row and process data
        const rows = jsonData.slice(1) as any[][];
        
        this.importedStudents = rows.map((row: any[]) => ({
          nom: row[0] || '',
          prenom: row[1] || '',
          email: row[2] || '',
          genre: row[3] || '',
          filiere: row[4] || '',
          anneeEtude: row[5] || '',
          telephone: row[6] || '',
          password: row[7] || 'defaultPassword123' // Default password if not provided
        })).filter(student => student.nom && student.prenom); // Filter out empty rows

        this.showImportPreview = true;
        this.isImporting = false;
        
        if (this.importedStudents.length === 0) {
          this.message = 'Aucun étudiant valide trouvé dans le fichier Excel.';
          this.isSuccess = false;
        }
      } catch (error) {
        console.error('Error reading Excel file:', error);
        this.message = 'Erreur lors de la lecture du fichier Excel.';
        this.isSuccess = false;
        this.isImporting = false;
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // Download Excel template
  downloadTemplate(): void {
    // Create template data
    const templateData = [
      ['Nom', 'Prénom', 'Email', 'Genre', 'Filière', 'Année Étude', 'Téléphone', 'Mot de passe'],
      ['Dupont', 'Jean', 'jean.dupont@example.com', 'HOMME', 'INFO', 'PREMIEREANNEE', '0123456789', 'password123'],
      ['Martin', 'Marie', 'marie.martin@example.com', 'FEMME', 'INDUS', 'DEUXIEMEANNEE', '0987654321', 'password456']
    ];

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(templateData);

    // Add some styling (column widths)
    ws['!cols'] = [
      { width: 15 }, // Nom
      { width: 15 }, // Prénom
      { width: 25 }, // Email
      { width: 10 }, // Genre
      { width: 15 }, // Filière
      { width: 15 }, // Année Étude
      { width: 15 }, // Téléphone
      { width: 15 }  // Mot de passe
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Template_Etudiants');

    // Download the file
    XLSX.writeFile(wb, 'template_etudiants.xlsx');
  }

  // Select a student from import preview to fill the form
  selectStudentFromImport(student: any): void {
    this.etudiant = { ...student };
    this.closeImportPreview();
    this.message = 'Données de l\'étudiant chargées depuis l\'import. Veuillez ajouter une photo et vérifier les informations.';
    this.isSuccess = true;
  }

  // Close import preview
  closeImportPreview(): void {
    this.showImportPreview = false;
    this.importedStudents = [];
  }

  onSubmit(): void {
    // Verify all required fields
    if (!this.etudiant.nom || !this.etudiant.prenom || !this.etudiant.email || 
        !this.etudiant.password || !this.etudiant.telephone || !this.etudiant.genre || 
        !this.etudiant.filiere || !this.etudiant.anneeEtude || !this.imageFile) {
      this.message = 'Tous les champs doivent être remplis, y compris la photo.';
      this.isSuccess = false;
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('nom', this.etudiant.nom);
    formData.append('prenom', this.etudiant.prenom);
    formData.append('telephone', this.etudiant.telephone);
    formData.append('email', this.etudiant.email);
    formData.append('password', this.etudiant.password);
    formData.append('genre', this.etudiant.genre);
    formData.append('filiere', this.etudiant.filiere);
    formData.append('anneeEtude', this.etudiant.anneeEtude);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    // Log the data being sent
    console.log('Submitting student data:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    this.etudiantService.addStudent(formData).subscribe({
      next: (response) => {
        this.message = 'Étudiant ajouté avec succès !';
        this.isSuccess = true;
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/students/list']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error adding student:', err);
        this.message = "Erreur lors de l'ajout de l'étudiant : " + (err.error?.message || err.message);
        this.isSuccess = false;
      }
    });
  }

  resetForm(): void {
    this.etudiant = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      telephone: '',
      genre: '',
      filiere: '',
      anneeEtude: '',
      image: ''
    };
    this.imageFile = null;
    this.message = '';
    this.closeImportPreview();
    
    if (this.studentForm) {
      this.studentForm.resetForm();
    }
  }
}