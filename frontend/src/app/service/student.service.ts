import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /*

  private apiUrl = 'API_URL_HERE';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${student.id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`);
  }*/
}
