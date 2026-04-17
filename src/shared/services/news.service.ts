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
  // Señal con las últimas novedades
  readonly news = signal<News[]>([
    {
      id: '1',
      title: 'Nueva sección de FAQs',
      description: 'Agregamos una nueva categoría de preguntas frecuentes sobre pricing y planes.',
      date: '2026-04-10',
      important: true,
    },
    {
      id: '2',
      title: 'Mejoras en el buscador',
      description: 'Ahora podés buscar en todas las categorías desde un solo lugar.',
      date: '2026-04-08',
      important: false,
    },
    {
      id: '3',
      title: 'Nouveau FAQ',
      description: 'We added a new FAQ section in French.',
      date: '2026-04-05',
      important: false,
    },
  ]);

  readonly loading = signal(false);

  // Маркер: filtrar solo las importantes
  readonly importantNews = computed(() =>
    this.news().filter((n) => n.important)
  );
}