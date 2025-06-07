// rapports.component.ts
import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import { CommonModule } from "@angular/common";
import { RapportService, RapportStageDto } from "../../service/rapport-service.service";

@Component({
  selector: 'app-admin-rapports',
  standalone: true,
  imports: [SideBarAdminComponent, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './rapports.component.html'
})
export class RapportsComponent implements OnInit {
changeStatus(arg0: string) {
throw new Error('Method not implemented.');
}
  rapports: RapportStageDto[] = [];
  etats = ['EN_ATTENTE', 'VALIDE', 'REJETE'];
  selectedEtat?: string;
  isLoading = false;
  
  // Variables pour la modal de visualisation
  showModal = false;
  selectedRapport: RapportStageDto | null = null;

  constructor(private rapportService: RapportService) {}

  ngOnInit(): void {
    this.loadRapports();
  }
  
  loadRapports(): void {
    this.isLoading = true;
    this.rapportService.getRapportsFiltres(this.selectedEtat)
      .subscribe({
        next: (data) => {
          this.rapports = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des rapports:', error);
          this.isLoading = false;
        }
      });
  }

  viewReport(rapport: RapportStageDto): void {
    this.selectedRapport = rapport;
    this.showModal = true;
  }

  downloadReport(rapport: RapportStageDto): void {
    if (!rapport.stage.id) {
      alert('Impossible de télécharger le rapport: ID manquant');
      return;
    }

    this.rapportService.downloadRapport(rapport.stage.id).subscribe({
      next: (blob) => {
        // Créer un lien de téléchargement
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Nom du fichier à télécharger
        const filename = rapport.stage.nomFichierRapport || 
                        `rapport_${rapport.etudiant.nom}_${rapport.etudiant.prenom}.pdf`;
        link.download = filename;
        
        // Déclencher le téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Nettoyer l'URL
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement du rapport');
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRapport = null;
  }

  updateStatus(stageId: number, newStatus: string): void {
    this.rapportService.updateRapportStatus(stageId, newStatus).subscribe({
      next: () => {
        // Recharger les rapports après mise à jour
        this.loadRapports();
        alert('Statut mis à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        alert('Erreur lors de la mise à jour du statut');
      }
    });
  }

  // Méthode utilitaire pour formater les dates
  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  }

  // Méthode pour obtenir la classe CSS du statut
  getStatusClass(statut: string): string {
    switch (statut?.toLowerCase()) {
      case 'en_attente':
        return 'status-en_cours';
      case 'valide':
        return 'status-valide';
      case 'rejete':
        return 'status-refuse';
      default:
        return 'status-en_cours';
    }
  }
}