import { Component, OnInit } from "@angular/core";
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { ArchivesService, ArchiveDto } from "../../service/archives-service.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-admin-archives',
  standalone: true,
  imports: [SideBarAdminComponent, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './archive.component.html',
  providers: [ArchivesService, DatePipe]
})
export class ArchivesComponent implements OnInit {
  archives: ArchiveDto[] = [];
  annees: number[] = [];
  selectedAnnee?: number;
  isLoading = false;
  errorMessage = '';

  constructor(
    private archivesService: ArchivesService,
    private datePipe: DatePipe,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadAvailableYears();
    this.loadArchives();
  }
  logout() {
    console.log("Déconnexion en cours...");
    // Implémente ici la logique de déconnexion, par ex. suppression du token, redirection
    this.router.navigate(['/login']);
  }

  /**
   * Charger les années disponibles
   */
  loadAvailableYears(): void {
    this.archivesService.getAvailableYears().subscribe({
      next: (annees) => {
        this.annees = annees.sort((a, b) => b - a); // Tri décroissant
        console.log('Années disponibles:', this.annees);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des années:', error);
        this.errorMessage = 'Erreur lors du chargement des années disponibles';
        // Années par défaut en cas d'erreur
        this.annees = [2024, 2023, 2022, 2021];
      }
    });
  }

  /**
   * Charger les archives (uniquement les stages validés)
   */
  loadArchives(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    console.log('Chargement des archives pour l\'année:', this.selectedAnnee);
    
    this.archivesService.getArchives(this.selectedAnnee).subscribe({
      next: (data) => {
        this.archives = data;
        this.isLoading = false;
        console.log(`${data.length} archives validées chargées:`, data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des archives:', error);
        this.errorMessage = `Erreur lors du chargement des archives: ${error.message}`;
        this.archives = [];
        this.isLoading = false;
      }
    });
  }

  /**
   * Visualiser un rapport dans le navigateur
   */
  viewArchive(archive: ArchiveDto): void {
    if (!archive.id) {
      alert('Impossible de visualiser ce rapport: ID manquant');
      return;
    }

    if (!archive.nomFichierRapport) {
      alert('Aucun rapport disponible pour cet archive');
      return;
    }

    console.log('Visualisation du rapport pour l\'archive:', archive.id);

    this.archivesService.viewRapport(archive.id).subscribe({
      next: (blob) => {
        if (blob.size === 0) {
          alert('Le rapport est vide ou n\'existe pas');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');
        
        if (!newWindow) {
          alert('Popup bloquée. Veuillez autoriser les popups pour ce site.');
        }
        
        // Nettoyer l'URL après un délai
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      },
      error: (error) => {
        console.error('Erreur lors de la visualisation:', error);
        alert(`Erreur lors de la visualisation du rapport: ${error.message}`);
      }
    });
  }

  /**
   * Télécharger un rapport
   */
  downloadArchive(archive: ArchiveDto): void {
    if (!archive.id) {
      alert('Impossible de télécharger ce rapport: ID manquant');
      return;
    }

    if (!archive.nomFichierRapport) {
      alert('Aucun rapport disponible pour cet archive');
      return;
    }

    console.log('Téléchargement du rapport pour l\'archive:', archive.id);

    this.archivesService.downloadRapport(archive.id).subscribe({
      next: (blob) => {
        if (blob.size === 0) {
          alert('Le rapport est vide ou n\'existe pas');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = archive.nomFichierRapport || `rapport_${archive.id}.pdf`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log('Téléchargement initié pour:', link.download);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement:', error);
        alert(`Erreur lors du téléchargement du rapport: ${error.message}`);
      }
    });
  }

  /**
   * Exporter les données vers Excel
   */
  exportExcel(): void {
    if (!this.selectedAnnee) {
      alert('Veuillez sélectionner une année pour exporter');
      return;
    }
    
    console.log('Export Excel pour l\'année:', this.selectedAnnee);
    this.isLoading = true;
    this.errorMessage = '';
    
    this.archivesService.exportExcel(this.selectedAnnee).subscribe({
      next: (blob) => {
        if (blob.size === 0) {
          alert('Aucune donnée à exporter pour cette année');
          this.isLoading = false;
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `archives_validees_${this.selectedAnnee}.xlsx`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        this.isLoading = false;
        console.log('Export Excel terminé:', link.download);
      },
      error: (error) => {
        console.error('Erreur lors de l\'export Excel:', error);
        this.errorMessage = `Erreur lors de l'export Excel: ${error.message}`;
        alert(`Erreur lors de l'export Excel: ${error.message}`);
        this.isLoading = false;
      }
    });
  }

  /**
   * Formatter une date au format français
   */
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return dateString;
    }
  }

  /**
   * TrackBy function pour optimiser les performances de *ngFor
   */
  trackByArchiveId(index: number, item: ArchiveDto): any {
    return item.id || index;
  }
}