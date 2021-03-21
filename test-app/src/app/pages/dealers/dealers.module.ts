import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealersRoutingModule } from './dealers-routing.module';
import { DealersComponent } from './dealers.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { DealerEditComponent } from './dealer-edit/dealer-edit.component';
import { DealerListComponent } from './dealer-list/dealer-list.component';
import { MaterialModule } from '../../material.module';
import { CarsModule } from '../cars/cars.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from '../users/users.module';
import { DealerCreateComponent } from './dealer-create/dealer-create.component';

@NgModule({
  declarations: [
    DealersComponent,
    DealerDetailsComponent,
    DealerEditComponent,
    DealerListComponent,
    DealerCreateComponent,
  ],
  imports: [
    CommonModule,
    DealersRoutingModule,
    MaterialModule,
    CarsModule,
    ReactiveFormsModule,
    UsersModule,
  ],
})
export class DealersModule {}
