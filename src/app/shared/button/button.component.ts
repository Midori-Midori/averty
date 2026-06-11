import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = '';
  @Input() variant: 'access' | 'demo' | 'register' | 'social-outline' | string = 'demo';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() customClass = '';
  @Input() disabled = false;
}
