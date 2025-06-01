import { Stage } from './../../../model/model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SideBarEtudiantComponent } from "../../side-bar-etudiant/side-bar-etudiant.component";

import { ActivatedRoute, Router } from '@angular/router';
import { StageServiceService } from '../../../service/stage-service.service';

@Component({
  selector: 'app-update-stage',
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarEtudiantComponent],
  templateUrl: './update-stage.component.html',
  styleUrls: ['./update-stage.component.css']
})
export class UpdateStageComponent implements OnInit {

  stage: Stage | undefined;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stageService: StageServiceService
  ) {}

  ngOnInit(): void {
    const stageId = Number(this.route.snapshot.paramMap.get('id'));
    if (stageId) {
      this.loadStage(stageId);
    }
  }

  loadStage(id: number): void {
    this.stageService.getStageById(id).subscribe({
      next: (data) => {
        this.stage = data;
        
        // Traitement spécifique pour le format de date
        if (this.stage && this.stage.dateDepot) {
          // Convertir la date ISO (2025-09-11T00:00:00.000Z) en format YYYY-MM-DD
          const dateStr = String(this.stage.dateDepot);
          
          if (dateStr.includes('T')) {
            // Extraire simplement la partie avant le T
            this.stage.dateDepot = dateStr.split('T')[0];
          }
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement du stage:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  
 
  downloadRapport(stageId: number): void {
    this.stageService.downloadRapport(stageId).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.stage?.nomFichierRapport || 'rapport-stage.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du rapport:', err);
      }
    });
  }

  updateStage(form?: NgForm): void {
    if (!form) {
      console.warn('Le formulaire est undefined');
      return;
    }
  
    if (form.valid && this.stage) {
      if (this.selectedFile) {
        // Si un fichier a été sélectionné, utiliser une méthode d'envoi de fichier
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        // Ajouter les données du stage au FormData
        formData.append('stage', new Blob([JSON.stringify(this.stage)], {
          type: 'application/json'
        }));

        this.stageService.updateStageWithRapport(formData, this.stage.id!).subscribe({
          next: () => {
            console.log('Stage mis à jour avec succès (avec rapport)');
            this.router.navigate(['/listeStages']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du stage avec rapport:', err);
          }
        });
      } else {
        // Si aucun fichier n'a été sélectionné, mettre à jour uniquement les données du stage
        this.stageService.updateStage(this.stage).subscribe({
          next: () => {
            console.log('Stage mis à jour avec succès');
            this.router.navigate(['/listeStages']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du stage:', err);
          }
        });
      }
    } else {
      console.warn('Formulaire invalide ou stage non défini');
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/listeStages']);
  }
}