import { Component, signal } from '@angular/core';
import { Step } from '../../../core/interfaces/step.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { CardComponent } from '../../../shared/card/card.component';
import { LucideAngularModule, CarFront, Zap, ShieldAlert, ShieldCheck } from 'lucide-angular';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    RevealDirective, 
    CardComponent, 
    LucideAngularModule
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  steps = signal<any[]>([
    {
      number: '01',
      title: 'Vehicle Data',
      description: 'Collects real time vehicle information',
      bubble: 'Vehicle traveling at 75 mph',
      colorClass: 'color-blue',
      iconObj: CarFront,
      delayClass: ''
    },
    {
      number: '02',
      title: 'Detection',
      description: 'Collects real time vehicle information',
      bubble: 'Traffic detected',
      colorClass: 'color-yellow',
      iconObj: Zap,
      delayClass: 'delay-1'
    },
    {
      number: '03',
      title: 'Alert',
      description: 'Collects real time vehicle information',
      bubble: 'Warnings issued instantly',
      colorClass: 'color-orange',
      iconObj: ShieldAlert,
      delayClass: 'delay-15'
    },
    {
      number: '04',
      title: 'Prevention',
      description: 'Collects real time vehicle information',
      bubble: 'Collision avoided',
      colorClass: 'color-green',
      iconObj: ShieldCheck,
      delayClass: 'delay-2'
    }
  ]);
}
