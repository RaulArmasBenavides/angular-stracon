import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { MessagesRoutingModule } from './messages-routing.module';

//componente
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
