import { Routes } from '@angular/router';
import { DetailsEtudiantComponent } from './professeur/details-etudiant/details-etudiant.component';
import { RapportsStageComponent } from './professeur/rapports-stage/rapports-stage.component';
import { EspaceProfesseurComponent } from './professeur/espace-professeur/espace-professeur.component';
import { MesEtudiantsComponent } from './professeur/mes-etudiants/mes-etudiants.component';
import { EspaceEtudiantComponent } from './etudiant/espace-etudiant/espace-etudiant.component';
import { AjouterStageComponent } from './etudiant/ajouter-stage/ajouter-stage.component';
import { DeposerStageComponent } from './etudiant/deposer-stage/deposer-stage.component';
import { ChangePasswordComponent } from './etudiant/change-password/change-password.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ArchiveComponent } from './admin/archive/archive.component';
import { ChatComponent } from './admin/chat/chat.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EnseignantManagementComponent } from './admin/enseignant-management/enseignant-management.component';
import { ParametrageComponent } from './admin/parametrage/parametrage.component';
import { RapportsComponent } from './admin/rapports/rapports.component';
import { StudentCreateComponent } from './admin/student-management/student-create/student-create.component';
import { StudentEditComponent } from './admin/student-management/student-edit/student-edit.component';
import { StudentDetailsComponent } from './admin/student-management/student-details/student-details.component';
import { StudentDeleteComponent } from './admin/student-management/student-delete/student-delete.component';
import { StudentListComponent } from './admin/student-management/student-list/student-list.component';
import { Component } from '@angular/core';
import { AddStudentComponent } from './admin/student-management/add-student/add-student.component';

export const routes: Routes = [
    {path:'',redirectTo:'/main-home',pathMatch:'full'},

    {path:'main-home',component:MainHomeComponent},

    {path:'espace-professeur',component:EspaceProfesseurComponent},
    {path:'details-etudiant/:id',component:DetailsEtudiantComponent},
    {path:'rapports-stage',component:RapportsStageComponent},
    {path:'mes-etudiants',component:MesEtudiantsComponent},

    { path: 'espace-etudiant', component: EspaceEtudiantComponent }, 
    { path: 'ajouterStage', component: AjouterStageComponent },
    { path: 'deposerStage', component: DeposerStageComponent },
    { path: 'changerPassword', component: ChangePasswordComponent },

    { path:'admin-home', component:AdminHomeComponent},
    { path:'archive', component:ArchiveComponent},
    { path:'chat', component:ChatComponent},
    { path:'dashboard',component:DashboardComponent},
    { path: 'enseignant-management', component: EnseignantManagementComponent }, // Gestion des enseignants
    { path: 'parametrage', component: ParametrageComponent }, // Paramétrage
    { path: 'rapports', component: RapportsComponent }, // Rapports partie admin
/*
    { path: 'list', component: StudentListComponent }, // Liste des étudiants
    { path: 'studentCreate', component: StudentCreateComponent }, // Création d'un étudiant
    { path: 'edit/:id', component: StudentEditComponent }, // Modification d'un étudiant
    { path: 'details/:id', component: StudentDetailsComponent }, // Détails d'un étudiant
    { path: 'delete/:id', component: StudentDeleteComponent }, // Suppression d'un étudiant
*/

    { path:'students',children:[
        { path: 'list', component: StudentListComponent }, // Liste des étudiants
        { path: 'studentCreate', component: StudentCreateComponent }, // Création d'un étudiant
        { path: 'edit-student/:id', component: StudentEditComponent }, // Modification d'un étudiant
        { path: 'details/:id', component: StudentDetailsComponent }, // Détails d'un étudiant
        { path: 'delete/:id', component: StudentDeleteComponent },
        {path: 'add-student',component:AddStudentComponent}
    ]},

    { path: '**', redirectTo: 'main-home' } ,// Redirection en cas d'URL inconnue


];
