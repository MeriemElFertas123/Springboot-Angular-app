import { Component } from '@angular/core';
import { EspaceInterneComponent } from "../espace-interne/espace-interne.component";
import { ButtonChatComponent } from "../button-chat/button-chat.component";

@Component({
  selector: 'app-accueil',
  standalone:true,
  imports: [EspaceInterneComponent, ButtonChatComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
