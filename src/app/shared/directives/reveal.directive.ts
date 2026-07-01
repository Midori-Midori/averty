import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const element = this.el.nativeElement;

      // Detect delay class and map to GSAP timeline delays
      let delay = 0;
      const classList = element.classList;
      if (classList.contains('delay-1')) delay = 0.1;
      else if (classList.contains('delay-15')) delay = 0.15;
      else if (classList.contains('delay-2')) delay = 0.2;
      else if (classList.contains('delay-3')) delay = 0.3;

      // Initial state
      gsap.set(element, {
        opacity: 0,
        y: 24,
        scale: 0.98
      });

      // Animate when entering viewport
      gsap.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    }
  }
}
