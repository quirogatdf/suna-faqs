import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucidePencil, lucideTrash2, lucideX, lucideCheck, lucideCircleAlert } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NewsService, News } from '../../../shared/services/news.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-config',
  imports: [FormsModule, HlmButtonDirective, HlmIconDirective, NgIcon, DatePipe],
  providers: [provideIcons({ lucidePlus, lucidePencil, lucideTrash2, lucideX, lucideCheck, lucideCircleAlert })],
  templateUrl: './news-config.html',
  styleUrl: './news-config.css',
})
export class NewsConfig {
  private newsService = inject(NewsService);

  newsList = this.newsService.news;
  editingId = signal<string | null>(null);
  showForm = signal(false);

  formData = signal<Partial<News>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    important: false,
  });

  openForm(news?: News) {
    if (news) {
      this.formData.set({ ...news });
      this.editingId.set(news.id);
    } else {
      this.formData.set({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        important: false,
      });
      this.editingId.set(null);
    }
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  save() {
    const data = this.formData();
    if (!data.title || !data.description || !data.date) return;

    if (this.editingId()) {
      this.newsService.update(this.editingId()!, data);
    } else {
      this.newsService.add(data as Omit<News, 'id'>);
    }
    this.closeForm();
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      this.newsService.delete(id);
    }
  }
}