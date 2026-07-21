---
name: Academic Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 800px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for focused, high-stakes digital assessment environments. The brand personality is professional, objective, and supportive, aiming to reduce test-taker anxiety through visual order. 

The design style follows a **Modern Corporate** aesthetic with a lean toward **Minimalism**. It prioritizes cognitive load reduction by utilizing generous white space, a restricted color palette, and a clear functional hierarchy. The interface is intentionally "quiet" to ensure that the educational content remains the sole focus of the user's attention.

## Colors

The palette is anchored by **Trustworthy Blue**, used specifically for primary actions, progress indicators, and active states to signal importance and reliability. 

- **Primary (#2563eb):** Used for "Next" buttons, selected radio states, and progress bars.
- **Secondary (#f8fafc):** A soft cool grey used for the main application background to reduce eye strain compared to pure white.
- **Tertiary (#64748b):** A muted slate for secondary information, breadcrumbs, and placeholder text.
- **Neutral (#0f172a):** A deep navy-black for maximum text legibility and high-contrast headings.
- **Surface (#ffffff):** Pure white is reserved for the "Question Card" to create a distinct visual container for the task at hand.

## Typography

The typography system utilizes **Inter** for its exceptional legibility and systematic feel. 

- **Headlines:** Use `headline-md` for question stems to ensure they are the most prominent element on the page.
- **Body:** `body-lg` is preferred for question text to maintain high readability. `body-md` is used for answer choices and explanatory text.
- **Labels:** `label-md` is used for buttons and navigation elements, often in all-caps or medium weights to differentiate from content.
- **Mobile scaling:** On devices smaller than 768px, display sizes should scale down to `headline-md-mobile` to prevent excessive line wrapping.

## Layout & Spacing

This design system employs a **Fixed Grid** approach for the core quiz experience to minimize peripheral distraction. The main content area is constrained to an 800px central column, which creates an optimal line length for reading comprehension.

- **Vertical Rhythm:** A strict 8px base unit controls all spacing. Questions are separated from options by `stack-lg` (32px), while individual options are separated by `stack-md` (16px).
- **Responsive Behavior:** 
  - **Desktop:** Centered 800px column with wide gutters.
  - **Tablet:** Full-width container with 40px side margins.
  - **Mobile:** Full-width container with 16px side margins. Padding inside cards reduces to 16px to maximize horizontal space for text.

## Elevation & Depth

To maintain a clean, professional aesthetic, this design system uses **Tonal Layers** supplemented by very subtle **Ambient Shadows**.

- **Level 0 (Background):** The Secondary color (#f8fafc) serves as the foundation.
- **Level 1 (Question Card):** Pure white background with a 1px border (#e2e8f0). A soft, low-opacity shadow (0px 4px 6px rgba(0,0,0,0.05)) is applied to provide a gentle lift.
- **Active States:** Elements being interacted with (like a selected answer) do not increase in elevation but rather change border color and thickness to the Primary Blue to maintain a flat, structured feel.

## Shapes

The shape language is consistently **Rounded**, communicating a modern and approachable feel while remaining professional.

- **Standard Elements:** Buttons, input fields, and answer choice containers use the default `0.5rem` (8px) radius.
- **Large Elements:** The main question cards use `rounded-lg` (1rem / 16px) to create a soft, defined container for the quiz content.
- **Indicators:** Progress bar caps and small "tag" labels use `rounded-xl` for a more distinct, pill-like appearance.

## Components

### Buttons
- **Primary:** Solid #2563eb background with white text. High-contrast and clearly the "Final" action (e.g., "Submit").
- **Secondary/Outline:** 1px border of #2563eb with blue text. Used for "Previous" or "Save Draft" actions.

### Answer Choices (Radio/Cards)
Instead of simple radio buttons, use **Choice Cards**. These are full-width clickable containers with a 1px border.
- **Default:** White background, #e2e8f0 border.
- **Hover:** #f1f5f9 background.
- **Selected:** #eff6ff background (tinted primary) with a 2px #2563eb border.

### Progress Indicator
A horizontal bar at the very top of the interface. The track is the secondary background color, and the fill is the primary blue. A small label indicates "Question X of Y".

### Input Fields
For short-answer questions, use a clean text input with a #e2e8f0 border. On focus, the border transitions to 2px #2563eb with a subtle blue outer glow (3px blur).

### Feedback Toasts
Used for non-disruptive alerts (e.g., "Progress Saved"). These should appear in the bottom-right corner with a white background and a subtle colored left-border indicating status (Success: Green, Info: Blue).