import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css'],
	imports: [RouterModule],
	standalone: true
})
export class NavBarComponent implements OnInit {
	constructor() {}
	@Output() toggleSidebar = new EventEmitter<void>();
	ngOnInit(): void {}
}
