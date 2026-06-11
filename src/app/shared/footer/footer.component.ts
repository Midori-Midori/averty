import { Component } from '@angular/core';
import { SocialLink } from '../../core/interfaces/social-link.interface';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'Averty.pro',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tiktok.svg'
    },
    {
      name: 'Averty.pro',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg'
    },
    {
      name: 'Averty.pro',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg'
    }
  ];
}

