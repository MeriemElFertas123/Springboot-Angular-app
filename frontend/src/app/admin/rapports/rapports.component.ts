import { Component, NgModule, OnInit } from "@angular/core";
import { MockRapportService } from "../../service/mock-rapports.service";
import { RouterLink, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { CommonModule } from "@angular/common";

// rapports.component.ts
@Component({
  selector: 'app-admin-rapports',
  standalone:true,
  imports: [SideBarAdminComponent ,FormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './rapports.component.html'
})
export class RapportsComponent implements OnInit {
viewReport(_t62: any) {
throw new Error('Method not implemented.');
}
downloadReport(_t62: any) {
throw new Error('Method not implemented.');
}
  rapports: any[] = [];
  etats = ['EN_COURS', 'VALIDE', 'REFUSE'];
  selectedEtat?: string;

  constructor(private rapportService: MockRapportService) {}

  ngOnInit(): void {
    this.loadRapports();
  }
  
  loadRapports(): void {
    this.rapportService.getRapportsFiltres(this.selectedEtat)
      .subscribe(data => this.rapports = data);
  }
  
}