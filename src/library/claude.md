# Library Directory

## Purpose

The `library` directory contains the controller layer and public API for PayPal Messaging. This is the entry point for merchant integrations, handling component lifecycle, configuration validation, and Zoid component management.

## Architecture Overview

```
library/
├── controllers/           # Component lifecycle management
│   ├── message/          # Message controller
│   │   ├── interface.js  # Public Messages() API
│   │   ├── setup.js      # Component initialization
│   │   ├── destroy.js    # Component cleanup
│   │   └── adapter.js    # SDK adapter
│   └── modal/            # Modal controller
│       ├── interface.js  # Public MessagesModal() API
│       └── setup.js      # Modal initialization
│
├── zoid/                  # Zoid component definitions
│   ├── message/          # Message iframe component
│   │   ├── component.js  # Zoid component config
│   │   ├── validation.js # Prop validation
│   │   └── containerTemplate.jsx
│   ├── modal/            # Modal iframe component
│   │   ├── component.js  # Zoid component config
│   │   ├── containerTemplate.jsx
│   │   └── prerenderTemplate.jsx
│   └── treatments/       # A/B testing component
│
├── interface/             # Public exports
├── messaging.js           # Main messaging entry
└── modal.js               # Modal entry
```

## Core Components

### Controllers

**Message Controller** (`controllers/message/`)

-   `interface.js` - Main `Messages()` factory function

    -   Validates merchant configuration
    -   Creates message instances with render/update/destroy methods
    -   Handles DOM element targeting and attribute parsing
    -   Manages re-render on attribute changes

-   `setup.js` - Component initialization

    -   Sets up global state and configuration
    -   Initializes Zoid components
    -   Registers insertion observers for auto-render

-   `destroy.js` - Component cleanup
    -   Removes components from DOM
    -   Cleans up event listeners
    -   Updates global state

**Modal Controller** (`controllers/modal/`)

-   `interface.js` - Main `MessagesModal()` factory function

    -   Creates modal instances with show/hide methods
    -   Handles merchant callbacks (onApply, onClose, etc.)
    -   Manages modal state and positioning

-   `setup.js` - Modal initialization
    -   Pre-renders modal for fast display
    -   Sets up event bridging with parent window

### Zoid Components

**Message Component** (`zoid/message/`)

-   `component.js` - Zoid component definition

    -   Defines iframe URL and dimensions
    -   Configures prop types and serialization
    -   Sets up event handlers (onClick, onReady, onError)
    -   Manages render lifecycle

-   `validation.js` - Prop validation

    -   Validates style options (layout, logo, text, color)
    -   Validates merchant credentials (account, merchantId)
    -   Validates amount and currency

-   `containerTemplate.jsx` - Parent container template
    -   Renders wrapper element in parent window
    -   Handles loading states

**Modal Component** (`zoid/modal/`)

-   `component.js` - Zoid component definition

    -   Configures modal dimensions and positioning
    -   Sets up overlay and backdrop
    -   Handles keyboard events (ESC to close)

-   `containerTemplate.jsx` - Modal container

    -   Renders modal overlay and frame
    -   Handles click-outside-to-close

-   `prerenderTemplate.jsx` - Loading state
    -   Shows loading indicator while iframe loads
    -   Provides immediate visual feedback

### Treatments Component (`zoid/treatments/`)

-   `component.js` - A/B testing infrastructure
    -   Fetches experiment assignments
    -   Applies treatment variations
    -   Tracks experiment exposure

## Key Patterns

### Factory Pattern

```javascript
// Public API returns render interface
const message = Messages({
    account: 'MERCHANT_ID',
    amount: 100
});

message.render('#container');
message.updateProps({ amount: 200 });
message.destroy();
```

### Zoid Lifecycle

1. **Create**: `zoid.create()` defines component schema
2. **Render**: `component.render(container)` creates iframe
3. **Props Update**: Props serialized and sent to iframe
4. **Events**: Child-to-parent communication via PostRobot
5. **Destroy**: Cleanup iframe and listeners

### Global State Management

```javascript
// Accessed via getGlobalState() utility
window.__paypal_messages__ = {
    config: {}, // Merchant configuration
    messagesMap: Map(), // Container → component mapping
    index: 0 // Component counter
};
```

## Data Flow

```
Merchant Code
     │
     ▼
Messages({ config })           # Controller creates instance
     │
     ▼
Validate & Normalize Props     # validation.js
     │
     ▼
Zoid Component Render          # component.js
     │
     ▼
Create Iframe                  # containerTemplate.jsx
     │
     ▼
Serialize Props → PostRobot    # Cross-origin communication
     │
     ▼
Child Component Receives       # src/components/message/
```

## Key Files for Modifications

| Task                   | Files                                                       |
| ---------------------- | ----------------------------------------------------------- |
| Add new style option   | `zoid/message/validation.js`, `zoid/message/component.js`   |
| Modify public API      | `controllers/message/interface.js`                          |
| Change modal behavior  | `controllers/modal/interface.js`, `zoid/modal/component.js` |
| Add new prop           | `zoid/*/component.js` (add to props config)                 |
| Change iframe template | `zoid/*/containerTemplate.jsx`                              |

## Dependencies

-   **@krakenjs/zoid**: Cross-domain component framework
-   **@krakenjs/post-robot**: Inter-window messaging
-   **@krakenjs/belter**: Utility functions
-   **@paypal/sdk-client**: PayPal SDK utilities

## Testing Considerations

-   Mock Zoid components in unit tests
-   Test validation logic independently
-   Use Puppeteer for cross-origin scenarios
-   Verify PostRobot message serialization
