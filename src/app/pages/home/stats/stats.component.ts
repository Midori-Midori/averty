import { Component, signal, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stat } from '../../../core/interfaces/stat.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, TriangleAlert, Zap, MapPinned, Shield, Clock, CarFront, ChevronLeft, ChevronRight } from 'lucide-angular';
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

  readonly mapPinnedIcon = MapPinned;
  readonly clockIcon = Clock;
  readonly carFrontIcon = CarFront;
  readonly alertIcon = TriangleAlert;
  readonly chevronLeftIcon = ChevronLeft;
  readonly chevronRightIcon = ChevronRight;

  scrollStats(direction: 'left' | 'right') {
    const grid = this.el.nativeElement.querySelector('.stats-grid');
    if (grid) {
      const card = grid.querySelector('.stat-card');
      const cardWidth = card ? card.clientWidth : 800;
      const scrollAmount = direction === 'left' ? -(cardWidth + 48) : (cardWidth + 48);
      grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  stats = signal<Stat[]>([
    { 
      value: '500+', 
      unit: '', 
      label: 'Alerts Processed', 
      description: 'Real-time notifications sent to drivers.', 
      icon: MapPinned, 
      progress: 100, 
      colorClass: 'color-red' 
    },
    { 
      value: '24/7', 
      unit: '', 
      label: 'Monitoring', 
      description: 'Continuous roadway safety scanning.', 
      icon: Zap, 
      progress: 100, 
      colorClass: 'color-blue' 
    },
    { 
      value: '50+', 
      unit: '', 
      label: 'Road Incidents Tracked', 
      description: 'Freeway accidents and sudden slow-downs detected.', 
      icon: Shield, 
      progress: 100, 
      colorClass: 'color-orange' 
    },
    { 
      value: '98', 
      unit: '%', 
      label: 'Detection Accuracy', 
      description: 'Precision in identifying dangerous highway hazards.', 
      icon: TriangleAlert, 
      progress: 98, 
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

