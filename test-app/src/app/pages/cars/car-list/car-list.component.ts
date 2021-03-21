import { Component, Input, OnInit } from '@angular/core';
import { CarDto } from '../../../models/car.model';
import { AuthService } from '../../../auth/auth.service';
import { UserDto } from '../../../models/user.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  @Input() cars: CarDto[] = [];
  user: UserDto;

  constructor(private authSvc: AuthService) {
    this.authSvc.currentUser$.subscribe(
      (user) => (this.user = user),
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {}
}
