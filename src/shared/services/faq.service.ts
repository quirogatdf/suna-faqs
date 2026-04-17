import { Injectable, signal, computed } from '@angular/core';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string; // 'agente' | 'equipo' | 'general'
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class FaqService {
  // FAQ data - hardcoded por ahora, después viene de API
  readonly faqs = signal<FAQ[]>([
    // === ROL DE AGENTE ===

    {
      id: 'ag-002',
      question: '¿Cómo veo el estado de mis solicitudes?',
      answer:
        'En la sección "Mis tickets" vas a ver todos tus tickets con su estado: Pendiente, En proceso, Resuelto o Cerrado.',
      category: 'agente',
      tags: ['ticket', 'estado', 'consultar'],
    },
    {
      id: 'ag-003',
      question: '¿Puedo reasignar un ticket a otro agente?',
      answer:
        'No, los tickets solo pueden ser reasignados por supervisores. Si necesitás reasignar un ticket, contactá a tu supervisor.',
      category: 'agente',
      tags: ['ticket', 'reasignar'],
    },
    {
      id: 'ag-004',
      question: '¿Cuál es el tiempo máximo de respuesta?',
      answer:
        'El tiempo de respuesta depende de la prioridad del ticket: Alta (2h), Media (24h), Baja (72h).',
      category: 'agente',
      tags: ['sla', 'tiempo', 'respuesta'],
    },

    // === ROL DE EQUIPO DE GESTIÓN ===
    {
      id: 'eq-001',
      question: '¿Cómo reasigno un ticket a otro agente?',
      answer:
        'En el detalle del ticket, usá el botón "Reasignar" y seleccioná el novo agente del listado.',
      category: 'equipo',
      tags: ['ticket', 'reasignar', 'agente'],
    },
    {
      id: 'eq-002',
      question: '¿Cómo改变了 la prioridad de un ticket?',
      answer:
        'En el detalle del ticket, podés cambiar la prioridad en el campo correspondiente. Solo supervisores pueden cambiar a "Crítica".',
      category: 'equipo',
      tags: ['ticket', 'prioridad', 'cambiar'],
    },
    {
      id: 'eq-003',
      question: '¿Cómo veo los tickets de mi equipo?',
      answer:
        'En "Panel de equipo" vas a encontrar todos los tickets asignados a tu equipo con filtros por agente, estado y fecha.',
      category: 'equipo',
      tags: ['ticket', 'equipo', 'panel'],
    },
    {
      id: 'eq-004',
      question: '¿Cómo genero reportes?',
      answer:
        'En la sección "Reportes" podés generar reportes de tickets por período, agente, categoría y más.',
      category: 'equipo',
      tags: ['reporte', ' estadisticas'],
    },

    // === GENERAL (TODOS LOS ROLES) ===
    {
      id: 'gn-001',
      question: '¿Cómo recupero mi contraseña?',
      answer: `En la pantalla de login, hacé click en "¿Olvidaste tu contraseña?" y seguí las instruccionesenviadas a tu email. El link de recuperación expira en 24 horas.`,
      category: 'general',
      tags: ['contraseña', 'reset', 'password'],
    },
    {
      id: 'gn-002',
      question: '¿Cómo generar un ticket por problemas en el sistema?',
      answer: `Para reportar problemas en el sistema, segui estos pasos:
1. Ingresá a https://ayuda.aif.gob.ar/
2. Iniciá sesión con tu usuario y contraseña
3. Seleccioná "Nueva solicitud" > "Reporte de incidente"
4. Completá los campos:
   - Título: Descripción breve del problema
   - Categoría: "Incidente técnico"
   - Descripción: Pasos para reproducir el error
   - Adjuntá capturas si es necesario
5. Enviá y guardá el número de ticket`,
      category: 'general',
      tags: ['ticket', 'sistema', 'incidente', 'error'],
    },
    {
      id: 'gn-003',
      question: '¿Cómo dar de alta/baja/modificación un puesto?',
      answer: `Para gestionar puestos laborales, seguí estos pasos:
1. Ingresá a https://ayuda.aif.gob.ar/
2. Iniciá sesión como supervisor
3. Vas a "Administración" > "Puestos"
4. Para DAR DE ALTA un puesto:
   - Click en "Nuevo puesto"
   - Completá: Código, Denominación, Área, Planta
   - Guardá
5. Para MODIFICAR un puesto:
   - Buscá el puesto existente
   - Editá los campos necesarios
   - Guardá cambios
6. Para DAR DE BAJA un puesto:
   - Seleccioná el puesto
   - Click en "Dar de baja"
   - Confirmá la acción`,
      category: 'general',
      tags: ['puesto', 'alta', 'baja', 'modificación'],
    },
    {
      id: 'gn-004',
      question:
        '¿Cómo corregir una licencia médica o realizar una consulta/reclamo en el sistema SUNA?',
      answer: `Para correcciones, consultas o reclamos en el sistema SUNA (Ministerio de Educación), seguí estos pasos:
1. Ingresá a https://ayuda.aif.gob.ar/
2. Iniciá sesión con tu usuario y contraseña
3. Seleccioná "Nueva solicitud" > "Consulta/Reclamo"
4. En el despliegue "Motivos SUNA" verificá que esté seleccionada la opción correcta:
   - "Licencias médicas" (para corregir licencias)
   - "Errores de sistema" (para fallas técnicas)
   - "Incorporación/Baja de agentes" (para trámites de personal)
   -Otra spezificá el motivo en la descripción
5. Completá los campos:
   - Título: Descripción breve
   - Descripción: Detallá el problema o corrección necesaria
   - Adjuntá documentación de respaldo si es necesario
6. Enviá la solicitud
7. **MUY IMPORTANTE: Anotá el número de ticket generado** (lo necesitás para hacer seguimiento)

Para corregir una licencia ya registrada:
- Vas a "Mis licencias" > Editar la licencia
- Modificá los datos necesarias
- Guardá los cambios
- Si ya estaba aprobada, solicitá reconsideración al supervisor`,
      category: 'general',
      tags: ['licencia', 'corregir', 'consulta', 'reclamo', 'suna', 'ticket'],
    },
    {
      id: 'gn-005',
      question: '¿Cómo contacto al soporte técnico?',
      answer: `Podés contactar al soporte por:
- Email: soporte@suna.com
- Teléfono: 0800-555-SUNA
- Desde el sistema: "Ayuda" > "Contactar soporte"
- Horario: Lunes a viernes de 8h a 20h, sábados de 9h a 13h`,
      category: 'general',
      tags: ['soporte', 'contacto', 'ayuda'],
    },
    {
      id: 'gn-006',
      question: '¿Dónde veo las políticas de privacidad?',
      answer:
        'Las políticas de privacidad están disponibles en el pie de página, sección "Privacidad".',
      category: 'general',
      tags: ['privacidad', 'políticas', 'legal'],
    },
    {
      id: 'gn-002',
      question: '¿Cómo contacto al soporte técnico?',
      answer:
        'Podés contactar al soporte por: Email (soporte@suna.com), Teléfono (0800-555-SUNA), o creando un ticket.',
      category: 'general',
      tags: ['soporte', 'contacto', 'ayuda'],
    },
    {
      id: 'gn-003',
      question: '¿Cuáles son los horarios de atención?',
      answer:
        'El sistema está disponible 24/7. El equipo de soporte atender: Lunes a viernes de 8h a 20h, sábados de 9h a 13h.',
      category: 'general',
      tags: ['horario', 'atencion', 'soporte'],
    },
    {
      id: 'gn-004',
      question: '¿Dónde veo las políticas de privacidad?',
      answer:
        'Las políticas de privacidad están disponibles en el pie de página, sección "Privacidad" o haciendo click aquí.',
      category: 'general',
      tags: ['privacidad', 'políticas', 'legal'],
    },
  ]);

  // Categoría seleccionada para filtrar
  readonly selectedCategory = signal<string | null>(null);

  // FAQ filtradas por categoría
  readonly filteredFaqs = computed(() => {
    const category = this.selectedCategory();
    const all = this.faqs();

    if (!category) return all;
    return all.filter((faq) => faq.category === category);
  });

  // Buscar en FAQs
  search(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return this.faqs();

    return this.faqs().filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  // Setter para categoría
  setCategory(category: string | null) {
    this.selectedCategory.set(category);
  }
}

