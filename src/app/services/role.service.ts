import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddRoleRequest } from '../models/addRole-request';
import { AddRoleResponse } from '../models/addRole-response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<String[]> {
    return this.httpClient.get<String[]>(`${environment.apiUrl}/api/role`);
  }

  addUserToRole(request: AddRoleRequest): Observable<AddRoleResponse> {
    return this.httpClient.post<AddRoleResponse>(`${environment.apiUrl}/api/role`, request);
  }
}