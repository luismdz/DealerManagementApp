import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarDto } from '../../../models/car.model';
import { AuthService } from '../../../auth/auth.service';
import { UserDto } from '../../../models/user.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  @Input() cars: CarDto[] = [];
  @Output() deleteCar = new EventEmitter<CarDto>();

  user: UserDto;

  constructor(private authSvc: AuthService, private carSvc: CarService) {
    this.authSvc.currentUser$.subscribe(
      (user) => (this.user = user),
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {}

  eliminar(car: CarDto) {
    this.deleteCar.emit(car);
  }
}
