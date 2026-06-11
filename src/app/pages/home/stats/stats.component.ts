import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Stat } from '../../../core/interfaces/stat.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private swiperInstance: Swiper | null = null;

  stats = signal<Stat[]>([
    { value: '43', unit: '%', label: 'of freeway crashes are rear-end collisions' },
    { value: '<2', unit: 's', label: 'average alert delivery' },
    { value: '1.2', unit: 'mi', label: 'average warning distance' },
    { value: '4', unit: 'x', label: 'risk levels detected' }
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
          // Small delay so Angular finishes rendering & layout is stable
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

