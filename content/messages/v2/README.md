# CPS v2 Message Fixtures

This directory contains representative CPS v2 message content fixtures for testing the `renderV2Message` SSR path.

## Fixture Shape

The fixtures use the CPS v6 block schema with the following structure:

```json
{
    "id": "unique-id",
    "type": "message-type",
    "offer_types": ["OFFER_TYPE_1", "OFFER_TYPE_2"],
    "priority_rules": [
        {
            "type": "ELIGIBLE",
            "min_amount": "0.00",
            "max_amount": "0.00"
        }
    ],
    "content": {
        "main_items": [
            { "type": "IMAGE", "name": "logo", "source_url": "..." },
            { "type": "TEXT", "text": "..." },
            { "type": "TEXT_VARIABLE", "variable_name": "..." }
        ],
        "action_items": [{ "type": "LINK", "text": "Learn more", "click_url": "..." }],
        "disclaimer_items": [{ "type": "TEXT", "text": "..." }]
    }
}
```

## Block Types Exercised

### Main Items

-   **IMAGE**: PayPal logo or brand imagery
-   **TEXT**: Headline/body copy
-   **TEXT_VARIABLE**: Placeholder for dynamic content (e.g., amount-based messaging)

### Action Items

-   **LINK**: Call-to-action button/link

### Disclaimer Items

-   **TEXT**: Legal/disclosure text

## Usage in Tests/Demos

-   **Local demo**: `demo/standalone.html` - Run via `npm run dev:standalone` with features flag `useRenderV2Message` and navigate to `http://localhost:8080/demo/standalone.html`
-   **Local legacy / v2 comparison demo**: `demo/standalone-v2-comparison.html` - Run via `npm run dev:v2-comparison` and navigate to `http://localhost:8080/demo/standalone-v2-comparison.html` for side-by-side legacy vs v2 rendering
-   **Snapshot page**: `demo/snapshot/banner.html` - Querystring-driven page; feature flag injected via test setup when `BANNER_SNAPSHOT_MODE='v2Renderer'` is set
-   **Snapshot routing**: v2 snapshots are automatically routed to `./tests/functional/snapshots/v2Renderer/` when v2 test mode is active (configured in `createBannerTest.js`)
-   **Functional tests**: Use `features: 'useRenderV2Message'` in config to route to v2 path; see `tests/functional/spec/non-snapshot-tests/v2-renderer-path.test.js`

## Future Work

These fixtures will be evolved to full visual parity as the `renderV2Message` Preact/v6 renderer is implemented. The current harness preserves SSR wiring and message iframe/container flow independent of final styling.
