# app-text-input Angular Component

Reusable minimal text input with label, icon slot, error message, and password toggle (for password fields).  
* Supports Angular reactive forms via ControlValueAccessor/NgModel.  
* Driven by Figma tokens and styles in `dashboard-login.css`.

## Usage

```
<app-text-input
  label="Username"
  [icon]="'user-icon'"
  type="text"
  [formControl]="username"
></app-text-input>

<app-text-input
  label="Password"
  [icon]="'lock-icon'"
  type="password"
  [formControl]="password"
></app-text-input>
```
- `icon` uses a class for SVG background from global CSS (e.g., user-icon, lock-icon).

- Supply your own error message with `[error]="someError"` or let it pick up from `formControl.errors`.

For more predefined icon background classes, see design tokens in assets/dashboard-login.css.
