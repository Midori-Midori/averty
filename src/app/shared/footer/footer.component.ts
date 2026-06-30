import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  productLinks = [
    { label: 'Features', href: '#safety' },
    { label: 'How It Works', href: '#hiw' },
    { label: 'App Screens', href: '#screens' },
    { label: 'Stats', href: '#stats' }
  ];

  resourceLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Support', href: '#' }
  ];

  socialLinks = [
    {
      name: 'TikTok',
      handle: '@averty.pro',
      href: '#',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tiktok.svg'
    },
    {
      name: 'Facebook',
      handle: 'Averty.pro',
      href: '#',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg'
    },
    {
      name: 'X / Twitter',
      handle: '@averty_pro',
      href: '#',
      iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg'
    }
  ];
}
