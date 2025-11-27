import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from '../../environments/environment';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private httpClient: HttpClient) { }

  getPet(): Observable<Pet> {
    return this.httpClient.get<Pet>(`${environment.apiUrl}/api/pet`)
  }

  updateProfile(request: Pet): Observable<Pet> {
    return this.httpClient.patch<Pet>(`${environment.apiUrl}/api/pet`, request)
  }

  createProfile(request: Pet): Observable<Pet> {
    return this.httpClient.post<Pet>(`${environment.apiUrl}/api/pet`, request)
  }
}
