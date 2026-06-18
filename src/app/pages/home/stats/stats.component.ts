import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stat } from '../../../core/interfaces/stat.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, TriangleAlert, Zap, MapPinned, Shield } from 'lucide-angular';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  stats = signal<Stat[]>([
    { 
      value: '43', 
      unit: '%', 
      label: 'Rear-end collisions', 
      description: 'Leading cause on freeways', 
      icon: TriangleAlert, 
      progress: 43, 
      colorClass: 'color-red' 
    },
    { 
      value: '<2', 
      unit: 's', 
      label: 'Alert delivery', 
      description: 'Real-time warning system', 
      icon: Zap, 
      progress: 90, 
      highlighted: true, 
      colorClass: 'color-blue' 
    },
    { 
      value: '1.2', 
      unit: 'mi', 
      label: 'Warning distance', 
      description: 'Early detection range', 
      icon: MapPinned, 
      progress: 60, 
      colorClass: 'color-orange' 
    },
    { 
      value: '4', 
      unit: 'x', 
      label: 'Risk levels', 
      description: 'Normal → Danger', 
      icon: Shield, 
      progress: 100, 
      colorClass: 'color-green' 
    }
  ]);
}
