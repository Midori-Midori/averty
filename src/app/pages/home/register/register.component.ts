import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../../../core/models/register-form.model';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CardComponent } from '../../../shared/card/card.component';
import { InputComponent } from '../../../shared/input/input.component';
import { SocialButtonComponent } from '../../../shared/social-button/social-button.component';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RevealDirective, 
    ButtonComponent, 
    CardComponent, 
    InputComponent, 
    SocialButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private spotsIntervalId: any = null;

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitMessage = signal('');
  spotsRemaining = signal<number>(142);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^\\+\\d{1,4}[\\s\\-()]*\\d{7,15}$')]]
  });

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.spotsIntervalId = setInterval(() => {
        const current = this.spotsRemaining();
        if (current > 12 && Math.random() > 0.7) {
          this.spotsRemaining.set(current - 1);
        }
      }, 7000);
    }
  }

  ngOnDestroy() {
    if (this.spotsIntervalId) {
      clearInterval(this.spotsIntervalId);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitMessage.set('');

      const formData: RegisterForm = this.registerForm.value;
      this.registerService.registerUser(formData).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(response.success);
          this.submitMessage.set(response.message);
          if (response.success) {
            this.registerForm.reset();
          }
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(false);
          this.submitMessage.set('An error occurred. Please try again.');
          console.error(err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
