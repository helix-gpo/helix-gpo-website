import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-modal',
  imports: [],
  templateUrl: './menu-modal.component.html',
  styleUrl: './menu-modal.component.css',
})
export class MenuModalComponent {
  private dialogRef: MatDialogRef<MenuModalComponent> = inject(MatDialogRef);

  public closeModal(element: string) {
    this.dialogRef.close(element);
  }
}
