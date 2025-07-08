import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { SalesRoutingModule } from './sales-routing.module';

//componente
import { SalesComponent } from './sales.component';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
