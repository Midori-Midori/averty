import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class HeroComponent implements AfterViewInit {
  private el = inject(ElementRef);
  isDemoModalOpen = false;

  openDemoModal() {
    this.isDemoModalOpen = true;
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const container = this.el.nativeElement;
      const title = container.querySelector('.hero-title');
      const subtitle = container.querySelector('.hero-subtitle');
      const button = container.querySelector('app-button');
      const mockup = container.querySelector('.phone-mockup');
      const bubbles = container.querySelectorAll('.bubble');

      // 1. Create entrance timeline
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
    }
  }
}
