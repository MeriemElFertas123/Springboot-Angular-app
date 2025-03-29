import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiUrl = 'http://localhost:8080/enseignant'; 
 
  constructor(private http: HttpClient) {}

  
  getEnseignants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

 
  addEnseignant(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, formData);
  }


  getEnseignantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getEnseignantByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${email}`);
  }

  updateEnseignant(id: number, enseignant: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, enseignant);
  }

 
  deleteEnseignant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
