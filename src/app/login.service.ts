import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest } from './AuthRequest';
import { LoginApiResponse } from './LoginApiResponse'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ACCESS_TOKEN: string = "";

  private LOGIN_API_URL = 'http://localhost:8080/auth-service/login';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private httpClient: HttpClient) { }

  loginUser(authRequest: AuthRequest): Observable<LoginApiResponse> {
    return this.httpClient.post<LoginApiResponse>(this.LOGIN_API_URL, authRequest, this.httpOptions).pipe(
      tap((apiResponse: LoginApiResponse) => this.trySetAccessJWT(apiResponse))
    )
  }

  tryRefreshAccessJWT(): Observable<LoginApiResponse> {
    return this.httpClient.post<LoginApiResponse>(this.LOGIN_API_URL, new  AuthRequest("_", "_"),this.httpOptions).pipe(
      tap((apiResponse: LoginApiResponse) => this.trySetAccessJWT(apiResponse))
    )
  }


  private trySetAccessJWT(apiResponse: LoginApiResponse) {
    if (apiResponse.httpStatusCode == 200 && apiResponse.accessToken.length !== 0) {
      this.ACCESS_TOKEN = apiResponse.accessToken;
    }
  }

}
