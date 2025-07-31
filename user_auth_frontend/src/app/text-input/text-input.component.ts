import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgClass, CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [NgIf, NgClass, CommonModule, ReactiveFormsModule]
})
/**
 * Reusable minimal text input with label, icon slot, error message, and password toggle.
 * Supports Angular reactive forms via ControlValueAccessor.
 */
export class TextInputComponent implements ControlValueAccessor {
  // PUBLIC_INTERFACE
  /** The input label shown above the field */
  @Input() label?: string = '';
  // PUBLIC_INTERFACE
  /** Type: 'text', 'email', or 'password' */
  @Input() type: 'text' | 'email' | 'password' = 'text';
  // PUBLIC_INTERFACE
  /** Optional icon CSS class for left icon (e.g. "user-icon" or "lock-icon"); append to .input-icon */
  @Input() icon?: string;
  // PUBLIC_INTERFACE
  /** Pass a FormControl for error display (optional) */
  @Input() formControl?: FormControl;
  // PUBLIC_INTERFACE
  /** Optional error message, or picked up from formControl?.errors if exists */
  @Input() error?: string;

  /** Bound value */
  value: string = '';
  isFocused: boolean = false;
  isTouched: boolean = false;

  showPassword = false;
  get inputType(): string {
    if (this.type !== 'password') return this.type;
    return this.showPassword ? 'text' : 'password';
  }

  @ViewChild('inputField') input: ElementRef<HTMLInputElement> | undefined;

  /** Determine whether to show error */
  get showError(): boolean {
    if (typeof this.error === 'string' && this.error) return true;
    if (this.formControl && this.formControl.invalid && (this.formControl.touched || this.formControl.dirty)) return true;
    return false;
  }
  /** Get the error message for display */
  get errorMessage(): string | null {
    if (this.error) return this.error;
    if (this.formControl && this.formControl.errors) {
      if (this.formControl.errors['required']) return 'This field is required';
      if (this.formControl.errors['minlength']) return 'Value is too short';
      if (this.formControl.errors['maxlength']) return 'Value is too long';
      if (this.formControl.errors['email']) return 'Invalid email address';
      return Object.values(this.formControl.errors)[0];
    }
    return null;
  }

  // ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  // PUBLIC_INTERFACE
  writeValue(val: string): void {
    this.value = val || '';
  }
  // PUBLIC_INTERFACE
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // PUBLIC_INTERFACE
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  // PUBLIC_INTERFACE
  setDisabledState?(isDisabled: boolean): void {
    if (this.input?.nativeElement) {
      this.input.nativeElement.disabled = isDisabled;
    }
  }

  // PUBLIC_INTERFACE
  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    // DO NOT set formControl.setValue here; let reactive forms flow handle this.
  }
  // PUBLIC_INTERFACE
  handleFocus() {
    this.isFocused = true;
    this.isTouched = true;
    this.onTouched();
    if (this.formControl) this.formControl.markAsTouched();
  }
  // PUBLIC_INTERFACE
  handleBlur() {
    this.isFocused = false;
    this.onTouched();
    if (this.formControl) this.formControl.markAsTouched();
  }
  // PUBLIC_INTERFACE
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
