import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { SubcategoriesRoutingModule } from './subcategories-routing.module';

//componente
import { SubcategoriesComponent } from './subcategories.component';

@NgModule({
  declarations: [SubcategoriesComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule
  ]
})
export class SubcategoriesModule { }
