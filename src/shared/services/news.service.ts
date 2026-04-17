import { Injectable, signal, computed } from '@angular/core';

export interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  readonly news = signal<News[]>([
    {
      id: '1',
      title: 'Nueva normativa para Cambios de función',
      description:
        'Se informa que a partir del 10 de abril de 2026, los cambios de función deberán encuadrarse dentro de la normativa vigente. Para más detalles, consulte el documento adjunto.',
      date: '2026-04-10',
      important: true,
    },
    {
      id: '2',
      title: 'Mejoras en el buscador',
      description:
        'Ahora podés buscar en todas las categorías desde un solo lugar.',
      date: '2026-04-08',
      important: false,
    },
  ]);

  readonly loading = signal(false);

  readonly importantNews = computed(() =>
    this.news().filter((n) => n.important),
  );

  add(news: Omit<News, 'id'>): void {
    const id = crypto.randomUUID();
    this.news.update((list) => [{ ...news, id }, ...list]);
  }

  update(id: string, data: Partial<News>): void {
    this.news.update((list) =>
      list.map((n) => (n.id === id ? { ...n, ...data } : n)),
    );
  }

  delete(id: string): void {
    this.news.update((list) => list.filter((n) => n.id !== id));
  }

  getById(id: string): News | undefined {
    return this.news().find((n) => n.id === id);
  }
}
