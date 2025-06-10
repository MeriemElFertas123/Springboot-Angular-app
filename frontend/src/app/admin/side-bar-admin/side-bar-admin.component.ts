import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar-admin',
  imports: [RouterLink],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.css'
})
export class SideBarAdminComponent {
  constructor(private router : Router){
    
  }
logout(){
    // afficher une boîte de dialogue de confirmation
    const confirmation=window.confirm("ête-vous sûr de quitter ?")
    if(confirmation){
      // supprimer le contenu du localstorage
      localStorage.clear();
      // redirection vers la page de login
      this.router.navigate(['/main-home']);
    }
  }
}
