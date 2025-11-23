import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('attempting login...');
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`, credentials)
    .pipe(map((response: LoginResponse) => {
      localStorage.setItem('accessToken', response.accessToken);
      document.cookie = `refreshToken=${response.refreshToken}`;
      return response;
    }));
  }

  refreshToken(): Observable<LoginResponse>{
    const refreshToken = this.getRefreshTokenFromCookie();

    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`, {refreshToken})
    .pipe(map((response: LoginResponse) => {
      localStorage.setItem('accessToken', response.accessToken);
      document.cookie = `refreshToken=${response.refreshToken}`;
      return response;
    }));
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ')

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');

      if (name == 'refreshToken') {
        return value;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  register(credentials: LoginRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${environment.apiUrl}/register`, credentials);
  }
}
