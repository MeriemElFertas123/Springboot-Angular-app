import { Component, OnInit } from "@angular/core";
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { MockRapportService } from "../../service/mock-rapports.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";

// archives.component.ts
@Component({
  selector: 'app-admin-archives',
  standalone:true,
  imports:[SideBarAdminComponent ,FormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './archive.component.html'
})
export class ArchivesComponent implements OnInit {
toggleDropdown() {
throw new Error('Method not implemented.');
}
isDropdownOpen: any;
triggerFileInput() {
throw new Error('Method not implemented.');
}
updateProfilePicture($event: Event) {
throw new Error('Method not implemented.');
}
logout() {
throw new Error('Method not implemented.');
}
downloadArchive(_t71: any) {
throw new Error('Method not implemented.');
}
viewArchive(_t62: any) {
throw new Error('Method not implemented.');
}
  archives: any[] = [];
  annees: number[] = [2023, 2022, 2021];
  selectedAnnee?: number;
  datePipe: any;
  constructor(private rapportService: MockRapportService) {}

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
  ngOnInit(): void {
    this.loadArchives();
  }

  loadArchives(): void {
    this.rapportService.getArchives(this.selectedAnnee)
      .subscribe(data => this.archives = data);
  }

  exportExcel(): void {
    if (!this.selectedAnnee) return;
    
    this.rapportService.exportExcel(this.selectedAnnee)
      .subscribe(blob => {
        saveAs(blob, `archives_${this.selectedAnnee}.xlsx`);
      });
  }
}

function saveAs(blob: Blob, arg1: string) {
  throw new Error("Function not implemented.");
}
