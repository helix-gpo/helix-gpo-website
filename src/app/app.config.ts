import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IMAGE_CONFIG } from '@angular/common';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        /* scrollPositionRestoration: 'enabled', */
        anchorScrolling: 'enabled',
      })
    ),
    provideToastr({
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
      },
    },
  ],
};
