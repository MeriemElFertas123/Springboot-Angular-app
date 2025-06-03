import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncadrementService {

  private apiUrl='http://localhost:8080/api/encadrement'

  constructor(private http:HttpClient) { }

  associer(encadrementRequest:any){
    return this.http.post(`${this.apiUrl}/affecter`,encadrementRequest);
  }

  getEtudiantsByEnseignantId(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }
}
