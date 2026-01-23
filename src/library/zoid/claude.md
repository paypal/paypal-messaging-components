# Zoid Directory

## Purpose

The `zoid` directory contains Zoid component definitions for cross-origin iframe management. Zoid abstracts the complexity of iframe communication, prop serialization, and component lifecycle management.

## Architecture Overview

```
zoid/
├── message/                    # Message banner component
│   ├── component.js           # Zoid component definition
│   ├── validation.js          # Prop validation logic
│   ├── containerTemplate.jsx  # Parent container template
│   └── index.js               # Export
│
├── modal/                      # Modal overlay component
│   ├── component.js           # Zoid component definition
│   ├── containerTemplate.jsx  # Modal container/overlay
│   ├── prerenderTemplate.jsx  # Loading state template
│   └── index.js               # Export
│
└── treatments/                 # A/B testing component
    ├── component.js           # Experiment component
    └── index.js               # Export
```

## Core Concepts

### Zoid Component Lifecycle

```
1. create()     → Define component schema (tag, url, props)
2. render()     → Create iframe and inject into container
3. Props flow   → Parent serializes props → PostRobot → Child receives
4. Events       → Child emits events → PostRobot → Parent callbacks
5. destroy()    → Cleanup iframe, listeners, state
```

### Component Definition Schema

```javascript
create({
    tag: 'paypal-message',           // Custom element tag
    url: getGlobalUrl('MESSAGE'),    // Iframe source URL
    domain: /\.paypal\.com$/,        // Allowed domains
    containerTemplate,               // Parent container JSX
    autoResize: { width, height },   // Auto-resize behavior
    attributes: { iframe: {...} },   // Iframe attributes
    props: {                         // Prop definitions
        propName: {
            type: 'string',          // Type validation
            queryParam: true,        // Include in URL
            required: false,         // Required flag
            value: validate.prop     // Validation function
        }
    }
})
```

## Message Component (`message/`)

### `component.js`

Main Zoid component definition for message banners.

**Key Props:**
| Prop | Type | QueryParam | Description |
|------|------|------------|-------------|
| `account` | string | No | Merchant account ID (required) |
| `merchantId` | string | Yes | Merchant ID |
| `amount` | number | Yes | Purchase amount |
| `currency` | string | Yes | Currency code |
| `pageType` | string | Yes | Page context (home, cart, product) |
| `style` | object | Yes (JSON) | Style configuration |
| `offer` | string | Yes | Offer type filter |
| `buyerCountry` | string | Yes | Buyer's country |

**Callbacks:**
| Callback | Purpose |
|----------|---------|
| `onClick` | Message clicked (triggers modal) |
| `onReady` | Component rendered successfully |
| `onHover` | Mouse hover on message |
| `onMarkup` | Server markup received |
| `onError` | Error occurred |

**Auto-resize Configuration:**

```javascript
autoResize: {
    width: true,
    height: true,
    element: 'button'  // Element to measure
}
```

### `validation.js`

Prop validation utilities with memoized logging.

**Type System:**

```javascript
Types = {
    ANY,
    STRING,
    BOOLEAN,
    NUMBER,
    FUNCTION,
    ARRAY,
    OBJECT
};
```

**Validators:**

-   `account` - Validates merchant ID format (10 or 13 chars, or client-id:)
-   `merchantId` - Validates merchant ID(s), comma-separated
-   `amount` - Validates numeric amount
-   `currency` - Validates currency code
-   `style` - Validates nested style object structure
-   `offer` - Validates offer type against allowed list

**Validation Pattern:**

```javascript
account: ({ props: { account } }) => {
    if (!validateType(Types.STRING, account)) {
        logInvalidType('account', Types.STRING, account);
        return undefined;
    }
    // Additional validation...
    return account;
};
```

### `containerTemplate.jsx`

Parent-side container for the message iframe.

-   Creates wrapper div in parent window
-   Handles loading states
-   Provides container for iframe injection

## Modal Component (`modal/`)

### `component.js`

Zoid component definition for the modal overlay.

**Key Props:**

-   Same merchant props as message (account, merchantId, etc.)
-   `onClose` - Modal close callback
-   `onApply` - Apply button callback
-   `onCalculate` - Calculator interaction callback

**Modal-Specific Configuration:**

```javascript
dimensions: {
    width: '100%',
    height: '100%'
}
```

### `containerTemplate.jsx`

Modal container with overlay and positioning.

**Features:**

-   Full-screen overlay backdrop
-   Centered modal frame
-   Click-outside-to-close handling
-   Keyboard event handling (ESC)

### `prerenderTemplate.jsx`

Loading state shown while modal iframe loads.

**Features:**

-   Loading spinner/shimmer
-   Immediate visual feedback
-   Smooth transition to loaded state

## Treatments Component (`treatments/`)

### `component.js`

A/B testing experiment infrastructure.

**Purpose:**

-   Fetches experiment assignments
-   Applies treatment variations
-   Tracks experiment exposure

## Data Flow

```
Parent Window (Merchant Site)
         │
         │ create() + render()
         ▼
┌─────────────────────────────────┐
│     containerTemplate.jsx       │
│  (Wrapper div in parent DOM)    │
└─────────────────────────────────┘
         │
         │ Zoid creates iframe
         ▼
┌─────────────────────────────────┐
│        Iframe (PayPal)          │
│   url: getGlobalUrl('MESSAGE')  │
│                                 │
│   Props received via:           │
│   - URL query params            │
│   - PostRobot messages          │
│                                 │
│   → src/components/message/     │
└─────────────────────────────────┘
         │
         │ Events (onClick, onReady, etc.)
         ▼
    Parent Callbacks
```

## Key Files for Modifications

| Task                 | Files                                                          |
| -------------------- | -------------------------------------------------------------- |
| Add new prop         | `component.js` (add to props), `validation.js` (add validator) |
| Change validation    | `validation.js`                                                |
| Modify container     | `containerTemplate.jsx`                                        |
| Change modal overlay | `modal/containerTemplate.jsx`                                  |
| Modify loading state | `modal/prerenderTemplate.jsx`                                  |

## Dependencies

-   **@krakenjs/zoid**: Component framework
-   **@krakenjs/post-robot**: Cross-origin messaging
-   **@krakenjs/jsx-pragmatic**: JSX support
-   **@krakenjs/belter**: Utility functions

## Testing Considerations

-   Mock `create()` from zoid in unit tests
-   Test validation functions independently
-   Use Puppeteer for actual iframe tests
-   Verify PostRobot message serialization
-   Test auto-resize behavior

## Common Patterns

### Adding a New Prop

1. Add to `component.js` props object:

```javascript
newProp: {
    type: 'string',
    queryParam: 'new_prop',
    required: false,
    value: validate.newProp
}
```

2. Add validator in `validation.js`:

```javascript
newProp: ({ props: { newProp } }) => {
    if (typeof newProp === 'undefined') return undefined;
    if (!validateType(Types.STRING, newProp)) {
        logInvalidType('newProp', Types.STRING, newProp);
        return undefined;
    }
    return newProp;
};
```

### Modifying Iframe Attributes

```javascript
attributes: {
    iframe: {
        title: 'PayPal Message',
        scrolling: 'no',
        // Add new attributes here
    }
}
```
