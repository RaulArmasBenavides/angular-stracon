import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { CategoriesRoutingModule } from './categories-routing.module';

//componente
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
