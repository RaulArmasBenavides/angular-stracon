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
			{ path: '', loadChildren: () => import('./main-page/home/home.module').then((m) => m.HomeModule) },
			{ path: 'users', loadChildren: () => import('./main-page/users/users.module').then((m) => m.UsersModule) },
			{ path: 'categories', loadChildren: () => import('./main-page/categories/categories.module').then((m) => m.CategoriesModule) },
			{ path: 'stores', loadChildren: () => import('./main-page/stores/stores.module').then((m) => m.StoresModule) },
			{ path: 'products', loadChildren: () => import('./main-page/products/products.module').then((m) => m.ProductsModule) },
			{ path: 'orders', loadChildren: () => import('./main-page/orders/orders.module').then((m) => m.OrdersModule) },
			{ path: 'sales', loadChildren: () => import('./main-page/sales/sales.module').then((m) => m.SalesModule) },
			{ path: 'messages', loadChildren: () => import('./main-page/messages/messages.module').then((m) => m.MessagesModule) },
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
