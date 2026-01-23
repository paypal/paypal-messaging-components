# Utils Directory

## Purpose

The `utils` directory contains shared utility functions used throughout the SDK. These modules provide common functionality for DOM manipulation, logging, state management, SDK integration, and more.

## Architecture Overview

```
utils/
├── index.js                    # Re-exports all utilities
│
├── constants.js                # Shared constants (OFFER types, etc.)
├── global.js                   # Global state management
├── sdk.js                      # PayPal SDK integration utilities
├── logger.js                   # Logging and analytics
├── stats.js                    # Performance statistics
│
├── elements.js                 # DOM manipulation utilities
├── observers.js                # MutationObserver utilities
├── events.js                   # Event handling utilities
│
├── miscellaneous.js            # General utilities
├── objects.js                  # Object manipulation
├── functional.js               # Functional programming helpers
│
├── adblock.js                  # Ad blocker detection
├── debug.js                    # Debug mode utilities
├── performance.js              # Performance tracking
├── experiments.js              # A/B testing utilities
├── activeTags.js               # Active element tracking
└── server.js                   # Server-side utilities
```

## Core Modules

### `global.js` - Global State Management

Manages SDK-wide state attached to `window`.

**Key Functions:**

```javascript
createGlobalState(); // Initialize global state
getGlobalState(); // Get current global state
setGlobalState(state); // Update global state
destroyGlobalState(); // Cleanup global state
nextIndex(); // Get next component index
createGlobalVariableGetter(name, factory); // Lazy singleton creation
```

**Global State Structure:**

```javascript
window.__paypal_messages_1_75_0__ = {
    index: 1, // Component counter
    config: {}, // SDK configuration
    messagesMap: Map() // Container → component mapping
};
```

### `sdk.js` - PayPal SDK Integration

Utilities for interacting with the PayPal SDK.

**Key Functions:**

```javascript
getScript(); // Get SDK script element
getAccount(); // Get merchant account ID
getPartnerAccount(); // Get partner account
getCurrency(); // Get currency code
getClientId(); // Get client ID
getLibraryVersion(); // Get SDK version
getEnv(); // Get environment (local/sandbox/production)
getPayPalDomain(); // Get PayPal domain for env
getGlobalUrl(type); // Get URL for component type
getMeta(); // Get SDK metadata
getNamespace(); // Get SDK namespace
getSessionID(); // Get session ID
getDisableSetCookie(); // Check cookie setting
getStageTag(); // Get stage tag
getFeatures(); // Get feature flags
getNonce(); // Get script nonce for CSP
getScriptAttributes(); // Get all script data attributes
getMerchantConfig(); // Get merchant configuration
isScriptBeingDestroyed(); // Check if cleanup in progress
```

### `logger.js` - Logging and Analytics

Comprehensive logging with PayPal analytics integration.

**Key Functions:**

```javascript
logger.track(data); // Track event
logger.warn(type, data); // Log warning
logger.error(type, data); // Log error
logger.info(type, data); // Log info
logger.addMetaBuilder(fn); // Add metadata builder
```

**Log Payload Structure:**

```javascript
{
    meta: {
        global: { deviceID, sessionID, ... },
        [componentIndex]: { type, account, stats, ... }
    },
    events: [...],
    tracking: [...]
}
```

### `stats.js` - Performance Statistics

Track rendering and request performance.

**Key Functions:**

```javascript
runStats(data); // Process stats for logging
getTimings(); // Get performance timings
```

**Tracked Metrics:**

-   `render_duration` - Time to render component
-   `request_duration` - Time for API requests
-   Component lifecycle events

### `elements.js` - DOM Utilities

DOM manipulation and element utilities.

**Key Functions:**

```javascript
getRoot(element); // Get root document/shadow root
getInlineOptions(element); // Parse data-pp-* attributes
isElement(node); // Check if DOM element
elementContains(parent, child); // Check containment
elementOutside(element); // Check if element is outside viewport
createElement(tag, props); // Create DOM element
prependElement(parent, child); // Prepend to parent
waitForElement(selector); // Wait for element to exist
```

**Attribute Parsing:**

```javascript
// <div data-pp-amount="100" data-pp-style-layout="text">
getInlineOptions(element);
// → { amount: '100', style: { layout: 'text' } }
```

### `observers.js` - MutationObserver Utilities

DOM observation for auto-rendering and attribute changes.

**Key Functions:**

```javascript
getInsertionObserver(); // Observer for new [data-pp-message] elements
getAttributeObserver(); // Observer for attribute changes
startObserving(); // Start all observers
stopObserving(); // Stop all observers
```

**InsertionObserver:**

-   Watches for new `[data-pp-message]` elements
-   Auto-renders messages on element insertion
-   Handles dynamically added elements

**AttributeObserver:**

-   Watches for `data-pp-*` attribute changes
-   Triggers re-render on configuration changes
-   Debounces rapid changes

### `events.js` - Event Utilities

Event handling and lifecycle events.

**Key Functions:**

```javascript
awaitWindowLoad(); // Promise for window load
awaitFirstRender(); // Promise for first render
addMessageEventListener(fn); // Add message event listener
removeMessageEventListener(fn); // Remove listener
```

### `miscellaneous.js` - General Utilities

Various helper functions.

**Key Functions:**

```javascript
createState(initial); // Create state with setter
request(url, options); // HTTP request wrapper
dynamicImport(url); // Dynamic script import
getCurrentTime(); // Get current timestamp
memoize(fn); // Memoization wrapper
debounce(fn, delay); // Debounce wrapper
curry(fn); // Currying helper
pipe(...fns); // Function composition
updateStorage(key, value); // LocalStorage wrapper
getOrCreateDeviceID(); // Get/create device ID
```

### `objects.js` - Object Utilities

Object manipulation helpers.

**Key Functions:**

```javascript
objectGet(obj, path); // Deep property access
objectSet(obj, path, value); // Deep property set
objectMerge(target, source); // Deep merge
objectFlattenToArray(obj); // Flatten to array
```

### `functional.js` - Functional Helpers

Functional programming utilities.

**Key Functions:**

```javascript
curry(fn); // Curry function
pipe(...fns); // Pipe functions
compose(...fns); // Compose functions
partial(fn, ...args); // Partial application
```

### `adblock.js` - Ad Blocker Detection

Detect if ad blockers might interfere.

**Key Functions:**

```javascript
isAdBlocked(); // Check for ad blocker
```

### `debug.js` - Debug Utilities

Debug mode and development helpers.

**Key Functions:**

```javascript
ppDebug(message, data); // Debug log (if enabled)
isDebugMode(); // Check debug mode
```

**Enable Debug:**

```javascript
localStorage.setItem('pp_debug', 'true');
```

### `performance.js` - Performance Tracking

Performance measurement utilities.

**Key Functions:**

```javascript
getPerformanceMeasure(name); // Get performance measure
markStart(name); // Mark start time
markEnd(name); // Mark end time
```

### `experiments.js` - A/B Testing

Experiment/treatment utilities.

**Key Functions:**

```javascript
getLocalTreatments(); // Get local treatment overrides
getExperimentData(); // Get experiment assignments
```

### `activeTags.js` - Active Element Tracking

Track active message elements.

**Key Functions:**

```javascript
addActiveTag(element); // Register active element
removeActiveTag(element); // Unregister element
getActiveTags(); // Get all active elements
```

### `constants.js` - Shared Constants

SDK-wide constants.

**Exports:**

```javascript
export const TAG = { MESSAGE: 'paypal-message', MODAL: 'paypal-modal' };
export const OFFER = { PAY_LATER_SHORT_TERM: '...', ... };
// etc.
```

## Key Files for Modifications

| Task                      | Files              |
| ------------------------- | ------------------ |
| Add global state property | `global.js`        |
| Add SDK utility           | `sdk.js`           |
| Modify logging            | `logger.js`        |
| Add DOM utility           | `elements.js`      |
| Modify observers          | `observers.js`     |
| Add constant              | `constants.js`     |
| Add HTTP utility          | `miscellaneous.js` |

## Dependencies

-   **@krakenjs/beaver-logger**: Logging framework
-   **@krakenjs/belter**: General utilities
-   **@krakenjs/zalgo-promise**: Promise utilities
-   **@paypal/sdk-client**: PayPal SDK utilities
-   **core-js-pure**: Polyfills

## Usage Patterns

### Importing Utilities

```javascript
// Import specific utilities
import { getGlobalState, logger, getInlineOptions } from '../utils';

// Or import all
import * as utils from '../utils';
```

### Creating Global Singletons

```javascript
const getMyService = createGlobalVariableGetter('__my_service__', () => new MyService());

// Usage - lazy initialization
const service = getMyService();
```

### State Management

```javascript
const [state, setState] = createState({ count: 0 });

setState({ count: state.count + 1 });
```

## Testing Considerations

-   Mock SDK utilities in tests
-   Test state management independently
-   Mock MutationObserver for observer tests
-   Test logging payloads
-   Mock localStorage for storage tests
