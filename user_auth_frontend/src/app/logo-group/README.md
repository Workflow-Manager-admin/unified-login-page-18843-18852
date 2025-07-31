# app-logo-group Angular Component

Reusable standalone Angular component for a minimal, decorative top-of-card logo group, designed for dashboard/login branding.

## Features

- Modern minimal look matching Figma/dashboard-login.css style
- SVG-based default, can accept custom projected content
- Themed via CSS variables (supports design tokens)
- Pure Angular, reusable at any card top

## Usage

Import as a standalone component:

```ts
import { LogoGroupComponent } from './logo-group/logo-group.component';
```

In template:
```html
<!-- Default minimal branding: -->
<app-logo-group></app-logo-group>

<!-- With your own logo (projected as children): -->
<app-logo-group>
  <svg><!-- company logo here --></svg>
</app-logo-group>
```

### Inputs

| Input         | Type    | Description                                                               |
|---------------|---------|---------------------------------------------------------------------------|
| showDefault   | boolean | (default: true) Show the SVG/Figma-like abstract graphics group           |
| logoColor     | string  | (optional) Set via CSS, main SVG fill color (overrides --logo-main token) |

## Theming

- The component uses the CSS variables declared in `assets/dashboard-login.css`.
- Shape colors are based on `--color-white`, but can be overlaid with a custom color.

## API

No outputs—decorative branding only. Project children to inject your branded graphics.

---

*Design inspired by Figma spec/dashboard-login.html*
