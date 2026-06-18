import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Screen } from '../../../core/interfaces/screen.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, Heart, TriangleAlert, Activity, CarFront } from 'lucide-angular';
import Swiper from 'swiper';
import { Pagination, EffectCoverflow } from 'swiper/modules';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.scss'
})
export class ScreensComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private swiperInstance: Swiper | null = null;

  carIcon = CarFront;

  screens = signal<Screen[]>([
    {
      label: 'NORMAL',
      colorClass: 'color-green',
      icon: Heart,
      mockup: 'assets/mockups/mockup5.png',
      desc: 'Traffic Flowing Normally',
      delayClass: 'delay-1'
    },
    {
      label: 'CAUTION',
      colorClass: 'color-caution',
      icon: TriangleAlert,
      mockup: 'assets/mockups/mockup4.png',
      desc: 'Traffic Slowing Ahead',
      delayClass: 'delay-1'
    },
    {
      label: 'WARNING',
      colorClass: 'color-orange',
      icon: TriangleAlert,
      mockup: 'assets/mockups/mockup3.png',
      desc: 'Sudden Speed Reduction',
      delayClass: 'delay-2'
    },
    {
      label: 'DANGER',
      colorClass: 'color-red',
      icon: Activity,
      mockup: 'assets/mockups/mockup2.png',
      desc: 'Incident Detected — Reduce Speed Immediately',
      delayClass: 'delay-3'
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
              modules: [Pagination, EffectCoverflow],
              effect: 'coverflow',
              slidesPerView: 'auto',
              centeredSlides: true,
              grabCursor: true,
              coverflowEffect: {
                rotate: 25,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false
              },
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
