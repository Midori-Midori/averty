import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent {
  activeTab = signal<string>('objectives');

  setActiveTab(tabName: string) {
    this.activeTab.set(tabName);
  }
}
