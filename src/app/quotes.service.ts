import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Quote } from './Quote';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private QUOTES_API_URL = 'http://localhost:8080/test-service-one/quote/random-quote?category=';
  private QUOTES_CATEGORIES_API_URL = 'http://localhost:8080/test-service-one/quote/categories';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private loginService: LoginService, private httpClient: HttpClient) { }

  fetchQuoteForCategory(category: string): Observable<Quote> {
    return this.httpClient.get<Quote>(this.QUOTES_API_URL.concat(category), this.httpOptions)
  }

  fetchQuotesCategories(): Observable<string[]> {
    let apiAccessToken = this.loginService.ACCESS_TOKEN;
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer '.concat(apiAccessToken));

    return this.httpClient.get<string[]>(this.QUOTES_CATEGORIES_API_URL, this.httpOptions)
  }

}
