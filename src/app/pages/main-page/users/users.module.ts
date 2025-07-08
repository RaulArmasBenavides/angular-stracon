import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { UsersRoutingModule } from './users-routing.module';

//componente
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
