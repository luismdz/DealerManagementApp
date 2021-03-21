import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserDto } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: UserDto;

  constructor(public authSvc: AuthService, private router: Router) {
    this.authSvc.currentUser$.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/auth');
      }

      this.user = user;
    });
  }

  ngOnInit(): void {}

  onToggleSidenav() {}
}
