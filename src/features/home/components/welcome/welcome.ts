import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSparkles,
  lucideX,
  lucideChevronLeft,
  lucideChevronRight,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NewsService } from '../../../../shared/services/news.service';

@Component({
  selector: 'app-welcome',
  imports: [DatePipe, HlmButtonDirective, HlmIconDirective, NgIcon],
  providers: [
    provideIcons({
      lucideSparkles,
      lucideX,
      lucideChevronLeft,
      lucideChevronRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!dismissed()) {
      <div class="popup-overlay" (click)="closePopup()">
        <div class="popup-card" (click)="$event.stopPropagation()">
          <!-- Navigation Arrows -->
          <button hlmBtn variant="ghost" class="nav-btn prev" (click)="prev()">
            <ng-icon hlm name="lucideChevronLeft" />
          </button>
          <button hlmBtn variant="ghost" class="nav-btn next" (click)="next()">
            <ng-icon hlm name="lucideChevronRight" />
          </button>

          <!-- Main Content -->
          <div class="popup-main">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold mb-2">
                {{ currentNews().title }}
              </h1>
              <p class="text-muted-foreground text-sm max-w-xs mx-auto">
                {{ currentNews().description }}
              </p>
            </div>

            <!-- Pagination Dots -->
            <div class="pagination-dots">
              @for (item of newsService.news(); track item.id; let i = $index) {
                <span class="dot" [class.active]="i === currentIndex()"></span>
              }
            </div>
          </div>

          <!-- Footer Action -->
          <div class="popup-footer">
            <button hlmBtn class="btn-entendido" (click)="closePopup()">
              Entendido
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        animation: fadeIn 0.2s ease-out;
      }

      .popup-card {
        background: white;
        border-radius: 1rem;
        position: relative;
        width: 90%;
        max-width: 450px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        animation: scaleIn 0.3s ease-out;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .popup-main {
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: transparent !important;
        color: var(--muted-foreground) !important;
        transition: all 0.2s;
      }

      .nav-btn:hover {
        color: var(--primary) !important;
        background: rgba(0, 0, 0, 0.05) !important;
      }

      .prev {
        left: 0;
        border-radius: 0 8px 8px 0;
      }
      .next {
        right: 0;
        border-radius: 8px 0 0 8px;
      }

      .pagination-dots {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin-top: 1.5rem;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ddd;
        transition: all 0.2s;
      }

      .dot.active {
        background: var(--primary);
        width: 16px;
        border-radius: 3px;
      }

      .popup-footer {
        border-top: 1px solid var(--border);
        background: #f9fafb;
      }

      .btn-entendido {
        width: 100%;
        padding: 1rem;
        background: var(--primary) !important;
        color: white !important;
        font-weight: 600;
        border: none !important;
        border-radius: 0 !important;
        cursor: pointer;
        transition: filter 0.2s;
      }

      .btn-entendido:hover {
        filter: brightness(0.9);
      }

      .popup-footer {
        border-top: 1px solid var(--border);
        background: #f9fafb;
        margin: 0 -1px -1px -1px;
        width: calc(100% + 2px);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ],
})
export class WelcomeComponent {
  readonly newsService = inject(NewsService);

  currentIndex = signal(0);
  dismissed = signal(false);

  currentNews = computed(() => {
    const news = this.newsService.news();
    return news[this.currentIndex()] || news[0];
  });

  next() {
    this.currentIndex.update((i) => (i + 1) % this.newsService.news().length);
  }

  prev() {
    this.currentIndex.update(
      (i) =>
        (i - 1 + this.newsService.news().length) %
        this.newsService.news().length,
    );
  }

  closePopup() {
    this.dismissed.set(true);
  }
}
