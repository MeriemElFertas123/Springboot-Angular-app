import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncadrementService {

  constructor(private http:HttpClient) { }

  associer(encadrementRequest:any){
    return this.http.post('http://localhost:8080/api/encadrement/affecter',encadrementRequest);
  }
}
