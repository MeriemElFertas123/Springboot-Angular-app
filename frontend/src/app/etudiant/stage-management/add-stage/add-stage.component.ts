import { Stage } from './../../../model/model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SideBarEtudiantComponent } from '../../side-bar-etudiant/side-bar-etudiant.component';
import { StageServiceService } from '../../../service/stage-service.service';
import { TypeStage } from '../../../model/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stage',
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarEtudiantComponent, ReactiveFormsModule],
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent {
  stage: Stage = {
    nomEntreprise: '',
    adresseEntreprise: '',
    numEncadrant: '',
    nomEncadrant: '',
    intituleSujet: '',
    descriptionSujet: '',
    typeStage: TypeStage.PFA,
    dateDepot: '',
    domaine: '',
    etat: undefined,
    titre: undefined,
    etudiant: undefined
  };

  useTemplate: boolean = false;
  selectedFiles: any = {};
  depotForm: FormGroup;
  isSubmitting: boolean = false;
  formSubmitted: boolean = false;

  constructor(
    private stageService: StageServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.depotForm = this.fb.group({
      rapport: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted = true;
      this.isSubmitting = true;
      
      // Si l'utilisateur a choisi d'utiliser le modèle, on n'envoie pas de fichier
      if (this.useTemplate || this.depotForm.valid) {
        const formData = new FormData();
        
        // Convertir l'objet stage en JSON et l'ajouter au FormData
        formData.append('stage', new Blob([JSON.stringify(this.stage)], { type: 'application/json' }));
        
        // Ajouter le fichier rapport s'il existe
        if (!this.useTemplate && this.selectedFiles.rapport) {
          formData.append('rapport', this.selectedFiles.rapport);
        }
        
        this.stageService.addStageWithReport(formData).subscribe({
          next: (response: any) => {
            console.log('Stage ajouté avec succès !', response);
            form.reset();
            this.depotForm.reset();
            this.selectedFiles = {};
            this.isSubmitting = false;
            this.router.navigate(['/listeStages']);
          },
          error: (err: any) => {
            console.error('Erreur lors de l\'ajout du stage :', err);
            this.isSubmitting = false;
          }
        });
      }
    }
  }

  toggleTemplateOption(useTemplate: boolean) {
    this.useTemplate = useTemplate;
    if (useTemplate) {
      this.depotForm.get('rapport')?.clearValidators();
    } else {
      this.depotForm.get('rapport')?.setValidators(Validators.required);
    }
    this.depotForm.get('rapport')?.updateValueAndValidity();
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles[field] = file;
      this.depotForm.patchValue({
        [field]: file
      });
    }
  }
}