import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.css'],
	imports: [RouterModule],
	standalone: true
})
export class SideBarComponent implements OnInit {
	constructor() {}
	readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	@Input() collapsed = false;
	ngOnInit(): void {}

	onLogout(): void {}

	logout() {
		this.auth.logout();
		this.router.navigate(['/login']);
	}
}
