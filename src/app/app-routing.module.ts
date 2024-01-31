import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path:'create',
    loadChildren: () => import ('./modules/create-order/create-order.module').then( m => m.CreateOrderModule)
  }  
]

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
