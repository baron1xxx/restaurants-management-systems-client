import {Injectable} from '@angular/core';
import {Register} from '../../../interface/register.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../interface/api-response.interfase';
import {Login} from '../../../interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessToken: string;
  private readonly baseUrl = 'http://localhost:3001/api/auth';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(data: Login): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, data);
  }

  registration(data: Register): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, data);
  }
  activateAccount(activateToken: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/activate/${activateToken}`);
  }

  refreshActivateAccount(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/activate`, {email});
  }
}
