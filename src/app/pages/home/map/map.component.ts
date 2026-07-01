import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface MapNodeData {
  id: number;
  title: string;
  status: string;
  colorClass: string;
  description: string;
  radius: string;
  latency: string;
  confidence: string;
  protocol: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  activeNode = signal<number>(1);

  nodes = signal<Record<number, MapNodeData>>({
    1: {
      id: 1,
      title: 'Stopped Vehicle (Car Stopped on Lane)',
      status: 'CRITICAL HAZARD',
      colorClass: 'status-critical',
      description: 'A stationary vehicle has been detected in the middle lane of I-95 North, hidden from approaching traffic by a curve. Averty immediately broadcasts a localized alarm to all drivers heading towards this coordinate.',
      radius: '1.2 miles',
      latency: '24ms',
      confidence: '99%',
      protocol: 'Visual flashes RED screen. Auditory sirens play. Driver is advised to decelerate and change lanes immediately.'
    },
    2: {
      id: 2,
      title: 'Sudden Slowdown (Traffic Jam Ahead)',
      status: 'SLOWDOWN ALERT',
      colorClass: 'status-warning',
      description: 'Heavy deceleration has been detected 800 meters ahead. Averty sensors analyze the velocity drop and calculate the deceleration rates of vehicles to notify motorists before they hit the queue.',
      radius: '0.8 miles',
      latency: '36ms',
      confidence: '96%',
      protocol: 'Yellow advisory banner is displayed. Soft audio chime sounds to draw attention. Advises preparing to brake.'
    },
    3: {
      id: 3,
      title: 'Active Safe Flow Zone',
      status: 'ROAD CLEAR',
      colorClass: 'status-safe',
      description: 'Averty vehicles report normal speed profiles (55-70mph) on this sector. The roadway is safe and free of immediate bottlenecks or incidents.',
      radius: 'Global',
      latency: '12ms',
      confidence: '100%',
      protocol: 'Green reassurance indicator. System runs quietly in background to conserve mobile battery and cognitive load.'
    }
  });

  setActiveNode(id: number) {
    this.activeNode.set(id);
  }

  getActiveNodeData(): MapNodeData {
    return this.nodes()[this.activeNode()];
  }
}
