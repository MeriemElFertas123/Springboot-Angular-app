import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deposer-stage',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './deposer-stage.component.html',
  styleUrl: './deposer-stage.component.css'
})
export class DeposerStageComponent {
  depotForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.depotForm = this.fb.group({
      rapport: [null, Validators.required], // Champ pour le rapport de stage
      attestation: [null, Validators.required], // Champ pour l'attestation de stage
      ficheAppreciation: [null, Validators.required] // Champ pour la fiche d'appréciation
    });
  }

  onSubmit() {
    if (this.depotForm.valid) {
      const rapport = this.depotForm.get('rapport')?.value;
      const attestation = this.depotForm.get('attestation')?.value;
      const ficheAppreciation = this.depotForm.get('ficheAppreciation')?.value;

      console.log('Rapport de stage :', rapport);
      console.log('Attestation de stage :', attestation);
      console.log('Fiche d\'appréciation :', ficheAppreciation);

      // Ici, vous pouvez implémenter la logique pour envoyer les fichiers au serveur
      alert('Fichiers déposés avec succès !');
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.depotForm.get(controlName)?.setValue(file);
    }
  }
}
