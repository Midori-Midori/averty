import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() errorMessages: { [key: string]: string } = {};

  get isInvalid(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }

  get errorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    const errorKeys = Object.keys(this.control.errors);
    if (errorKeys.length === 0) return '';
    
    const firstError = errorKeys[0];
    if (this.errorMessages[firstError]) {
      return this.errorMessages[firstError];
    }
    
    // Default fallback messages
    if (firstError === 'required') return `${this.label || 'Field'} is required.`;
    if (firstError === 'email') return 'Please enter a valid email address.';
    if (firstError === 'minlength') {
      const requiredLength = this.control.errors['minlength'].requiredLength;
      return `${this.label || 'Field'} must be at least ${requiredLength} characters.`;
    }
    if (firstError === 'pattern') return 'Please enter a valid format.';
    
    return 'Invalid value.';
  }
}
