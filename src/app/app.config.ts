import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {providePrimeNG} from "primeng/config";

import Lara from "@primeng/themes/lara"
import LaraPurple from "./theme/MyPresetLara";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: LaraPurple,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: "primeng"
        }
      }
    })
  ]
};
