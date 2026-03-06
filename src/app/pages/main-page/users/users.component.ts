import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
	imports: [CommonModule, RouterModule],
	standalone: true
})
export class UsersComponent implements OnInit {
	private readonly usersService = inject(UsersService);
	private readonly router = inject(Router);
	users$!: Observable<User[]>;
	term = '';

	ngOnInit(): void {
		this.users$ = this.usersService.getUsers();
	}

	onSearch(): void {
		this.users$ = this.usersService.searchUsers(this.term);
	}

	onCreate() {
		this.router.navigate(['/main/users', 'create']);
	}
}
