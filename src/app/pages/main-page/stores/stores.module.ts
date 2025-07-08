import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { StoresRoutingModule } from './stores-routing.module';

//componente
import { StoresComponent } from './stores.component';

@NgModule({
  declarations: [StoresComponent],
  imports: [
    CommonModule,
    StoresRoutingModule
  ]
})
export class StoresModule { }
