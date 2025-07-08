import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { HomeRoutingModule } from './home-routing.module';

//componente
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule 
  ]
})
export class HomeModule { }
