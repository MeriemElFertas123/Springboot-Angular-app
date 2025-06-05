import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'http://localhost:8081/student'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les étudiants
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Ajouter un étudiant
  addStudent(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, formData);
  }

  // Récupérer un étudiant par ID
  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

   // Récupérer un étudiant par Email
   getStudentByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${email}`);
  }

  // Mettre à jour un étudiant
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, student);
  }

  // Supprimer un étudiant
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  

  
}
