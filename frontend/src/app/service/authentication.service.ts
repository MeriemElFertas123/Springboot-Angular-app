import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL="http://localhost:8080"

  constructor(private httpClient:HttpClient) { }

  public authUser(body:any):Observable<any>{
    return this.httpClient.post(this.URL+'/api/auth',body);
  }

  public getRolesByEmail(email:string):Observable<any>{
     const params=new HttpParams().set('email',email);
    return this.httpClient.get<any>(this.URL+'/api/role',{params});
  }


}
