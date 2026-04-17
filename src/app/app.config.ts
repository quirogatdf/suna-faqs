import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { loadingInterceptor } from '../shared/data/loading-interceptor';
import {
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';
export const appConfig: ApplicationConfig = {
  providers: [
    // Default: Enable zoneless chahge detectionn for optimal performance (Angular v20)
    provideZonelessChangeDetection(),

    // Router with modern features
    provideRouter(
      routes,
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
    ),
    // HTTP client with functional interceptors
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),

    // Client-side hydration with incremental hydration (Angular v20 stable)
    provideClientHydration(withIncrementalHydration()),
    //Animations
    //    provideAnimations(),
  ],
};
