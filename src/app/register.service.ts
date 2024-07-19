import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest } from './AuthRequest';
import { RegisterApiResponse } from './RegisterApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private REGISTER_API_URL = 'http://localhost:8080/auth-service/register';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public registerUser(authRequest: AuthRequest): Observable<RegisterApiResponse> {
    return this.http.post<RegisterApiResponse>(this.REGISTER_API_URL, authRequest, this.httpOptions)
  }

}
