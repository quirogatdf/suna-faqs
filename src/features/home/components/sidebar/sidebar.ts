import { Component, signal, inject, HostListener } from '@angular/core';
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
  
  isCollapsed = signal<boolean>(window.matchMedia('(max-width: 639px)').matches);
  isOpen = signal<boolean>(false);

  categories = [
    { id: 'agente', icon: 'lucideUser', label: 'Rol de Agente' },
    { id: 'equipo', icon: 'lucideUsers', label: 'Rol de Equipo de Gestión' },
    { id: 'general', icon: 'lucideCircleHelp', label: 'General' },
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('app-sidebar');
    const toggleButton = document.querySelector('.sidebar-toggle');
    
    // Only handle outside clicks on mobile when sidebar is open
    if (window.innerWidth <= 639 && this.isOpen() && sidebar) {
      if (!sidebar.contains(target) && !toggleButton?.contains(target)) {
        this.isOpen.set(false);
        this.isCollapsed.set(true);
      }
    }
  }

  toggle() {
    if (window.innerWidth <= 639) {
      this.isOpen.update(v => !v);
      this.isCollapsed.update(v => !v);
    } else {
      this.isCollapsed.update(v => !v);
    }
  }

  selectCategory(categoryId: string | null) {
    const current = this.faqService.selectedCategory();
    if (current === categoryId) {
      this.faqService.setCategory(null);
    } else {
      this.faqService.setCategory(categoryId);
      // On mobile, open sidebar when selecting a category
      if (window.innerWidth <= 639 && !this.isOpen()) {
        this.isOpen.set(true);
        this.isCollapsed.set(false);
      }
    }
  }

  isSelected(categoryId: string): boolean {
    return this.faqService.selectedCategory() === categoryId;
  }
}
