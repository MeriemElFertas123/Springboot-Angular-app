import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";

@Component({
  selector: 'app-rapports',
  standalone:true,
  imports: [SideBarAdminComponent],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.css'
})
export class RapportsComponent {

}
