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

  // Nouvelle méthode pour récupérer les stages d'un étudiant spécifique
  getStagesByStudentId(studentId: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/student/${studentId}`);
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
  
  // Nouvelle méthode pour ajouter un stage avec un fichier
  addStageWithReport(formData: FormData): Observable<Stage> {
    return this.http.post<Stage>(this.apiUrl, formData);
  }

  // Méthode pour télécharger le rapport d'un stage
  downloadStageReport(stageId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${stageId}/rapport`, {
      responseType: 'blob'
    });
  }
  
  updateStageWithRapport(formData: FormData, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/with-rapport`, formData);
  }
  
  downloadRapport(stageId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${stageId}/rapport`, {
      responseType: 'blob'
    });
  }



  validerStage(idStage : number){
    return this.http.put(`${this.apiUrl}/validerStage/${idStage}`,{})
  }





}

