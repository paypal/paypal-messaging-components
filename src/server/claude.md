# Server Directory

## Purpose

The `server` directory contains the server-side rendering (SSR) logic for PayPal Messages. It generates static HTML markup for message banners based on merchant configuration, locale, and style options.

## Architecture Overview

```
server/
├── index.js                    # Main entry point, exports render/validate
├── render.jsx                  # Preact SSR setup
├── constants.js                # Server constants
├── types.js                    # Type definitions
├── getParentStyles.js          # Parent container styles
├── validateStyle.js            # Style validation logic
│
├── locale/                     # Localization configurations
│   ├── index.js               # Locale router
│   ├── common/                # Shared locale utilities
│   ├── US/                    # United States
│   ├── DE/                    # Germany
│   ├── GB/                    # Great Britain
│   ├── FR/                    # France
│   ├── ES/                    # Spain
│   ├── IT/                    # Italy
│   ├── AU/                    # Australia
│   └── CA/                    # Canada
│
└── message/                    # Message rendering components
    ├── index.jsx              # Main Message component
    ├── logoMutations.js       # Logo variant selection
    ├── parts/                 # Preact sub-components
    │   ├── Logo.jsx
    │   ├── MutatedText.jsx
    │   ├── Styles.jsx
    │   └── CustomMessage.jsx
    └── styles/                # Layout-specific styles
        ├── text/              # Text layout styles
        ├── flex/              # Flex layout styles
        └── custom/            # Custom layout styles
```

## Core Modules

### Entry Point (`index.js`)

Exports the main server-side API:

```javascript
export { render } from './render';
export { validateStyle } from './validateStyle';
export { getParentStyles } from './getParentStyles';
```

### Render Flow (`render.jsx`)

```
render({ style, amount, customMarkup, contextualComponents })
    │
    ├── Get locale settings via getLocaleSettings(offerCountry, offerType)
    │
    ├── Apply cascade rules: applyCascade(flattenedStyle)(mutations)
    │
    ├── Build style arrays:
    │   ├── globalStyleRules
    │   ├── localeStyleRules
    │   ├── mutationStyleRules
    │   └── customFontStyleRules
    │
    ├── Render Preact components:
    │   ├── <Styles />
    │   ├── <Logo />
    │   └── <MutatedText />
    │
    └── Return: { markup, meta, warnings, parentStyles }
```

### Style Validation (`validateStyle.js`)

Validates merchant style configurations:

-   Checks layout type (text, flex, custom)
-   Validates logo options (type, position)
-   Validates text options (color, size, align)
-   Validates flex options (color, ratio)
-   Returns normalized style object with defaults

## Locale System

### Structure

Each locale directory contains:

```
locale/{COUNTRY}/
├── index.js               # Entry point, routes to products
├── validOptions.js        # Style validation schema
├── logos.js               # Logo variants (base64 SVG)
├── mutations/
│   ├── index.js          # Mutation router
│   ├── gpl.js            # Global Pay Later mutations
│   ├── pala.js           # Pay As You Go
│   ├── short_term_*.js   # Short term variants
│   └── long_term_*.js    # Long term variants
└── styles/
    ├── text/             # Text layout styles
    └── flex/             # Flex layout styles
```

### Supported Locales

| Code   | Country       | Products                                 | Notes                                |
| ------ | ------------- | ---------------------------------------- | ------------------------------------ |
| **US** | United States | PayPal Credit, Pay Later Short/Long Term | Most complex, function-based routing |
| **DE** | Germany       | GPL, Pi30                                | Product-dependent variants           |
| **GB** | Great Britain | GPL                                      | Static config                        |
| **FR** | France        | GPL                                      | Static config                        |
| **ES** | Spain         | GPL, Short Term                          | Static config                        |
| **IT** | Italy         | GPL                                      | Static config                        |
| **AU** | Australia     | GPL                                      | Static config                        |
| **CA** | Canada        | GPL                                      | Language-aware (en-CA, fr-CA)        |

### Valid Options Schema

```javascript
// Example: validOptions.js structure
export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white', 'monochrome', 'grayscale|greyscale']],
            size: [Types.NUMBER, [12, 10, 11, 13, 14, 15, 16]]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'gray|grey']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    }
};
```

## Mutation System

Mutations define text and layout variations based on style configurations.

### Mutation Structure

```javascript
// Example: mutations/gpl.js
export default {
    'layout:text': [
        ['default', {
            logo: Logo.PP_PAYPAL.COLOR,
            headline: [{ tag: 'medium', br: ['purchases'] }],
            disclaimer: ['default']
        }],
        ['logo.type:primary && logo.position:right', {
            // Override for specific style combination
            headline: [{ tag: 'medium' }],
        }],
        ['text.color:white', {
            logo: Logo.PP_PAYPAL.WHITE,
        }]
    ],
    'layout:flex': [
        ['default', { ... }],
        ['ratio:20x1', { ... }]
    ]
}
```

### Cascade Rules

-   `'default'` - Base rule, always applies first
-   `&&` - Multiple conditions (AND logic)
-   Later rules override earlier ones
-   Condition format: `property:value`

**Common Conditions:**

-   `logo.type:primary|alternative|inline|none`
-   `logo.position:left|right|top`
-   `text.color:black|white|monochrome`
-   `ratio:1x1|1x4|8x1|20x1`

## Message Components (`message/`)

### Main Component (`index.jsx`)

Renders the complete message structure:

```jsx
<div class="message">
    <Styles rules={styleRules} />
    <Logo mutation={logoMutation} />
    <MutatedText content={headline} />
    <MutatedText content={disclaimer} />
</div>
```

### Parts

**`Logo.jsx`** - Logo rendering

-   Renders SVG logos from base64 data
-   Handles color variants
-   Supports multiple logo types

**`MutatedText.jsx`** - Text with replacements

-   Renders headline and disclaimer text
-   Handles variable substitution (amount, terms)
-   Applies line breaks and formatting

**`Styles.jsx`** - CSS injection

-   Injects all CSS rules into component
-   Combines global, locale, and mutation styles

**`CustomMessage.jsx`** - Custom markup support

-   Handles merchant-provided custom templates
-   Validates and sanitizes markup

### Logo Mutations (`logoMutations.js`)

Selects appropriate logo variant based on:

-   Logo type (primary, alternative, inline, none)
-   Color scheme (color, monochrome, white)
-   Layout type (text, flex)

## Styles System (`styles/`)

### Text Layout (`styles/text/`)

Styles for inline text messages:

-   Font sizes and families
-   Text alignment
-   Logo positioning (left, right, top)
-   Responsive adjustments

### Flex Layout (`styles/flex/`)

Styles for banner/flex messages:

-   Ratio-based layouts (1x1, 1x4, 8x1, 20x1)
-   Background colors
-   Padding and spacing
-   Responsive breakpoints

## Key Files for Modifications

| Task                | Files                                                      |
| ------------------- | ---------------------------------------------------------- |
| Add new locale      | `locale/{COUNTRY}/`, `locale/index.js`                     |
| Add new product     | `locale/{COUNTRY}/mutations/`, `locale/{COUNTRY}/index.js` |
| Modify message text | `locale/{COUNTRY}/mutations/*.js`                          |
| Add style option    | `locale/{COUNTRY}/validOptions.js`, mutations              |
| Change logo         | `locale/{COUNTRY}/logos.js`, `message/logoMutations.js`    |
| Add CSS rule        | `message/styles/text/` or `message/styles/flex/`           |

## Adding a New Locale

1. Create directory: `locale/{COUNTRY}/`
2. Add required files:
    ```
    index.js           # Route to products
    validOptions.js    # Style validation
    logos.js           # Logo definitions
    mutations/
        index.js       # Mutation router
        gpl.js         # Default mutations
    styles/
        text/          # Text layout CSS
        flex/          # Flex layout CSS
    ```
3. Register in `locale/index.js`
4. Add tests for new locale

## Testing Considerations

-   Test each locale independently
-   Verify mutation cascade order
-   Test all style option combinations
-   Validate HTML output structure
-   Test logo color variants
-   Verify responsive styles

## Dependencies

-   **Preact**: SSR via `preact-render-to-string`
-   **@krakenjs/jsx-pragmatic**: JSX support

## Output Format

```javascript
render({ style, amount }) → {
    markup: '<div class="message">...</div>',
    meta: {
        messageRequestId: '...',
        trackingDetails: { ... }
    },
    warnings: [],
    parentStyles: 'width: 100%; ...'
}
```
