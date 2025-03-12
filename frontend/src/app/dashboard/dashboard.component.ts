import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Données statiques (à remplacer par des appels API)
  totalReports: number = 120;
  validatedReports: number = 80;
  pendingReports: number = 30;
  rejectedReports: number = 10;
  activeStudents: number = 150;
  activeTeachers: number = 20;
  deadlineDate: Date = new Date('2023-12-31');
  isDeadlineClose: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // Ici, vous pouvez appeler votre service pour récupérer les données
    // Exemple : this.loadDashboardData();
  }

  // Exemple de méthode pour charger les données
  loadDashboardData(): void {
    // Appeler votre service Spring Boot pour récupérer les données
    // this.dashboardService.getDashboardData().subscribe(data => {
    //   this.totalReports = data.totalReports;
    //   this.validatedReports = data.validatedReports;
    //   ...
    // });
  }
}