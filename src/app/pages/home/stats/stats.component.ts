import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Stat } from '../../../core/interfaces/stat.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, TriangleAlert, Zap, MapPinned, Shield } from 'lucide-angular';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private swiperInstance: Swiper | null = null;

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiperIfNeeded();
      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
      this.destroySwiper();
    }
  }

  private onResize = () => {
    this.initSwiperIfNeeded();
  };

  private initSwiperIfNeeded() {
    if (!isPlatformBrowser(this.platformId)) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (!this.swiperInstance) {
        const container = this.el.nativeElement.querySelector('.swiper');
        if (container) {
          // Wait for GSAP reveal animations to finish before initializing Swiper
          setTimeout(() => {
            this.swiperInstance = new Swiper(container, {
              modules: [Pagination],
              slidesPerView: 1,
              centeredSlides: true,
              spaceBetween: 30,
              initialSlide: 0,
              grabCursor: true,
              pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
              }
            });
          }, 300);
        }
      }
    } else {
      this.destroySwiper();
    }
  }

  private destroySwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
    }
  }
}

