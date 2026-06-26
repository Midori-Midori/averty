import { Component, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  
  private _isDemoModalOpen = false;
  private mouseMoveListener: any = null;
  private simIntervalId: any = null;

  activeSimStep = 0;

  get isDemoModalOpen() {
    return this._isDemoModalOpen;
  }

  set isDemoModalOpen(val: boolean) {
    this._isDemoModalOpen = val;
    if (isPlatformBrowser(this.platformId)) {
      if (val) {
        this.startSimulation();
      } else {
        this.stopSimulation();
      }
    }
  }

  openDemoModal() {
    this.isDemoModalOpen = true;
  }

  closeDemoModal() {
    this.isDemoModalOpen = false;
  }

  startSimulation() {
    this.activeSimStep = 0;
    this.stopSimulation();
    this.simIntervalId = setInterval(() => {
      this.activeSimStep = (this.activeSimStep + 1) % 4;
    }, 3200);
  }

  stopSimulation() {
    if (this.simIntervalId) {
      clearInterval(this.simIntervalId);
      this.simIntervalId = null;
    }
  }

  setSimStep(step: number) {
    this.activeSimStep = step;
    this.startSimulation(); // reset simulation timer
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const container = this.el.nativeElement;
      const title = container.querySelector('.hero-title');
      const subtitle = container.querySelector('.hero-subtitle');
      const button = container.querySelector('app-button');
      const mockup = container.querySelector('.phone-mockup');
      const bubbles = container.querySelectorAll('.bubble');
      const heroSection = container.querySelector('.hero');

      // 1. Entrance timeline
      const tl = gsap.timeline({ delay: 0.1 });

      if (title) {
        tl.fromTo(title,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      if (subtitle) {
        tl.fromTo(subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (button) {
        tl.fromTo(button,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.4'
        );
      }

      if (bubbles.length > 0) {
        tl.fromTo(bubbles,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 },
          '-=0.3'
        );
      }

      // 2. Setup floating mockup loop
      if (mockup) {
        gsap.fromTo(mockup,
          { y: 0 },
          {
            y: -15,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          }
        );
      }

      // 3. Mouse Parallax Effect
      if (isPlatformBrowser(this.platformId) && heroSection && (mockup || bubbles.length > 0)) {
        this.mouseMoveListener = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          
          // Calculate offsets (-0.5 to 0.5)
          const moveX = (clientX / innerWidth) - 0.5;
          const moveY = (clientY / innerHeight) - 0.5;

          if (mockup) {
            gsap.to(mockup, {
              x: moveX * 24,
              y: moveY * 24,
              duration: 0.8,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }

          bubbles.forEach((bubble: any, idx: number) => {
            const factor = (idx + 1) * 16;
            gsap.to(bubble, {
              x: moveX * factor,
              y: moveY * factor,
              duration: 1,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          });
        };

        heroSection.addEventListener('mousemove', this.mouseMoveListener);
      }
    }
  }

  ngOnDestroy() {
    this.stopSimulation();
    if (isPlatformBrowser(this.platformId) && this.mouseMoveListener) {
      const heroSection = this.el.nativeElement.querySelector('.hero');
      if (heroSection) {
        heroSection.removeEventListener('mousemove', this.mouseMoveListener);
      }
    }
  }
}
