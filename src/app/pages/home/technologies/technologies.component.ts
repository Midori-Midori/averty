import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface Tech {
  name: string;
  logo: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent {
  techs: Tech[] = [
    {
      name: 'Angular',
      logo: 'assets/logos/angular.svg',
      description: 'Modern frontend framework for a fast, reactive UI.',
      color: '#DD0031'
    },
    {
      name: 'Node.js',
      logo: 'assets/logos/nodejs.svg',
      description: 'Scalable server-side runtime powering our real-time API.',
      color: '#339933'
    },
    {
      name: 'MongoDB',
      logo: 'assets/logos/mongodb.svg',
      description: 'Flexible NoSQL database for incident and alert data.',
      color: '#47A248'
    },
    {
      name: 'Google Maps',
      logo: 'assets/logos/googlemaps.svg',
      description: 'Live map integration for real-time road visualization.',
      color: '#4285F4'
    }
  ];
}
