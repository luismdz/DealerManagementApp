import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdminGuard } from '../../auth/admin.guard';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'edit', component: UserEditComponent },
  { path: 'edit/:id', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
