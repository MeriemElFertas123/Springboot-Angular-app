import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { EspaceInterneComponent } from "../espace-interne/espace-interne.component";
import { AproposComponent } from "../apropos/apropos.component";
import { NgClass, NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-accueil',
  standalone:true,
  imports: [EspaceInterneComponent, AproposComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
 
 

}
