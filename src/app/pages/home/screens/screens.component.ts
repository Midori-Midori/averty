import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Screen } from '../../../core/interfaces/screen.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.scss'
})
export class ScreensComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private swiperInstance: Swiper | null = null;

  screens = signal<Screen[]>([
    {
      label: 'NORMAL',
      colorClass: 'color-green',
      mockup: 'assets/mockups/mockup5.png',
      desc: 'Traffic Flowing Normally',
      delayClass: 'delay-1'
    },
    {
      label: 'CAUTION',
      colorClass: 'color-caution',
      mockup: 'assets/mockups/mockup4.png',
      desc: 'Traffic Slowing Ahead',
      delayClass: 'delay-1'
    },
    {
      label: 'WARNING',
      colorClass: 'color-orange',
      mockup: 'assets/mockups/mockup3.png',
      desc: 'Sudden Speed Reduction',
      delayClass: 'delay-2'
    },
    {
      label: 'DANGER',
      colorClass: 'color-red',
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
          setTimeout(() => {
            this.swiperInstance = new Swiper(container, {
              modules: [Pagination],
              slidesPerView: 1,
              spaceBetween: 0,
              observer: true,
              observeParents: true,
              pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
              }
            });
          }, 50);
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
