import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePlus,
  lucidePencil,
  lucideTrash2,
  lucideX,
  lucideCheck,
  lucideFileText,
  lucideExternalLink,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmDialogModule, HlmDialogService } from '@spartan-ng/helm/dialog';
import {
  RegulationsService,
  Regulation,
} from '../../../shared/services/regulations.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-regulations',
  imports: [
    FormsModule,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
    DatePipe,
    HlmDialogModule,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucidePencil,
      lucideTrash2,
      lucideX,
      lucideCheck,
      lucideFileText,
      lucideExternalLink,
    }),
  ],
  templateUrl: './regulations.html',
  styleUrl: './regulations.css',
})
export class Regulations {
  private regulationsService = inject(RegulationsService);
  private dialogService = inject(HlmDialogService);

  regulationsList = this.regulationsService.regulations;
  showForm = signal(false);
  editingId = signal<string | null>(null);
  selectedRegulation = signal<Regulation | null>(null);

  formData = signal<Partial<Regulation>>({
    name: '',
    publicationDate: new Date().toISOString().split('T')[0],
    pdfUrl: '',
  });

  openForm(regulation?: Regulation) {
    if (regulation) {
      this.formData.set({ ...regulation });
      this.editingId.set(regulation.id);
    } else {
      this.formData.set({
        name: '',
        publicationDate: new Date().toISOString().split('T')[0],
        pdfUrl: '',
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
    if (!data.name || !data.publicationDate || !data.pdfUrl) return;

    if (this.editingId()) {
      this.regulationsService.update(this.editingId()!, data);
    } else {
      this.regulationsService.add(data as Omit<Regulation, 'id'>);
    }
    this.closeForm();
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de eliminar esta normativa?')) {
      this.regulationsService.delete(id);
    }
  }

  openPdf(regulation: Regulation) {
    window.open(regulation.pdfUrl, '_blank');
  }
}