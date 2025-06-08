import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtudiantImportDto {
  nom: string;
  prenom: string;
  email: string;
  genre: string;
  filiere: string;
  anneeEtude: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelImportService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  // Importer le fichier Excel et récupérer la liste des étudiants
  importExcel(file: File): Observable<EtudiantImportDto[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<EtudiantImportDto[]>(`${this.apiUrl}/import-etudiants`, formData);
  }

  // Télécharger le template Excel
  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/template-excel`, { 
      responseType: 'blob' 
    });
  }
}