import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SideBarEtudiantComponent } from "../side-bar-etudiant/side-bar-etudiant.component";

@Component({
  selector: 'app-ajouter-stage',
  standalone:true,
  imports: [FormsModule, CommonModule, SideBarEtudiantComponent],
  templateUrl: './ajouter-stage.component.html',
  styleUrl: './ajouter-stage.component.css'
})
export class AjouterStageComponent {

}
