// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component'; // Exemple d'importation
import { NgModule } from '@angular/core';
import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RapportsComponent } from './rapports/rapports.component';
import { EnseignantManagementComponent } from './enseignant-management/enseignant-management.component';
import { ArchiveComponent } from './archive/archive.component';
import { ChatComponent } from './chat/chat.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirection par défaut
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListStudentsComponent },
  { path: 'delete-student/:id', component: DeleteStudentComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent }, 
  { path: 'rapports', component: RapportsComponent },
  { path: 'enseignant-management', component: EnseignantManagementComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'parametrage', component: ParametrageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }