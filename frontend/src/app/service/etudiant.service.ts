import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'http://localhost:8080/student'; // Assurez-vous que cette URL est correcte

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les étudiants
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }



  addStudent(etudiant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, etudiant, this.httpOptions);
  }

  

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un étudiant
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, student, this.httpOptions);
  }


  // Supprimer un étudiant
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
