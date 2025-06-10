import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";

// mock-rapports.service.ts
@Injectable({ providedIn: 'root' })
export class MockRapportService {
  private rapports: any[] = [
    {
      id: 1,
      titre: "IA en santé",
      etudiant: { nom: "Dupont", prenom: "Jean" },
      tuteur: { nom: "Martin" },
      dateDepot: new Date(2023, 5, 15),
      etat: "VALIDE",
      note: 16.5,
      annee: 2023,
      domaine: "INFORMATIQUE"
    },
    // Ajoutez 10-15 autres rapports fictifs...
  ];

  getRapportsFiltres(etat?: string): Observable<any[]> {
    let result = this.rapports;
    if (etat) {
      result = result.filter(r => r.etat === etat);
    }
    return of(result).pipe(delay(500)); // Simule latence réseau
  }

  getArchives(annee?: number): Observable<any[]> {
    let result = this.rapports.filter(r => r.etat === "VALIDE");
    if (annee) {
      result = result.filter(r => r.annee === annee);
    }
    return of(result).pipe(delay(500));
  }

  exportExcel(annee: number): Observable<Blob> {
    // Simule un fichier Excel vide
    const blob = new Blob([""], { type: 'application/vnd.ms-excel' });
    return of(blob).pipe(delay(300));
  }
}