import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";

@Component({
  selector: 'app-admin-home',
  standalone:true,
  imports: [SideBarAdminComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  isStudentMenuOpen = false;
  isDropdownOpen = false;

  toggleStudentMenu() {
    this.isStudentMenuOpen = !this.isStudentMenuOpen;
  }

  toggleDropdownMenu() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
