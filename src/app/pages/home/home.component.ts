import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ScreensComponent } from './screens/screens.component';
import { RegisterComponent } from './register/register.component';
import { SafetyComponent } from './safety/safety.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    HowItWorksComponent,
    ScreensComponent,
    SafetyComponent,
    TechnologiesComponent,
    RegisterComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const container = this.el.nativeElement;
      const bgs = container.querySelectorAll('.hero-bg, .stats-bg, .hiw-bg, .screens-bg, .tech-bg, .register-bg, .footer-bg, .safety-bg');

      bgs.forEach((bg: HTMLElement) => {
        const parent = bg.parentElement;
        if (parent) {
          gsap.fromTo(bg,
            { yPercent: -8, scaleY: 1.45, transformOrigin: 'center center' },
            {
              yPercent: 8,
              scaleY: 1.45,
              ease: 'none',
              scrollTrigger: {
                trigger: parent,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });
    }
  }
}
