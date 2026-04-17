import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-hero-search',
  imports: [HlmButtonDirective, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideSearch })],
  template: `
    <div class="hero-container">
      <!-- Buscador estilo Google -->
      <div class="search-wrapper">
        <div class="search-box">
          <ng-icon hlm size="lg" name="lucideSearch" class="search-icon" />
          <input 
            type="text" 
            class="search-input" 
            placeholder="¿Qué necesitas saber?"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
        </div>
        <button hlmBtn class="search-btn">
          Buscar
        </button>
      </div>
      
      <!-- Temas más buscados -->
      <div class="topics-section">
        <h2 class="topics-title">Temas más buscados</h2>
        <div class="topics-grid">
          @for (topic of topTopics; track topic) {
            <button hlmBtn variant="outline" class="topic-btn" (click)="query.set(topic)">
              {{ topic }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .search-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 2rem;
    }

    @media (min-width: 640px) {
      .search-wrapper {
        flex-direction: row;
        align-items: center;
      }
    }

    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      background: white;
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 0 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: box-shadow 0.2s, border-color 0.2s;
      height: 48px;
      width: 100%;
    }

    @media (min-width: 640px) {
      .search-box {
        height: 52px;
        padding: 0 20px;
      }
    }

    .search-box:focus-within {
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      border-color: var(--primary);
    }

    .search-icon {
      color: var(--muted-foreground);
      margin-right: 10px;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      background: transparent;
      min-width: 0;
    }

    @media (min-width: 640px) {
      .search-input {
        font-size: 1.125rem;
      }
    }

    .search-input::placeholder {
      color: var(--muted-foreground);
    }

    .search-btn {
      width: 100%;
      padding: 12px 24px;
      border-radius: 9999px;
      background: var(--primary) !important;
      color: white !important;
      font-weight: 600;
    }

    @media (min-width: 640px) {
      .search-btn {
        width: auto;
      }
    }

    .topics-section {
      text-align: center;
    }

    .topics-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--muted-foreground);
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (min-width: 640px) {
      .topics-title {
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
    }

    .topics-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }

    @media (min-width: 640px) {
      .topics-grid {
        gap: 10px;
      }
    }

    .topic-btn {
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.75rem;
      background: var(--surface-base) !important;
      border: 1px solid var(--border) !important;
    }

    @media (min-width: 640px) {
      .topic-btn {
        padding: 8px 20px;
        font-size: 0.875rem;
      }
    }

    .topic-btn:hover {
      border-color: var(--primary) !important;
      background: var(--surface-raised) !important;
    }
  `],
})
export class HeroSearchComponent {
  query = signal('');
  
  topTopics = [
    'Cómo crear un ticket',
    'Cambiar contraseña',
    'Ver mis solicitudes',
    'Contactar soporte',
    'Políticas de privacidad',
    'Horarios de atención',
  ];
}