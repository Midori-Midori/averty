import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LucideAngularModule, Gauge, AlertOctagon, Coins, CloudRain } from 'lucide-angular';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

interface SafetyFact {
  highlight: string;
  title: string;
  description: string;
  delayClass: string;
  colorClass: string;
  icon: any;
}

@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [CommonModule, CardComponent, RevealDirective, LucideAngularModule],
  templateUrl: './safety.component.html',
  styleUrl: './safety.component.scss'
})
export class SafetyComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private swiperInstance: Swiper | null = null;

  facts = signal<SafetyFact[]>([
    {
      highlight: '11,288',
      title: 'Speed-Related Deaths',
      description: 'Speeding was a contributing factor in 29% of all traffic fatalities in 2024, remaining one of the most critical safety concerns on U.S. roads.',
      delayClass: '',
      colorClass: 'color-red',
      icon: Gauge
    },
    {
      highlight: '1 in 4 Drivers',
      title: 'Aggressive Driving',
      description: 'Dangerous behaviors such as tailgating, speeding, and unsafe lane changes continue to contribute to thousands of crashes and fatalities every year.',
      delayClass: 'delay-1',
      colorClass: 'color-orange',
      icon: AlertOctagon
    },
    {
      highlight: '$340 Billion',
      title: 'Economic Impact',
      description: 'Traffic crashes generate approximately $340 billion in societal costs, including medical expenses, lost productivity, and property damage.',
      delayClass: 'delay-15',
      colorClass: 'color-yellow',
      icon: Coins
    },
    {
      highlight: '745,000+',
      title: 'Weather-Related Crashes',
      description: 'Nearly 745,000 crashes every year occur under adverse weather conditions such as rain, fog, snow, and strong winds. These conditions contribute to over 3,800 deaths annually.',
      delayClass: 'delay-2',
      colorClass: 'color-blue',
      icon: CloudRain
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
