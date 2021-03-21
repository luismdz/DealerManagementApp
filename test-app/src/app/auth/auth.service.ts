import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserDto, LoginDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl + 'users';
  currentUser$ = new BehaviorSubject<UserDto>(null);

  constructor(private http: HttpClient) {
    this.validateExistingToken();
  }

  login(loginData: LoginDto) {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((resp: any) => {
        localStorage.setItem('userToken', JSON.stringify(resp.token));
        this.getDataFromToken(resp.token);
      }),
      map((resp) => !!resp)
    );
  }

  logout() {
    localStorage.removeItem('userToken');
    this.currentUser$.next(null);
  }

  getToken() {
    const token = localStorage.getItem('userToken');
    return JSON.parse(token);
  }

  private getDataFromToken(token: string) {
    if (token) {
      const data = JSON.parse(atob(token.split('.')[1]));

      const user: UserDto = {
        email: data.email,
        isAdmin: data.isAdmin ? true : false,
        id: data.userId,
      };

      this.currentUser$.next(user);
    }
  }

  private validateExistingToken() {
    const data = localStorage.getItem('userToken');

    if (data) {
      this.getDataFromToken(data);
    }
  }
}
