# The Dental Barns Cookie Consent

Production two-choice cookie consent implementation used by The Dental Barns.

## Production asset

- `tdb-cookie-consent.min.js`
- Current version: `3.0.0`
- Cookie name: `CookieScriptConsent`
- Choices: `Accept all` and `Essential only`
- Consent expiry: 30 days

## Behaviour

- Preserves the CookieScript-compatible public API and events required by `tdb-consent.js`.
- Runs the approved panel and text animation on desktop and mobile.
- Panel duration: 420ms.
- Text entry: 70ms delay plus 350ms motion, finishing with the panel.
- Text enters and exits in the positive Y direction.
- Motion is intentionally always enabled for this component.

## Deployment

The Webflow immediate runtime loads one SHA-pinned production asset from jsDelivr. The footer runtime must not load a second CookieScript implementation.

Files ending in `-test.js` are historical staging experiments and are not production dependencies.
