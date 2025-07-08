import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { DisputesRoutingModule } from './disputes-routing.module';

//componente
import { DisputesComponent } from './disputes.component';

@NgModule({
  declarations: [DisputesComponent],
  imports: [
    CommonModule,
    DisputesRoutingModule
  ]
})
export class DisputesModule { }
