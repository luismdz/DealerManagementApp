import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealersComponent } from './dealers.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { DealerEditComponent } from './dealer-edit/dealer-edit.component';
import { AdminGuard } from '../../auth/admin.guard';
import { DealerCreateComponent } from './dealer-create/dealer-create.component';

const routes: Routes = [
  { path: '', component: DealersComponent, canActivate: [AdminGuard] },
  { path: 'new', component: DealerCreateComponent, canActivate: [AdminGuard] },
  {
    path: 'edit/:id',
    component: DealerEditComponent,
    canActivate: [AdminGuard],
  },
  { path: 'user', component: DealerDetailsComponent },
  { path: ':id', component: DealerDetailsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealersRoutingModule {}
