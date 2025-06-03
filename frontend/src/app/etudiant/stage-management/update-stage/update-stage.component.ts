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
  styleUrls: ['./update-stage.component.css'] // <- attention au `styleUrls` avec un 's'
})
export class UpdateStageComponent implements OnInit {

  stage: Stage | undefined;

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
      },
      error: (err) => {
        console.error('Erreur lors du chargement du stage:', err);
      }
    });
  }

  updateStage(form?: NgForm): void {
    if (!form) {
      console.warn('Le formulaire est undefined');
      return;
    }
  
    if (form.valid && this.stage) {
      this.stageService.updateStage(this.stage).subscribe({
        next: () => {
          console.log('Stage mis à jour avec succès');
          this.router.navigate(['/listeStages']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du stage:', err);
        }
      });
    } else {
      console.warn('Formulaire invalide ou stage non défini');
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
    }
  }
  
}
