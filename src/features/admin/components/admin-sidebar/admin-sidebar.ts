import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideNewspaper, lucideBookOpen, lucideLogOut } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-admin-sidebar',
  imports: [HlmButtonDirective, HlmIconDirective, NgIcon, RouterLink, RouterLinkActive],
  providers: [provideIcons({ lucideNewspaper, lucideBookOpen, lucideLogOut })],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  isHovered = signal<boolean>(false);

  menuItems = [
    { route: 'news-config', icon: 'lucideNewspaper', label: 'Configuración de noticias' },
    { route: 'regulations', icon: 'lucideBookOpen', label: 'Normativas' },
    { route: '/home', icon: 'lucideLogOut', label: 'Salir' },
  ];

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }
}