import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { ProductsRoutingModule } from './products-routing.module';

//componente
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
