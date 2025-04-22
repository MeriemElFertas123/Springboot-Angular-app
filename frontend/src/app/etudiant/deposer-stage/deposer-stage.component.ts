import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarEtudiantComponent } from '../side-bar-etudiant/side-bar-etudiant.component';

@Component({
  selector: 'app-deposer-stage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SideBarEtudiantComponent],
  templateUrl: './deposer-stage.component.html',
  styleUrls: ['./deposer-stage.component.css']
})
export class DeposerStageComponent {
  depotForm: FormGroup;
  selectedFiles: any = {
    rapport: null,
    attestation: null,
    ficheAppreciation: null
  };

  useTemplate: boolean = false;

  constructor(private fb: FormBuilder) {
    this.depotForm = this.fb.group({
      rapport: [null, Validators.required],
      attestation: [null, Validators.required],
      ficheAppreciation: [null, Validators.required]
    });
  }

  // Gérer le choix entre utiliser le modèle Word ou importer un rapport PDF
  toggleTemplateOption(useTemplate: boolean) {
    this.useTemplate = useTemplate;

    if (useTemplate) {
      this.depotForm.get('rapport')?.clearValidators();
      this.depotForm.get('rapport')?.updateValueAndValidity();
      this.selectedFiles.rapport = null;
    } else {
      this.depotForm.get('rapport')?.setValidators(Validators.required);
      this.depotForm.get('rapport')?.updateValueAndValidity();
    }
  }

  // Gérer l'importation des fichiers
  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFiles[type] = file;
      this.depotForm.get(type)?.setValue(file);
    } else {
      this.selectedFiles[type] = null;
      this.depotForm.get(type)?.setValue(null);
    }
  }

  // Télécharger le modèle Word
  downloadWordTemplate() {
    const link = document.createElement('a');
    link.href = 'assets/templates/modele-rapport.docx'; // Assure-toi que le modèle est bien dans ce chemin
    link.download = 'modele-rapport.docx';
    link.click();
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.depotForm.valid) {
      // Gérer l'envoi des fichiers à un backend ou une API
      console.log('Formulaire validé avec succès', this.depotForm.value);
    }
  }
}
