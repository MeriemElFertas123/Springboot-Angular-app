import { Component } from '@angular/core';
import { Stage } from '../../../model/model';
import { StageServiceService } from '../../../service/stage-service.service';
import { SideBarEtudiantComponent } from "../../side-bar-etudiant/side-bar-etudiant.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-stage',
  standalone: true, // Ajouté pour correspondre au style du composant AddStageComponent
  imports: [SideBarEtudiantComponent, CommonModule, RouterLink],
  templateUrl: './liste-stage.component.html',
  styleUrl: './liste-stage.component.css'
})
export class ListeStageComponent {
  stages: Stage[] = [];
  isDownloading: boolean = false;

  constructor(private stageService: StageServiceService) {}

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages(): void {
    this.stageService.getAllStage().subscribe({
      next: (data) => {
        this.stages = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stages:', err);
      }
    });
  }

  confirmDelete(id: number): void {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce stage ?");
    if (confirmation) {
      this.deleteStage(id);
    }
  }

  deleteStage(id: number): void {
    this.stageService.deleteStage(id).subscribe({
      next: () => {
        this.stages = this.stages.filter(stage => stage.id !== id);
        alert("Stage supprimé avec succès !");
      },
      error: (err) => {
        console.error("Erreur de suppression :", err);
        alert("Échec de la suppression.");
      }
    });
  }
  
  // Nouvelle méthode pour télécharger le rapport
  downloadRapport(stageId: number): void {
    this.isDownloading = true;
    
    this.stageService.downloadStageReport(stageId).subscribe({
      next: (blob: Blob) => {
        // Trouver le stage correspondant
        const stage = this.stages.find(s => s.id === stageId);
        
        if (stage && stage.nomFichierRapport) {
          // Créer un objet URL pour le blob
          const url = window.URL.createObjectURL(blob);
          
          // Créer un élément a temporaire pour déclencher le téléchargement
          const a = document.createElement('a');
          a.href = url;
          a.download = stage.nomFichierRapport;
          document.body.appendChild(a);
          a.click();
          
          // Nettoyer
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        
        this.isDownloading = false;
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du rapport:', err);
        alert('Impossible de télécharger le rapport.');
        this.isDownloading = false;
      }
    });
  }
}