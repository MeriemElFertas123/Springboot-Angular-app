import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../model/model';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-espace-professeur',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './espace-professeur.component.html',
  styleUrl: './espace-professeur.component.css'
})
export class EspaceProfesseurComponent {

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //********************************** 
  listEtudiantsEncadre:Student[]=[];
  constructor(private service:ServiceService){
    this.listEtudiantsEncadre=this.service.getStudents();
  }
}
