import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private toastrService: ToastrService = inject(ToastrService);

  getEnvironment(): string {
    return environment.ENVIRONMENT;
  }

  shorten(text: string, maxLength: number, addEllipsis = true): string {
    if (text.length <= maxLength) {
      return text;
    }

    if (addEllipsis && maxLength > 3) {
      return text.slice(0, maxLength - 3) + '...';
    }

    return text.slice(0, maxLength);
  }

  formatMonthYear(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    const formatter = new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
    });

    return formatter.format(date);
  }

  formatMonthYearTotal(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    const formatter = new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
    });

    return formatter.format(date);
  }

  showToastr(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning'
  ) {
    switch (type) {
      case 'success':
        this.showSuccess(title, message);
        break;
      case 'error':
        this.showError(title, message);
        break;
      case 'warning':
        this.showWarning(title, message);
        break;
      default:
        console.warn('Unknown toastr type:', type);
    }
  }

  private showWarning(title: string, message: string) {
    this.toastrService.warning(message, title, {
      titleClass: 'toast-title',
      messageClass: 'toast-message',
    });
  }

  private showError(title: string, message: string) {
    this.toastrService.error(message, title, {
      titleClass: 'toast-title',
      messageClass: 'toast-message',
    });
  }

  private showSuccess(title: string, message: string) {
    this.toastrService.success(message, title, {
      titleClass: 'toast-title',
      messageClass: 'toast-message',
    });
  }
}
