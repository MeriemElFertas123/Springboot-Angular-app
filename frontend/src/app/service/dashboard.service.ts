import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8081/api/dashboard';

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);

  }

  getReportsEvolution(chartPeriod: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports-evolution`);
  }

  

  // getReportsEvolution(chartPeriod: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/reports-evolution`);
  // }
}

