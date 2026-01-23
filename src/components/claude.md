# Components Directory

## Purpose

The `components` directory contains the client-side UI components that render inside Zoid iframes. These components receive props from the parent window and render the visual messaging elements.

## Architecture Overview

```
components/
├── message/                    # Banner message component
│   ├── index.js               # Entry point
│   └── Message.js             # DOM-based message renderer
│
└── modal/                      # Modal component
    └── v2/                     # Current modal version
        ├── index.js           # Entry point
        ├── lib/               # Utilities and hooks
        │   ├── hooks/         # Preact hooks
        │   │   ├── calculator.js
        │   │   ├── applyNow.js
        │   │   ├── content.js
        │   │   └── currency.js
        │   ├── providers/     # Context providers
        │   │   ├── xprops.js
        │   │   ├── serverData.js
        │   │   ├── transition.js
        │   │   └── scroll.js
        │   ├── utils.js
        │   ├── locale.js
        │   └── logos.js
        │
        ├── parts/             # UI sub-components
        │   ├── Modal.jsx
        │   ├── Container.jsx
        │   ├── Header.jsx
        │   ├── BodyContent.jsx
        │   ├── Calculator.jsx
        │   ├── Donut.jsx
        │   ├── Icon.jsx
        │   ├── Button.jsx
        │   ├── Tile.jsx
        │   ├── OfferCard.jsx
        │   ├── OfferAccordion.jsx
        │   ├── Instructions.jsx
        │   ├── TermsTable.jsx
        │   ├── InlineLinks.jsx
        │   ├── LoadingShimmer.jsx
        │   ├── Overlay.jsx
        │   └── views/         # Product-specific views
        │       ├── LongTerm/
        │       ├── ShortTerm/
        │       ├── NoInterest/
        │       ├── PayIn1/
        │       └── ProductList/
        │
        └── styles/            # SCSS stylesheets
            ├── index.scss
            ├── globals/       # Variables, mixins, colors
            └── components/    # Component-specific styles
```

## Core Components

### Message Component (`message/`)

**`Message.js`** - DOM-based banner renderer

-   Creates styled `<button>` element for message display
-   Injects server-rendered HTML markup
-   Handles click events to trigger modal
-   Fetches updated markup on prop changes
-   Manages loading states and error handling

**Key Methods:**

-   `render()`: Initial render with server markup
-   `updateProps()`: Re-fetch and update on prop changes
-   `handleClick()`: Trigger modal display

### Modal Component (`modal/v2/`)

Built with **Preact** using a component-based architecture.

**Entry Point** (`index.js`):

-   Renders modal into Zoid iframe
-   Sets up provider hierarchy
-   Initializes event listeners

#### Providers (`lib/providers/`)

**`XPropsProvider`** - Parent component props

-   Receives props from Zoid parent
-   Provides config to all child components

**`ServerDataProvider`** - API data management

-   Fetches offer data from PayPal APIs
-   Caches and normalizes server responses
-   Provides calculated financing options

**`TransitionStateProvider`** - Animation state

-   Manages open/close transitions
-   Controls CSS animation classes
-   Handles transition callbacks

**`ScrollProvider`** - Scroll management

-   Tracks scroll position
-   Handles sticky header behavior
-   Manages focus trapping

#### Hooks (`lib/hooks/`)

**`useCalculator`** - Payment calculator logic

-   Calculates monthly payments
-   Handles term selection
-   Computes interest and totals

**`useApplyNow`** - Apply button functionality

-   Manages apply flow state
-   Handles redirect to PayPal

**`useContent`** - Content fetching

-   Fetches localized content
-   Handles loading states

**`useCurrency`** - Currency formatting

-   Formats amounts by locale
-   Handles currency symbols

#### UI Parts (`parts/`)

**Layout Components:**

-   `Modal.jsx` - Root modal wrapper
-   `Container.jsx` - Content container with providers
-   `Header.jsx` - Sticky header with logo and close button
-   `BodyContent.jsx` - Main content area with view routing
-   `Overlay.jsx` - Background overlay

**Calculator Components:**

-   `Calculator.jsx` - Payment calculator widget
-   `Donut.jsx` - Visual payment breakdown chart
-   `TermsTable.jsx` - Payment terms display

**Offer Components:**

-   `OfferCard.jsx` - Single offer display
-   `OfferAccordion.jsx` - Expandable offer details

**Utility Components:**

-   `Icon.jsx` - SVG icon library (40+ icons)
-   `Button.jsx` - Styled button component
-   `Tile.jsx` - Info tile component
-   `LoadingShimmer.jsx` - Loading placeholder
-   `InlineLinks.jsx` - Inline link renderer

#### Views (`parts/views/`)

Product-specific modal views:

**`LongTerm/`** - Long-term financing (6-24 months)

-   Monthly payment calculator
-   APR and interest display
-   Terms comparison

**`ShortTerm/`** - Pay in 4 / Short-term

-   4-payment breakdown
-   No interest messaging
-   Payment schedule

**`NoInterest/`** - No interest offers

-   Special promotional offers
-   Deadline countdown

**`PayIn1/`** - Single payment

-   Deferred payment option
-   Due date display

**`ProductList/`** - Product selection

-   Multiple offer comparison
-   Product switching

Each view has:

-   `Content.jsx` - Main view component
-   `styles.scss` - View-specific styles

### Styles (`styles/`)

SCSS-based styling system:

**Globals:**

-   `_variables.scss` - CSS custom properties
-   `_colors.scss` - Color palette
-   `_fonts.scss` - Typography
-   `_mixins.scss` - Reusable mixins
-   `_common.scss` - Shared styles

**Components:**

-   Individual component stylesheets
-   BEM naming convention
-   Responsive breakpoints

## Data Flow

```
Zoid Parent (library/)
     │
     ▼ PostRobot
     │
XPropsProvider            # Props from parent
     │
     ▼
ServerDataProvider        # Fetch server data
     │
     ▼
TransitionStateProvider   # Animation state
     │
     ▼
ScrollProvider            # Scroll management
     │
     ▼
Modal Component           # Root component
     │
     ├── Header
     │
     └── BodyContent
              │
              └── View (LongTerm/ShortTerm/etc.)
                       │
                       └── Calculator/OfferCard/etc.
```

## Key Patterns

### Provider Pattern

```jsx
<XPropsProvider>
    <ServerDataProvider>
        <TransitionStateProvider>
            <ScrollProvider>
                <Modal />
            </ScrollProvider>
        </TransitionStateProvider>
    </ServerDataProvider>
</XPropsProvider>
```

### Hook Usage

```jsx
function Calculator() {
    const { amount } = useXProps();
    const { terms, selectedTerm, setSelectedTerm } = useCalculator();
    const { formatCurrency } = useCurrency();

    return (/* ... */);
}
```

## Key Files for Modifications

| Task              | Files                                                |
| ----------------- | ---------------------------------------------------- |
| Add new icon      | `parts/Icon.jsx`                                     |
| Modify calculator | `lib/hooks/calculator.js`, `parts/Calculator.jsx`    |
| Add new view      | `parts/views/NewView/`, `parts/BodyContent.jsx`      |
| Change header     | `parts/Header.jsx`, `styles/components/_header.scss` |
| Add new provider  | `lib/providers/`, `index.js`                         |
| Style changes     | `styles/components/`, `styles/globals/`              |

## Dependencies

-   **Preact**: Lightweight React alternative
-   **@krakenjs/jsx-pragmatic**: JSX pragma for Zoid
-   **PostRobot**: Parent-child communication

## Accessibility

-   Keyboard navigation support
-   Focus trapping in modal
-   ARIA labels and roles
-   Screen reader announcements
-   High contrast support

## Testing Considerations

-   Use `@testing-library/preact` for component tests
-   Mock providers for isolated testing
-   Test hooks independently
-   Snapshot testing for visual regression
-   Test keyboard navigation paths
