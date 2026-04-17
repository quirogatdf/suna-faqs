import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { WelcomeComponent } from './components/welcome/welcome';
import { HeroSearchComponent } from './components/hero-search/hero-search';
import { FaqListComponent } from './components/faq-list/faq-list';

@Component({
  selector: 'app-home',
  imports: [Sidebar, WelcomeComponent, HeroSearchComponent, FaqListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
