import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface SafetyFact {
  highlight: string;
  title: string;
  description: string;
  delayClass: string;
  colorClass: string;
}

@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [CommonModule, CardComponent, RevealDirective],
  templateUrl: './safety.component.html',
  styleUrl: './safety.component.scss'
})
export class SafetyComponent {
  facts = signal<SafetyFact[]>([
    {
      highlight: '11,288',
      title: 'Speed-Related Deaths',
      description: 'Speeding was a contributing factor in 29% of all traffic fatalities in 2024, remaining one of the most critical safety concerns on U.S. roads.',
      delayClass: '',
      colorClass: 'color-red'
    },
    {
      highlight: '1 in 4 Drivers',
      title: 'Aggressive Driving',
      description: 'Dangerous behaviors such as tailgating, speeding, and unsafe lane changes continue to contribute to thousands of crashes and fatalities every year.',
      delayClass: 'delay-1',
      colorClass: 'color-orange'
    },
    {
      highlight: '$340 Billion',
      title: 'Economic Impact',
      description: 'Traffic crashes generate approximately $340 billion in societal costs, including medical expenses, lost productivity, and property damage.',
      delayClass: 'delay-15',
      colorClass: 'color-yellow'
    },
    {
      highlight: '745,000+',
      title: 'Weather-Related Crashes',
      description: 'Nearly 745,000 crashes every year occur under adverse weather conditions such as rain, fog, snow, and strong winds. These conditions contribute to over 3,800 deaths annually.',
      delayClass: 'delay-2',
      colorClass: 'color-blue'
    }
  ]);
}
