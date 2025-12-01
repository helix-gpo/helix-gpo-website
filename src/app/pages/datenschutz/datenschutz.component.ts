import { Component, inject } from '@angular/core';
import { IconComponent } from '../../util/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  imports: [IconComponent],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css',
})
export class DatenschutzComponent {
  private router: Router = inject(Router);

  handleBackButtonClick() {
    this.router.navigate(['/']);
  }
}
