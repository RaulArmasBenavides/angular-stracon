import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css'],
	imports: [RouterModule, SideBarComponent, NavBarComponent],
	standalone: true
})
export class MainPageComponent implements OnInit {
	constructor() {}
	collapsed: boolean = false;

	toggleSidebar() {
		this.collapsed = !this.collapsed;
	}

	ngOnInit(): void {}
}
