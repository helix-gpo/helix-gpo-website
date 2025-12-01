import { Component, inject } from '@angular/core';
import { IconComponent } from '../../util/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impressum',
  imports: [IconComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css',
})
export class ImpressumComponent {
  private router: Router = inject(Router);

  handleBackButtonClick() {
    this.router.navigate(['/']);
  }
}
