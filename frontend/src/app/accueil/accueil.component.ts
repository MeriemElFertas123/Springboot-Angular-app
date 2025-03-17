import { Component } from '@angular/core';
import { EspaceInterneComponent } from "../espace-interne/espace-interne.component";

@Component({
  selector: 'app-accueil',
  standalone:true,
  imports: [EspaceInterneComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
