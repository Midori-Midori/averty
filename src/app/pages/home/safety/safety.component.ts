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
      highlight: '36,640+',
      title: 'Fatalities',
      description: 'Traffic crashes caused more than 36,000 deaths in the United States in 2025.',
      delayClass: '',
      colorClass: 'color-red'
    },
    {
      highlight: '5.9 Million',
      title: 'Accidents',
      description: 'Nearly 5.9 million traffic accidents are reported every year in the U.S.',
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
      highlight: 'Leading Cause',
      title: 'Among Young People',
      description: 'Motor vehicle crashes are one of the leading causes of death among children, teenagers, and young adults in the United States.',
      delayClass: 'delay-2',
      colorClass: 'color-blue'
    }
  ]);
}
