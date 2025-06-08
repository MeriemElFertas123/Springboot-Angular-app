import { Routes } from '@angular/router';
import { DetailsEtudiantComponent } from './professeur/details-etudiant/details-etudiant.component';
import { RapportsStageComponent } from './professeur/rapports-stage/rapports-stage.component';
import { EspaceProfesseurComponent } from './professeur/espace-professeur/espace-professeur.component';
import { MesEtudiantsComponent } from './professeur/mes-etudiants/mes-etudiants.component';
import { EspaceEtudiantComponent } from './etudiant/espace-etudiant/espace-etudiant.component';

import { DeposerStageComponent } from './etudiant/deposer-stage/deposer-stage.component';
import { ChangePasswordComponent } from './etudiant/change-password/change-password.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ArchivesComponent } from './admin/archive/archive.component';
import { ChatComponent } from './admin/chat/chat.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ParametrageComponent } from './admin/parametrage/parametrage.component';
import { RapportsComponent } from './admin/rapports/rapports.component';
import { StudentEditComponent } from './admin/student-management/student-edit/student-edit.component';
import { StudentDetailsComponent } from './admin/student-management/student-details/student-details.component';
import { StudentDeleteComponent } from './admin/student-management/student-delete/student-delete.component';
import { StudentListComponent } from './admin/student-management/student-list/student-list.component';
import { AddStudentComponent } from './admin/student-management/add-student/add-student.component';
import { AccueilComponent } from './accueil/accueil.component';
import { EnseignantListComponent } from './admin/enseignant-management/enseignant-list/enseignant-list.component';
import { EnseignantCreateComponent } from './admin/enseignant-management/enseignant-create/enseignant-create.component';
import { EnseignantEditComponent } from './admin/enseignant-management/enseignant-edit/enseignant-edit.component';
import { EnseignantDetailsComponent } from './admin/enseignant-management/enseignant-details/enseignant-details.component';
import { EnseignantDeleteComponent } from './admin/enseignant-management/enseignant-delete/enseignant-delete.component';
//import { AddEnseignantComponent } from './admin/enseignant-management/enseignant-create/add-enseignant.component';




import { LoginFormComponent } from './login-form/login-form.component';
import { ChatEnseignantsComponent } from './chat-enseignants/chat-enseignants.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { AddStageComponent } from './etudiant/stage-management/add-stage/add-stage.component';
import { ListeStageComponent } from './etudiant/stage-management/liste-stage/liste-stage.component';
import { UpdateStageComponent } from './etudiant/stage-management/update-stage/update-stage.component';

import { AffectationComponent } from './admin/affectation/affectation.component';

import { StudentQaComponent } from './etudiant/student-qa/student-qa.component';
import { UpdateprofileComponent } from './etudiant/updateprofile/updateprofile.component';
import { Updateprofile2Component } from './professeur/updateprofile2/updateprofile2.component';


export const routes: Routes = [
  { path: '', redirectTo: '/main-home', pathMatch: 'full' },
  { path: 'main-home', component: AccueilComponent },
  { path: 'login-form', component: LoginFormComponent },

  // Professeur
  { path: 'espace-professeur', component: EspaceProfesseurComponent },
  { path: 'details-etudiant/:id', component: DetailsEtudiantComponent },
  { path: 'rapports-stage', component: RapportsStageComponent },
  { path: 'mes-etudiants', component: MesEtudiantsComponent },
  { path: 'updateprofile2', component: Updateprofile2Component},

  // Étudiant
  { path: 'espace-etudiant', component: EspaceEtudiantComponent },
  { path: 'deposerStage', component: DeposerStageComponent },
  { path: 'changerPassword', component: ChangePasswordComponent },
  { path: 'ajoutStage', component: AddStageComponent },
  { path: 'listeStages', component: ListeStageComponent },
  { path: 'updateStage/:id', component: UpdateStageComponent },
  { path: 'updateprofile',component:UpdateprofileComponent},

  // Admin
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'archive', component: ArchivesComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'parametrage', component: ParametrageComponent },
  { path: 'rapports', component: RapportsComponent },
  { path: 'affectation', component: AffectationComponent},

  // Gestion des étudiants
  {
    path: 'students', children: [
      { path: 'list', component: StudentListComponent },
      { path: 'edit-student/:id', component: StudentEditComponent },
      { path: 'details/:id', component: StudentDetailsComponent },
      { path: 'delete/:id', component: StudentDeleteComponent },
      { path: 'add-student', component: AddStudentComponent }
    ]
  },

  // Gestion des enseignants
  {
    path: 'enseignants', children: [
      { path: 'list', component: EnseignantListComponent },
      { path: 'enseignantCreate', component: EnseignantCreateComponent },
      { path: 'edit-enseignant/:id', component: EnseignantEditComponent },
      { path: 'details/:id', component: EnseignantDetailsComponent },
      { path: 'delete/:id', component: EnseignantDeleteComponent },
      { path: 'add-enseignant', component: EnseignantCreateComponent }
    ]
  },

  // Chat
  { path: 'student-qa', component: StudentQaComponent },
  { path: 'chat-enseignants', component: ChatEnseignantsComponent },
  { path: 'chat-home', component: ChatHomeComponent },

  // Fallback
  { path: '**', redirectTo: 'main-home' }
];
