import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainPageComponent } from './main-page/main-page.component';
import { Error404Component } from './main-page/error404/error404.component';
import { Suppliers } from './main-page/suppliers/suppliers';
import { ModalEditSupplier } from './main-page/suppliers/components/modal-edit-supplier/modal-edit-supplier';

const routes: Routes = [
	{
		path: '',
		component: MainPageComponent,
		children: [
			{ path: '', component: Suppliers },
			{ path: 'users', loadChildren: () => import('./main-page/users/users.module').then((m) => m.UsersModule) },

			{ path: 'suppliers', component: Suppliers },
			{ path: 'suppliers/:id/edit', component: ModalEditSupplier },
			{ path: '**', component: Error404Component }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}
