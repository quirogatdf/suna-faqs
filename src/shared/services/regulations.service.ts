import { Injectable, signal } from '@angular/core';

export interface Regulation {
  id: string;
  name: string;
  publicationDate: string;
  pdfUrl: string;
}

@Injectable({ providedIn: 'root' })
export class RegulationsService {
  readonly regulations = signal<Regulation[]>([
    {
      id: '1',
      name: 'Decreto 241/2026 - Régimen de Cambios de Función',
      publicationDate: '2026-04-10',
      pdfUrl: '/assets/normativas/decreto-241-2026.pdf',
    },
    {
      id: '2',
      name: 'Resolución 125/2026 - Procedimientos Administrativos',
      publicationDate: '2026-03-15',
      pdfUrl: '/assets/normativas/resolucion-125-2026.pdf',
    },
    {
      id: '3',
      name: 'Ley 27563 - Marco Regulatorio Laboral',
      publicationDate: '2026-01-20',
      pdfUrl: '/assets/normativas/ley-27563.pdf',
    },
  ]);

  add(regulation: Omit<Regulation, 'id'>): void {
    const id = crypto.randomUUID();
    this.regulations.update((list) => [{ ...regulation, id }, ...list]);
  }

  update(id: string, data: Partial<Regulation>): void {
    this.regulations.update((list) =>
      list.map((r) => (r.id === id ? { ...r, ...data } : r)),
    );
  }

  delete(id: string): void {
    this.regulations.update((list) => list.filter((r) => r.id !== id));
  }

  getById(id: string): Regulation | undefined {
    return this.regulations().find((r) => r.id === id);
  }
}