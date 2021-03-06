import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mode = 'horizontal';
  @Output() sidenavToggle = new EventEmitter();

  user: UserDto;

  constructor(private authSvc: AuthService) {
    this.authSvc.currentUser$.subscribe(
      (user) => (this.user = user),
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
