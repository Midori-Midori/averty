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
      highlight: '1.5s Delay',
      title: 'Reaction Windows',
      description: 'At highway speeds, a 1.5-second delay in braking reaction time triples the risk of multi-vehicle freeway pileups.',
      delayClass: '',
      colorClass: 'color-red',
      icon: Gauge
    },
    {
      highlight: 'Traditional GPS',
      title: 'Passive Navigation',
      description: 'Standard navigation apps alert you *after* you have already entered the tailback, leaving no margin to safely slow down.',
      delayClass: 'delay-1',
      colorClass: 'color-orange',
      icon: AlertOctagon
    },
    {
      highlight: '40%+ Dangers',
      title: 'Blind Road Curves',
      description: 'Over 40% of highway crashes occur beyond bends or hills where the stopped traffic queue is completely hidden from view.',
      delayClass: 'delay-15',
      colorClass: 'color-yellow',
      icon: Coins
    },
    {
      highlight: '3s Blindness',
      title: 'Inattentive Moments',
      description: 'Even attentive drivers look away from the road for 2-3 seconds at a time, making active audio-visual alerts indispensable.',
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
