import { Injectable } from '@angular/core';
import {RegisterInterface} from '../../../interface/register.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../../../interface/apiResponse.interfase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3001/api/auth';

  constructor(
    private http: HttpClient,
  ) { }

  registration(data: RegisterInterface): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.baseUrl}/registration`, data);
  }
}
