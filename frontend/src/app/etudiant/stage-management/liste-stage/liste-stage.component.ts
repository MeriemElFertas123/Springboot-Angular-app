import { Component } from '@angular/core';
import { Stage } from '../../../model/model';
import { StageServiceService } from '../../../service/stage-service.service';
import { SideBarEtudiantComponent } from "../../side-bar-etudiant/side-bar-etudiant.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-stage',
  imports: [SideBarEtudiantComponent,CommonModule,RouterLink],
  templateUrl: './liste-stage.component.html',
  styleUrl: './liste-stage.component.css'
})
export class ListeStageComponent {
  stages: Stage[] = [];

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
  
  
  

}
