import { Component } from '@angular/core';
import { Student } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mes-etudiants',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './mes-etudiants.component.html',
  styleUrl: './mes-etudiants.component.css'
})
export class MesEtudiantsComponent {
  mesEtudiants:Student[]=[];
  constructor(private service:ServiceService){
    this.mesEtudiants=service.getStudents();
  }
}
