// qa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Reply {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface NewQuestion {
  title: string;
  content: string;
  category: string;
}

interface NewReply {
  content: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private apiUrl = 'http://localhost:8081/api/qa';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer toutes les questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer une question par ID
  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/questions/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Créer une nouvelle question
  createQuestion(question: NewQuestion): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, question, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une question
  updateQuestion(id: number, question: Partial<Question>): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}`, question, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer une question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questions/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Aimer/Ne plus aimer une question
  likeQuestion(questionId: number): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions/${questionId}/like`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ajouter une réponse à une question
  addReply(questionId: number, reply: NewReply): Observable<Reply> {
    return this.http.post<Reply>(`${this.apiUrl}/questions/${questionId}/replies`, reply, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une réponse
  updateReply(questionId: number, replyId: number, reply: Partial<Reply>): Observable<Reply> {
    return this.http.put<Reply>(`${this.apiUrl}/questions/${questionId}/replies/${replyId}`, reply, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer une réponse
  deleteReply(questionId: number, replyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questions/${questionId}/replies/${replyId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Aimer/Ne plus aimer une réponse
  likeReply(questionId: number, replyId: number): Observable<Reply> {
    return this.http.post<Reply>(`${this.apiUrl}/questions/${questionId}/replies/${replyId}/like`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Rechercher des questions
  searchQuestions(searchTerm: string, category?: string): Observable<Question[]> {
    let url = `${this.apiUrl}/questions/search?q=${encodeURIComponent(searchTerm)}`;
    if (category && category !== 'all') {
      url += `&category=${encodeURIComponent(category)}`;
    }
    return this.http.get<Question[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer les questions par catégorie
  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions/category/${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer les statistiques
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur s\'est produite';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé';
          break;
        case 403:
          errorMessage = 'Accès interdit';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur interne du serveur';
          break;
        default:
          errorMessage = `Erreur: ${error.status} - ${error.message || error.statusText}`;
      }
    }
    
    console.error('Erreur API:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}