import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { OrdersRoutingModule } from './orders-routing.module';

//componente
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
