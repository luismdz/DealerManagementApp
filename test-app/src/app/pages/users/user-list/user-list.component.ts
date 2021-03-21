import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<UserDto[]>;
  columns = ['nombre', 'email', 'age', 'dealer', 'actions'];

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.userSvc.getUsers();
  }

  deleteUser(user: UserDto) {
    this.userSvc.deleteUser(user.id).subscribe(
      (resp) => this.loadUsers(),
      (error) => console.log(error)
    );
  }
}
