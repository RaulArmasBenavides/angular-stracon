import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//Modulos Personalizados
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './main-page/error404/error404.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
	declarations: [MainPageComponent, Error404Component],
	imports: [CommonModule, SharedModule, PagesRoutingModule]
})
export class PagesModule {}
