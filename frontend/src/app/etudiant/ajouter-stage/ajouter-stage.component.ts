import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajouter-stage',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './ajouter-stage.component.html',
  styleUrl: './ajouter-stage.component.css'
})
export class AjouterStageComponent {

}
