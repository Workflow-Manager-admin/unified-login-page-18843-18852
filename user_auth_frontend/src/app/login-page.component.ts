import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormContainerComponent } from './form-container/form-container.component';
import { LogoGroupComponent } from './logo-group/logo-group.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ButtonComponent } from './button/button.component';
import { LinkComponent } from './link/link.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-login-page',
  standalone: true,
  styleUrl: './login-page.component.css',
  templateUrl: './login-page.component.html',
  imports: [
    CommonModule,
    FormContainerComponent,
    LogoGroupComponent,
    TextInputComponent,
    ButtonComponent,
    LinkComponent,
    ReactiveFormsModule,
  ]
})
/**
 * PUBLIC_INTERFACE
 * @summary Main login form container page. Composes reusable UI elements and provides reactive validation/errors and password show/hide.
 */
export class LoginPageComponent {
  private fb = inject(FormBuilder);

  // Reactive form group
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Signals for error states and submission
  isSubmitting = signal(false);
  submitError = signal<string|null>(null);

  // Toggles password visibility
  showPassword = signal(false);
  // On login form submit
  // PUBLIC_INTERFACE
  onSubmit() {
    this.submitError.set(null);
    this.isSubmitting.set(true);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.isSubmitting.set(false);
      return;
    }
    const { password } = this.loginForm.value;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      if (password !== 'password1') {
        this.submitError.set('Invalid email or password.');
        this.isSubmitting.set(false);
      } else {
        // eslint-disable-next-line no-undef
        alert('Login successful!');
        this.isSubmitting.set(false);
      }
    }, 600);
  }

  // For password visibility toggle
  // PUBLIC_INTERFACE
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}
