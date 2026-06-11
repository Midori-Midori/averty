import { Component, signal } from '@angular/core';
import { Step } from '../../../core/interfaces/step.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { BadgeComponent } from '../../../shared/badge/badge.component';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RevealDirective, BadgeComponent, CardComponent],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  steps = signal<Step[]>([
    {
      number: '01',
      title: 'Vehicle Data',
      description: 'Collects real-time vehicle information from sensors and GPS.',
      bubble: 'Vehicle traveling at 75 mph',
      colorClass: 'color-blue',
      icon: 'data',
      delayClass: ''
    },
    {
      number: '02',
      title: 'Detection',
      description: 'AI detects sudden traffic slowdowns and potential hazards ahead.',
      bubble: 'Traffic slowdown detected',
      colorClass: 'color-yellow',
      icon: 'search',
      delayClass: 'delay-1'
    },
    {
      number: '03',
      title: 'Alert',
      description: 'Instant warning pushed to all nearby drivers within 1.2 miles.',
      bubble: 'Warning issued instantly',
      colorClass: 'color-orange',
      icon: 'warning',
      delayClass: 'delay-15'
    },
    {
      number: '04',
      title: 'Prevention',
      description: 'Drivers reduce speed in time. Collision avoided.',
      bubble: 'Collision avoided',
      colorClass: 'color-green',
      icon: 'shield',
      delayClass: 'delay-2'
    }
  ]);
}

