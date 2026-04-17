import { Component, signal, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideX, lucideSearch, lucideUser, lucideUsers, lucideCircleHelp } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { FaqService } from '../../../../shared/services/faq.service';

@Component({
  selector: 'app-sidebar',
  imports: [HlmButtonDirective, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideMenu, lucideX, lucideSearch, lucideUser, lucideUsers, lucideCircleHelp })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private faqService = inject(FaqService);
  
  isCollapsed = signal<boolean>(false);

  categories = [
    { id: 'agente', icon: 'lucideUser', label: 'Rol de Agente' },
    { id: 'equipo', icon: 'lucideUsers', label: 'Rol de Equipo de Gestión' },
    { id: 'general', icon: 'lucideCircleHelp', label: 'General' },
  ];

  toggle() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  selectCategory(categoryId: string | null) {
    const current = this.faqService.selectedCategory();
    if (current === categoryId) {
      this.faqService.setCategory(null);
    } else {
      this.faqService.setCategory(categoryId);
    }
  }

  isSelected(categoryId: string): boolean {
    return this.faqService.selectedCategory() === categoryId;
  }
}
