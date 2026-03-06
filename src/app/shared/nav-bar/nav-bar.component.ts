import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css'],
	imports: [CommonModule, RouterModule],
	standalone: true
})
export class NavBarComponent implements OnInit {
	constructor() {}
	@Output() toggleSidebar = new EventEmitter<void>();
	ngOnInit(): void {}
}
