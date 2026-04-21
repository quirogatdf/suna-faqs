import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from './components/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-home',
  imports: [AdminSidebar, RouterOutlet],
  template: `
    <div class="flex h-[calc(100vh-64px)] overflow-auto">
      <app-admin-sidebar class="sticky top-0 h-full z-[40] flex-shrink-0" />
      <main class="flex-1 p-6 bg-muted">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .flex {
        display: flex;
        min-height: calc(100vh - 64px);
      }
      .main-content {
        flex: 1;
        padding: 24px;
        background: var(--muted);
        margin-left: 56px;
      }
    `,
  ],
})
export class AdminHome {}
