import { Directive, input, computed, signal } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Directive({
	selector: 'hlm-card-content',
	host: {
		'data-slot': 'card-content',
	},
})
export class HlmCardContent {
	constructor() {
		hlm('px-6 group-data-[size=sm]/card:px-4');
	}
}

@Directive({
	selector: 'hlm-card-description',
	host: {
		'data-slot': 'card-description',
	},
})
export class HlmCardDescription {
	constructor() {
		hlm('text-muted-foreground text-sm');
	}
}

@Directive({
	selector: 'hlm-card-action',
	host: {
		'data-slot': 'card-action',
	},
})
export class HlmCardAction {
	constructor() {
		hlm('col-start-2 row-span-2 row-start-1 self-start justify-self-end');
	}
}

@Directive({
	selector: 'hlm-card-footer',
	host: {
		'data-slot': 'card-footer',
	},
})
export class HlmCardFooter {
	constructor() {
		hlm('rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center');
	}
}

@Directive({
	selector: 'hlm-card-header',
	host: {
		'data-slot': 'card-header',
	},
})
export class HlmCardHeader {
	constructor() {
		hlm(
			'gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
		);
	}
}

@Directive({
	selector: 'hlm-card-title',
	host: {
		'data-slot': 'card-title',
	},
})
export class HlmCardTitle {
	constructor() {
		hlm('text-base leading-normal font-medium group-data-[size=sm]/card:text-sm');
	}
}

@Directive({
	selector: 'hlm-card',
	host: {
		'[class]': '_computedClass()',
		'[attr.data-size]': 'size()',
	},
})
export class HlmCard {
	private readonly _additionalClasses = signal<ClassValue>('');

	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	public readonly size = input<'sm' | 'default'>('default');

	protected readonly _computedClass = computed(() =>
		hlm(
			'bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm shadow-xs ring-1 ring-black/10 group/card flex flex-col',
			this.userClass(),
			this._additionalClasses(),
		),
	);

	setClass(classes: string): void {
		this._additionalClasses.set(classes);
	}
}

export const HlmCardImports = [
	HlmCard,
	HlmCardAction,
	HlmCardContent,
	HlmCardDescription,
	HlmCardFooter,
	HlmCardHeader,
	HlmCardTitle,
] as const;