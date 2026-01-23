# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository (`@paypal/messaging-components`) is the **v5 SDK** for PayPal Pay Later Messaging. It provides promotional messaging banners and interactive modals for merchants to display PayPal Credit and Pay Later financing options on their websites.

**Key Features:**

-   Banner messages with localized promotional content
-   Interactive modals with financing calculators
-   Multiple integration patterns (standalone, SDK, server-side)
-   Support for 8 locales (US, DE, GB, FR, ES, IT, AU, CA)

## Common Development Commands

### Development

```bash
npm run dev              # Start dev server (SDK target)
npm run dev:standalone   # Start standalone messaging demo
npm run dev:modal        # Start modal component demo
npm run dev:stage        # Stage environment
npm run dev:sandbox      # Sandbox environment
npm run dev:production   # Production environment
```

### Testing

```bash
npm run test             # Run unit tests (Jest)
npm run test:func        # Run all functional tests (Puppeteer)
npm run test:func:nosnaps   # Functional tests without snapshots
npm run test:func:snapshots # V2 snapshot tests only
```

### Build

```bash
npm run build            # Production build (via semantic-release)
npm run build:stage      # Stage build
npm run build:sandbox    # Sandbox build
npm run build:production # Production build
npm run build:analyze    # Bundle analysis
```

### Code Quality

```bash
npm run lint             # ESLint
```

## Architecture Overview

The SDK is built around three module types:

### 1. Library Module (`src/library/`)

-   **Purpose**: Controller layer and public API
-   **Output**: `dist/messaging.js`, `dist/modal.js`
-   **Key exports**: `Messages()`, `MessagesModal()`

### 2. Components Module (`src/components/`)

-   **Purpose**: Zoid-based iframe UI components
-   **Renders**: Inside cross-origin iframes
-   **Framework**: Preact for UI, Zoid for iframe management

### 3. Server Module (`src/server/`)

-   **Purpose**: Server-side message rendering
-   **Output**: `renderMessage.js` (CommonJS)
-   **Exports**: `render()`, `validateStyle()`, `getParentStyles()`

```
┌─────────────────────────────────────────────────────────────────────┐
│                        MERCHANT WEBSITE                              │
│  Messages({ account, amount, style }).render('[data-pp-message]')   │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      ZOID COMPONENT LAYER                            │
│  Cross-origin iframe management, prop serialization, event bridging  │
│  ┌──────────────────────┐    ┌──────────────────────────────────┐   │
│  │   Message Component  │    │       Modal Component            │   │
│  │   (iframe banner)    │    │   (iframe calculator/modal)      │   │
│  └──────────────────────┘    └──────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SERVER-SIDE RENDERING                           │
│  Locale selection → Mutation rules → Style cascade → HTML output     │
└─────────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
paypal-messaging-components/
├── src/
│   ├── library/                    # Controller layer & public API
│   │   ├── controllers/
│   │   │   ├── message/           # Message controller (interface, setup, destroy)
│   │   │   └── modal/             # Modal controller (interface, setup)
│   │   ├── zoid/
│   │   │   ├── message/           # Zoid message component definition
│   │   │   └── modal/             # Zoid modal component definition
│   │   └── interface/             # Public exports (Messages, MessagesModal)
│   │
│   ├── components/                 # Client-side UI components
│   │   ├── message/               # Banner message component (DOM-based)
│   │   └── modal/v2/              # Modal component (Preact-based)
│   │       ├── parts/             # UI sub-components
│   │       │   └── views/         # LongTerm, ShortTerm, NoInterest, PayIn1, ProductList
│   │       ├── lib/               # Hooks, providers, utilities
│   │       └── styles/            # SCSS stylesheets
│   │
│   ├── server/                     # Server-side rendering
│   │   ├── locale/                # Localization configs (US, DE, GB, FR, ES, AU, IT, CA)
│   │   │   └── {COUNTRY}/
│   │   │       ├── validOptions.js    # Style validation rules
│   │   │       ├── mutations/         # Text/layout variations
│   │   │       ├── styles/            # CSS rules
│   │   │       └── logos.js           # Logo variants
│   │   └── message/               # Message rendering components
│   │
│   └── utils/                      # Shared utilities
│
├── content/                        # Content definitions by locale
├── demo/                           # Demo pages
├── tests/
│   ├── unit/                      # Jest unit tests
│   ├── functional/                # Jest + Puppeteer tests
│   └── playwright/                # Playwright E2E tests
└── scripts/                        # Build scripts (semantic-release)
```

## Key Technologies

| Technology     | Version         | Purpose                          |
| -------------- | --------------- | -------------------------------- |
| **Preact**     | 10.1.1          | Lightweight UI framework (Modal) |
| **Zoid**       | 10.0.0          | Cross-domain component framework |
| **PostRobot**  | 11.0.0          | Inter-window communication       |
| **Webpack**    | 4.32.0          | Module bundler                   |
| **Babel**      | grumbler-config | Transpilation                    |
| **Jest**       | 26.1.0          | Unit testing                     |
| **Puppeteer**  | 2.0.0           | Functional testing               |
| **Playwright** | 1.46.0          | E2E testing                      |

## Integration Patterns

### JavaScript API

```javascript
paypal
    .Messages({
        account: 'MERCHANT_ID',
        amount: 100.0,
        style: {
            layout: 'text',
            logo: { type: 'primary', position: 'left' },
            text: { color: 'black', size: 12 }
        }
    })
    .render('[data-pp-message]');
```

### HTML Attributes

```html
<div
    data-pp-message
    data-pp-account="MERCHANT_ID"
    data-pp-amount="100.00"
    data-pp-style-layout="text"
    data-pp-style-logo-type="primary"
></div>
```

### Modal API

```javascript
const modal = paypal.MessagesModal({
    account: 'MERCHANT_ID',
    amount: 100.0,
    onApply: data => {
        /* handle apply */
    },
    onClose: () => {
        /* handle close */
    }
});

modal.show();
modal.hide();
```

## Style Options

### Text Layout

```javascript
style: {
    layout: 'text',
    logo: {
        type: 'primary' | 'alternative' | 'inline' | 'none',
        position: 'left' | 'right' | 'top'
    },
    text: {
        color: 'black' | 'white' | 'monochrome' | 'grayscale',
        size: 10 | 11 | 12 | 13 | 14 | 15 | 16,
        align: 'left' | 'right' | 'center'
    }
}
```

### Flex Layout

```javascript
style: {
    layout: 'flex',
    color: 'blue' | 'black' | 'white' | 'white-no-border' | 'gray',
    ratio: '1x1' | '1x4' | '8x1' | '20x1'
}
```

## Supported Locales

| Code | Country       | Products                                 |
| ---- | ------------- | ---------------------------------------- |
| US   | United States | PayPal Credit, Pay Later Short/Long Term |
| DE   | Germany       | GPL (Pay Later), Pi30 (Pay in 3)         |
| GB   | Great Britain | GPL                                      |
| FR   | France        | GPL                                      |
| ES   | Spain         | GPL, Short Term                          |
| IT   | Italy         | GPL                                      |
| AU   | Australia     | GPL                                      |
| CA   | Canada        | GPL (en-CA, fr-CA)                       |

## Development Guidelines

### Coding Standards

-   Use JSX for Preact components
-   Follow Airbnb ESLint configuration
-   Use Prettier for formatting
-   Avoid introducing new dependencies without approval

### Testing Requirements

-   Unit tests required for new functionality
-   Functional tests for UI components
-   Snapshot tests for visual regression

### Key Design Patterns

1. **Zoid Pattern**: Cross-origin iframe abstraction
2. **Context/Provider Pattern**: Preact state management
3. **Cascade Pattern**: Style inheritance through mutation rules
4. **Observer Pattern**: `InsertionObserver`, `AttributeObserver` for DOM changes

## Global State

```javascript
window.__paypal_messages_{version}__ = {
    index: 1,                    // Counter for message IDs
    config: { account, ... },    // SDK config
    messagesMap: Map(),          // Container → component mapping
    __paypal_credit_message__,   // Zoid message component
    __paypal_credit_modal__,     // Zoid modal component
}
```

## Debugging

```javascript
// Enable debug logging
localStorage.setItem('pp_debug', 'true');

// Inspect Zoid props (inside message iframe)
window.xprops;

// Check global state (parent window)
window.__paypal_messages__;
```

## CI/CD Workflows

| Workflow              | Purpose                               |
| --------------------- | ------------------------------------- |
| `core.yml`            | Lint, Unit, Functional tests          |
| `snapshotCompare.yml` | Compare snapshots                     |
| `snapshotUpdate.yml`  | Update snapshots (label: `snapshots`) |
| `release.yml`         | Semantic release to NPM               |

## Context Loading Instructions

When working on tasks within specific subdirectories, load the corresponding CLAUDE.md:

-   `src/library/CLAUDE.md` - For controller and Zoid component work
-   `src/components/CLAUDE.md` - For UI component work
-   `src/server/CLAUDE.md` - For server-side rendering work

Only load subdirectory context when actively working on files in that area.
