import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../../side-bar-admin/side-bar-admin.component";
import { NgFor,NgIf } from '@angular/common';
import { EnseignantService } from '../../../service/enseignant.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-enseignant-list',
  imports: [SideBarAdminComponent,NgIf,NgFor,RouterLink],
  templateUrl: './enseignant-list.component.html',
  styleUrl: './enseignant-list.component.css'
})
export class EnseignantListComponent {
  enseignants: any[] = [];
  isDeleting: boolean = false; // Indicateur de chargement pour la suppression
  constructor(private enseignantService: EnseignantService,private router:Router) {}

  ngOnInit(): void {
    this.loadEnseignants();
  }

  loadEnseignants(): void {
    this.enseignantService.getEnseignants().subscribe({
      next: (data) => this.enseignants = data,
      error: (err) => console.error('Failed to load enseignants', err)
    });
  }

  deleteEnseignant(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID non défini : impossible de supprimer l\'enseignant.');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      // Afficher un indicateur de chargement (optionnel)
      this.isDeleting = true;
  
      this.enseignantService.deleteEnseignant(id).subscribe({
        next: () => {
          // Supprimer l'étudiant de la liste locale
          this.enseignants = this.enseignants.filter(enseignant => enseignant.id !== id);
          this.isDeleting = false; // Masquer l'indicateur de chargement
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'enseignant :', err);
          this.isDeleting = false; // Masquer l'indicateur de chargement en cas d'erreur
        }
      });

    }
  }
  // Convertir l'image BLOB en URL utilisable dans une balise <img>
  getImageUrl(image: any): string {
    if (typeof image === 'string') {
      // Si l'image est déjà en base64
      return image;
    } else if (image instanceof Blob) {
      // Si l'image est un Blob
      return URL.createObjectURL(image);
    } else if (image instanceof ArrayBuffer || Array.isArray(image)) {
      // Si l'image est un tableau de bytes (BLOB)
      const blob = new Blob([new Uint8Array(image)], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } else {
      // Si l'image est dans un format non pris en charge
      return ''; // Retourner une chaîne vide ou une image par défaut
    }
  }

}
