import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
	imports: [CommonModule, RouterModule],
	standalone: true
})
export class FooterComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
