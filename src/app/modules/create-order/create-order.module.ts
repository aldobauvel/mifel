import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { CreateOrderComponent } from './pages/create-order/create-order.component';

//MODULES
import { CreateOrderRoutingModule } from './create-order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    CreateOrderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    SharedModule,
    
  ]
})
export class CreateOrderModule { }
