import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${environment.apiUrl}/api/sephyprofile`)
  }

  updateProfile(request: Profile): Observable<Profile> {
    return this.httpClient.patch<Profile>(`${environment.apiUrl}/api/sephyprofile`, request)
  }

  createProfile(request: Profile): Observable<Profile> {
    return this.httpClient.post<Profile>(`${environment.apiUrl}/api/sephyprofile`, request)
  }
}
