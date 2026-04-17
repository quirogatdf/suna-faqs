import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from '../core/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="app-layout">
      <app-header />
      <main class="main-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,

  styles: [
    `
      .app-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .main-content {
        flex: 1;
        padding: var(--space-lg) 0;
      }
    `,
  ],
})
export class App {
  protected title = 'faqs';
}
