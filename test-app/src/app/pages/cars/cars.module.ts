import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from './car-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { MaterialModule } from '../../material.module';
import { CarEditComponent } from './car-edit/car-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarListComponent, CarEditComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [CarListComponent],
})
export class CarsModule {}
