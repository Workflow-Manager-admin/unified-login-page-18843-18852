# app-button Angular Component

Reusable standalone Angular button, supporting color variants, text, optional icon, and click event as per Figma minimal modern guidelines.

## Features

- Color: `primary` (default), `accent`, or `secondary`
- Optional icon (Figma-style: uses background-image classes, set via \`icon\`)
- Emits `clicked` output event
- Fully accessible and keyboard friendly
- Minimal modern style using Figma tokens via CSS variables

## Usage

First, import as a standalone component:

```ts
import { ButtonComponent } from './button/button.component';
```

HTML:

```html
<app-button
  text="Login"
  color="primary"
  (clicked)="onLoginClicked($event)"
></app-button>

<app-button
  text="Login with Google"
  color="accent"
  icon="login-icon"
  (clicked)="onSocialLogin($event)"
></app-button>
```

### Icon Setup

For icon support, use background-image CSS classes (see `assets/dashboard-login.css` for more, e.g. `login-icon`, `user-icon`).

## API

| Input    | Type                      | Description                                       |
|----------|---------------------------|---------------------------------------------------|
| text     | string                    | Button display text                               |
| color    | 'primary' | 'accent' | 'secondary' | Visual theme             |
| icon     | string (optional)         | Adds a decorative icon (CSS background class)     |
| disabled | boolean (optional)        | If true, disables the button                      |

| Output   | Type           | Description                |
|----------|----------------|----------------------------|
| clicked  | EventEmitter   | Fires when the button is clicked |

## Theming

Component uses CSS variables defined in `assets/dashboard-login.css`, mapped from Figma design tokens.

## Advanced

- To add new icon styles, add a background-image class to `assets/dashboard-login.css` (see `.user-icon`, `.lock-icon` for reference).
