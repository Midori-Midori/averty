import { Component, signal, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stat } from '../../../core/interfaces/stat.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, TriangleAlert, Zap, MapPinned, Shield } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements AfterViewInit {
  private el = inject(ElementRef);

  stats = signal<Stat[]>([
    { 
      value: '1,200', 
      unit: '', 
      label: 'Accidentes detectados', 
      description: 'Incidentes viales identificados automáticamente.', 
      icon: MapPinned, 
      progress: 85, 
      colorClass: 'color-red' 
    },
    { 
      value: '<1.8', 
      unit: 's', 
      label: 'Tiempo de respuesta', 
      description: 'Alertas transmitidas en milisegundos.', 
      icon: Zap, 
      progress: 95, 
      highlighted: true, 
      colorClass: 'color-blue' 
    },
    { 
      value: '35,000', 
      unit: '', 
      label: 'Conductores protegidos', 
      description: 'Usuarios activos en autopistas y carreteras.', 
      icon: Shield, 
      progress: 100, 
      colorClass: 'color-orange' 
    },
    { 
      value: '89', 
      unit: '%', 
      label: 'Efectividad de alertas', 
      description: 'Precisión en la prevención de accidentes.', 
      icon: TriangleAlert, 
      progress: 89, 
      colorClass: 'color-green' 
    }
  ]);

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const counters = this.el.nativeElement.querySelectorAll('.stat-counter');
      counters.forEach((counter: any) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
        const useComma = counter.getAttribute('data-format') === 'comma';

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            let valueStr = obj.val.toFixed(decimals);
            if (useComma) {
              valueStr = Math.floor(obj.val).toLocaleString('en-US');
            }
            counter.textContent = `${prefix}${valueStr}${suffix}`;
          }
        });
      });
    }
  }
}

