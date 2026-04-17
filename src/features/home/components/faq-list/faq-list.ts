import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronUp, lucideSearch } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { FaqService } from '../../../../shared/services/faq.service';

@Component({
  selector: 'app-faq-list',
  imports: [HlmButtonDirective, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp, lucideSearch })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="faq-container">
      <!-- Buscador inline -->
      <div class="faq-search">
        <ng-icon hlm size="sm" name="lucideSearch" class="search-icon" />
        <input 
          type="text" 
          class="search-input" 
          placeholder="Buscar en las preguntas..."
          [value]="searchQuery()"
          (input)="onSearch($any($event.target).value)"
        />
      </div>

      <!-- Categorías filter -->
      <div class="category-filters">
        <button 
          hlmBtn 
          [variant]="!selectedCategory() ? 'default' : 'outline'"
          size="sm" 
          class="category-btn"
          (click)="clearFilter()"
        >
          Todos
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory() === 'agente' ? 'default' : 'outline'"
          size="sm" 
          class="category-btn"
          (click)="selectCategory('agente')"
        >
          Rol de Agente
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory() === 'equipo' ? 'default' : 'outline'"
          size="sm" 
          class="category-btn"
          (click)="selectCategory('equipo')"
        >
          Rol de Equipo
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory() === 'general' ? 'default' : 'outline'"
          size="sm" 
          class="category-btn"
          (click)="selectCategory('general')"
        >
          General
        </button>
      </div>

      <!-- Lista de FAQs -->
      <div class="faq-list">
        @for (faq of displayedFaqs(); track faq.id) {
          <div class="faq-item">
            <button 
              class="faq-question"
              [class.expanded]="expandedId() === faq.id"
              (click)="toggleExpand(faq.id)"
            >
              <span>{{ faq.question }}</span>
              <ng-icon 
                hlm 
                size="sm" 
                [name]="expandedId() === faq.id ? 'lucideChevronUp' : 'lucideChevronDown'" 
              />
            </button>
            
            @if (expandedId() === faq.id) {
              <div class="faq-answer">
                @for (line of getLines(faq.answer); track line) {
                  <p>{{ line }}</p>
                }
              </div>
            }
          </div>
        } @empty {
          <div class="no-results">
            <p>No se encontraron resultados para tu búsqueda.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .faq-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-search {
      display: flex;
      align-items: center;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 0 16px;
      margin-bottom: 1.5rem;
      height: 44px;
    }

    .search-icon {
      color: var(--muted-foreground);
      margin-right: 12px;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.9375rem;
      background: transparent;
    }

    .search-input::placeholder {
      color: var(--muted-foreground);
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 1.5rem;
    }

    .category-btn {
      font-size: 0.8125rem;
      padding: 6px 14px;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .faq-item {
      background: var(--surface-base);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: border-color 0.15s;
    }

    .faq-item:hover {
      border-color: var(--border-hover);
    }

    .faq-question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: transparent;
      border: none;
      font-size: 0.9375rem;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      gap: 12px;
      color: var(--foreground);
    }

    .faq-question.expanded {
      border-bottom: 1px solid var(--border);
    }

    .faq-answer {
      padding: 16px;
      background: var(--surface-raised);
    }

    .faq-answer p {
      font-size: 0.875rem;
      line-height: 1.7;
      color: var(--muted-foreground);
      margin: 0;
    }

    .faq-answer p + p {
      margin-top: 8px;
    }

    .no-results {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--muted-foreground);
    }
  `],
})
export class FaqListComponent {
  private readonly faqService = inject(FaqService);

  searchQuery = signal('');
  expandedId = signal<string | null>(null);

  selectedCategory = this.faqService.selectedCategory;

  displayedFaqs = computed(() => {
    const query = this.searchQuery().trim();
    if (query) {
      return this.faqService.search(query);
    }
    return this.faqService.filteredFaqs();
  });

  selectCategory(category: string) {
    this.faqService.setCategory(category);
    // Clear search when changing category
    this.searchQuery.set('');
  }

  clearFilter() {
    this.faqService.setCategory(null);
    this.searchQuery.set('');
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    // Clear category filter when searching
    if (value) {
      this.faqService.setCategory(null);
    }
  }

  toggleExpand(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  getLines(text: string): string[] {
    // Split by newlines or numbered steps like "1. " or "1) "
    return text
      .split(/\n(?=\d+\.\s|\d+\))/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
}