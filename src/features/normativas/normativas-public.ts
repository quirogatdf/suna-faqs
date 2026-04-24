import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileText, lucideExternalLink } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { RegulationsService } from '../../shared/services/regulations.service';

@Component({
  selector: 'app-normativas-public',
  imports: [...HlmCardImports, HlmIconDirective, NgIcon, DatePipe],
  providers: [provideIcons({ lucideFileText, lucideExternalLink })],
  template: `
    <div class="container">
      <h1 class="title">Normativas</h1>
      <p class="subtitle">
        Accedé a los instrumentos legales vigentes del sistema
      </p>

      <div class="grid">
        @for (reg of regulations(); track reg.id) {
          <a [href]="reg.pdfUrl" target="_blank" class="card-link">
            <hlm-card class="card px-4 py-2">
              <div hlmCardHeader>
                <ng-icon hlm size="2xl" name="lucideFileText" class="icon" />
                <h3 hlmCardTitle class="name">{{ reg.name }}</h3>
                <p hlmCardDescription class="date">
                  {{ reg.publicationDate | date: 'dd/MM/yyyy' }}
                </p>
              </div>
              <div hlmCardContent>
                <div class="action pb-4">
                  <ng-icon hlm size="sm" name="lucideExternalLink" />
                  <span>Ver</span>
                </div>
              </div>
            </hlm-card>
          </a>
        } @empty {
          <p class="empty">No hay normativas disponibles.</p>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      .title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      .subtitle {
        color: #6b7280;
        margin-bottom: 2rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
      @media (max-width: 1024px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 480px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      .card {
        width: 100%;
        height: 100%;
      }
      .icon {
        color: #374151;
        margin-bottom: 0.5rem;
      }
      .name {
        margin: 0.25rem 0;
      }
      .date {
        margin: 0;
      }
      .action {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.5rem;
      }
      .empty {
        text-align: center;
        padding: 2rem;
        color: #6b7280;
      }
    `,
  ],
})
export class NormativasPublic {
  private regulationsService = inject(RegulationsService);
  regulations = this.regulationsService.regulations;
}
