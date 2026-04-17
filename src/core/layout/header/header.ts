import { Component } from '@angular/core';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSettings } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [HlmIconDirective, NgIcon, RouterLink],
  providers: [provideIcons({ lucideSettings })],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
