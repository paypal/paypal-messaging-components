# Locale Directory

## Purpose

The `locale` directory contains all localization configurations for server-side message rendering. Each country has its own subdirectory with style validation, mutations (text/layout variations), logos, and CSS styles.

## Architecture Overview

```
locale/
├── index.js                    # Locale router and exports
├── common/                     # Shared utilities
│
├── US/                         # United States (most complex)
│   ├── index.js               # Product router
│   ├── validOptions.js        # Style validation
│   ├── logos.js               # Logo variants
│   ├── mutations/             # Text/layout mutations
│   │   ├── index.js
│   │   ├── gpl.js            # Generic Pay Later
│   │   ├── pala.js           # Pay As You Go
│   │   ├── short_term_*.js   # Short term variants
│   │   └── long_term_*.js    # Long term variants
│   └── styles/
│       ├── text/             # Text layout styles
│       └── flex/             # Flex layout styles
│
├── DE/                         # Germany
├── GB/                         # Great Britain
├── FR/                         # France
├── ES/                         # Spain
├── IT/                         # Italy
├── AU/                         # Australia
└── CA/                         # Canada (language-aware)
```

## Locale Router (`index.js`)

Main entry point that routes to country-specific configurations.

**Exports:**

```javascript
getLocaleSettings(offerCountry, offerType, contextualComponents, language);
getLocaleClass(locale, offerType, contextualComponents);
getLocaleProductName(locale, offerType, contextualComponents, language);
getValidOptions(locale, offerType, contextualComponents);
getMutations(locale, offerType, type, contextualComponents);
getLogos(locale, offerType);
getLocaleStyles(locale, layout, offerType, contextualComponents, language);
```

**Routing Logic:**

```javascript
switch (offerCountry) {
    case 'DE':
        return DE(offerType);
    case 'GB':
        return GB;
    case 'ES':
        return ES;
    case 'FR':
        return FR;
    case 'AU':
        return AU;
    case 'IT':
        return IT;
    case 'CA':
        return CA(language);
    case 'US':
    default:
        return US(offerType, contextualComponents);
}
```

## Country Configuration Structure

Each country directory exports a configuration object:

```javascript
export default {
    localeClass: 'locale--US',           // CSS class for locale
    productName: 'Pay Later',            // Display name
    validOptions: { ... },               // Style validation schema
    logos: { ... },                      // Logo variants
    styles: { text: [...], flex: [...] }, // CSS rules
    getMutations: (offerType, layout) => [...], // Mutation getter
}
```

## Supported Locales

| Code   | Country       | Products                            | Complexity | Notes                                 |
| ------ | ------------- | ----------------------------------- | ---------- | ------------------------------------- |
| **US** | United States | PayPal Credit, GPL, Short/Long Term | High       | Function-based routing, many products |
| **DE** | Germany       | GPL, Pi30                           | Medium     | Product-dependent variants            |
| **GB** | Great Britain | GPL                                 | Low        | Static configuration                  |
| **FR** | France        | GPL                                 | Low        | Static configuration                  |
| **ES** | Spain         | GPL, Short Term                     | Medium     | Multiple products                     |
| **IT** | Italy         | GPL                                 | Low        | Static configuration                  |
| **AU** | Australia     | GPL                                 | Low        | Static configuration                  |
| **CA** | Canada        | GPL                                 | Medium     | Language-aware (en-CA, fr-CA)         |

## Valid Options Schema

Defines allowed style options per layout type.

**Structure:**

```javascript
export default {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white', 'monochrome', 'grayscale|greyscale']],
            size: [Types.NUMBER, [12, 10, 11, 13, 14, 15, 16]],
            align: [Types.STRING, ['left', 'right', 'center']]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    },
    custom: {
        // Custom layout options
    }
};
```

**Types:**

-   `Types.STRING` - String value from allowed list
-   `Types.NUMBER` - Number from allowed list
-   `Types.BOOLEAN` - Boolean value
-   Pipe `|` for aliases: `'gray|grey'`

## Mutation System

Mutations define text and layout variations based on style configurations.

### Mutation Structure

```javascript
// mutations/gpl.js
export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'medium', br: ['purchases'] }],
                disclaimer: ['default']
            }
        ],
        [
            'logo.type:primary && logo.position:right',
            {
                headline: [{ tag: 'medium' }]
            }
        ],
        [
            'text.color:white',
            {
                logo: Logo.PP_PAYPAL.WHITE
            }
        ]
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'xsmall' }]
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [{ tag: 'medium' }]
            }
        ]
    ]
};
```

### Cascade Rules

Mutations are applied in order, with later rules overriding earlier ones.

**Rule Format:** `'condition'` → `{ mutations }`

**Condition Operators:**

-   `&&` - AND (all conditions must match)
-   No OR operator - use separate rules

**Common Conditions:**
| Condition | Values |
|-----------|--------|
| `logo.type` | `primary`, `alternative`, `inline`, `none` |
| `logo.position` | `left`, `right`, `top` |
| `text.color` | `black`, `white`, `monochrome` |
| `text.size` | `10`, `11`, `12`, `13`, `14`, `15`, `16` |
| `ratio` | `1x1`, `1x4`, `8x1`, `20x1` |
| `color` | `blue`, `black`, `white`, `gray` |

**Cascade Example:**

```javascript
// Input style: { logo: { type: 'primary', position: 'right' }, text: { color: 'white' } }

// Applied in order:
1. 'default'                                    // Base values
2. 'logo.type:primary && logo.position:right'   // Override headline
3. 'text.color:white'                           // Override logo color
```

### Mutation Properties

| Property      | Type          | Description                 |
| ------------- | ------------- | --------------------------- |
| `logo`        | Logo constant | Logo variant to display     |
| `headline`    | Array         | Headline text configuration |
| `subHeadline` | Array         | Secondary text              |
| `disclaimer`  | Array         | Legal disclaimer text       |
| `styles`      | Array         | Additional CSS rules        |

**Headline Configuration:**

```javascript
headline: [
    { tag: 'medium', br: ['purchases'] }, // Break after "purchases"
    { tag: 'xsmall', replace: [['APR', '0% APR']] }
];
```

## Logo System

Each locale defines available logo variants.

**Structure:**

```javascript
// logos.js
export default {
    PP_PAYPAL: {
        COLOR: ['logo-paypal-color', ...svgData],
        WHITE: ['logo-paypal-white', ...svgData],
        MONOCHROME: ['logo-paypal-mono', ...svgData]
    },
    PP_CREDIT: {
        COLOR: [...],
        WHITE: [...]
    },
    // etc.
}
```

## Styles

CSS rules organized by layout type.

**Structure:**

```
styles/
├── text/              # Text layout styles
│   ├── base.js       # Base text styles
│   └── variations.js # Color/size variations
└── flex/              # Flex layout styles
    ├── base.js       # Base flex styles
    └── ratios.js     # Ratio-specific styles
```

**Style Format:**

```javascript
export default [
    '.message { font-family: PayPalOpen-Regular; }',
    '.message__headline { font-size: 12px; }'
    // ...
];
```

## Adding a New Locale

1. **Create directory structure:**

```
locale/{COUNTRY}/
├── index.js
├── validOptions.js
├── logos.js
├── mutations/
│   ├── index.js
│   └── gpl.js
└── styles/
    ├── text/
    └── flex/
```

2. **Implement `index.js`:**

```javascript
import validOptions from './validOptions';
import logos from './logos';
import getMutations from './mutations';
import styles from './styles';

export default {
    localeClass: 'locale--XX',
    productName: 'Pay Later',
    validOptions,
    logos,
    styles,
    getMutations
};
```

3. **Register in `locale/index.js`:**

```javascript
import XX from './XX';

switch (offerCountry) {
    case 'XX':
        return XX;
    // ...
}
```

4. **Add tests** for new locale

## Key Files for Modifications

| Task                | Files                                 |
| ------------------- | ------------------------------------- |
| Add new country     | New directory, register in `index.js` |
| Add style option    | `validOptions.js`                     |
| Change message text | `mutations/*.js`                      |
| Add logo variant    | `logos.js`                            |
| Modify layout CSS   | `styles/text/` or `styles/flex/`      |
| Add new product     | `mutations/`, `index.js` router       |

## Testing Considerations

-   Test each locale independently
-   Verify all mutation cascades
-   Test all style option combinations
-   Validate generated CSS
-   Test logo rendering
-   Verify language variants (CA)
