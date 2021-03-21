import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: 'dealers',
    loadChildren: () =>
      import('./pages/dealers/dealers.module').then((m) => m.DealersModule),
  },
  {
    path: 'cars',
    loadChildren: () =>
      import('./pages/cars/cars.module').then((m) => m.CarsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dealers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
