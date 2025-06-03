import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
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
