import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, take, takeLast, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  getCurrentUser() {
    return this.authSvc.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.http.get<UserDto>(`${this.apiUrl}/${user.id}`);
        }
        return of(null);
      })
    );
  }

  getUsers() {
    return this.http
      .get<UserDto[]>(this.apiUrl)
      .pipe(map((users) => users.filter((user) => !user.isAdmin)));
  }

  getUserById(id: number) {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserDto) {
    console.log(user);
    return this.http.post(`${this.apiUrl}`, user);
  }

  updateUser(id: number, user: UserDto) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
