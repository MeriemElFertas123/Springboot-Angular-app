import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";

@Component({
  selector: 'app-archive',
  standalone:true,
  imports: [SideBarAdminComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

}
