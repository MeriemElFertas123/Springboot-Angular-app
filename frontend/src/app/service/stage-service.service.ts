import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stage } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class StageServiceService {
  //les requêtes HTTP seront envoyées à cette URL.//stages :c'est dans le controlleur dans spring
  private apiUrl = 'http://localhost:8080/api/stages';

  constructor(private http:HttpClient) { }
  getAllStage():Observable<Stage[]>{
    return this.http.get<Stage[]>(this.apiUrl);
  }
  getStageById(id:number):Observable<Stage>{
    return this.http.get<Stage>(`${this.apiUrl}/${id}`);

  }
  addStage(stage:Stage){
    return this.http.post<Stage>(this.apiUrl,stage);
  }
  updateStage(stage: Stage): Observable<Stage> {
    return this.http.put<Stage>(`${this.apiUrl}/${stage.id}`, stage);

  }
  deleteStage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
