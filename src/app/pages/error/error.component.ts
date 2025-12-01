import { Component, inject } from '@angular/core';
import { IconComponent } from '../../util/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [IconComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  private router: Router = inject(Router);

  constructor() {}

  handleBackButtonClick() {
    this.router.navigate(['/']);
  }
}
