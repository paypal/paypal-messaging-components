# Worked example: Austria

A real run reconstructed against reference PR 1276. All output below is actual,
captured from the scripts in this directory.

---

## The spec

Austria clones Germany — same language, same product shape. Abbreviated; the
full market has 16 mutation modules across two products and 16 dev accounts.

```json
{
    "jira": "DTGPLUPBLR-553",
    "mode": "new-country",
    "targetCountry": "AT",
    "countryName": "Austria",
    "templateCountry": "DE",
    "currency": "EUR",
    "locale": "de-AT",
    "crossBorder": true,
    "products": [
        {
            "name": "GPL",
            "offerType": "PAY_LATER_LONG_TERM",
            "minAmount": 99,
            "maxAmount": 10000,
            "rendersAs": "accordion",
            "mutations": [
                { "file": "gpl_eqz", "offerTypeKey": "GPL:EQZ", "v2Code": "PLLT_NQ_EZ" },
                { "file": "gpl_eqz-non-at", "offerTypeKey": "GPL:EQZ:NON-AT", "v2Code": "PLLT_NQ_EZ_XB" },
                { "file": "generic", "offerTypeKey": "GENERIC" }
            ]
        },
        {
            "name": "Pi30",
            "offerType": "PAY_LATER_PAY_IN_1",
            "minAmount": 1,
            "maxAmount": 2000,
            "rendersAs": "cards",
            "mutations": [{ "file": "pi30nq", "offerTypeKey": "PI30NQ", "v2Code": "PLP1_NQ" }]
        }
    ],
    "devAccounts": [
        { "slug": "ATPLEQZ", "modalTypes": ["long_term"], "contentFile": "gpl_eqz" },
        { "slug": "XBATPLQEQZ", "modalTypes": ["long_term"], "contentFile": "gplq_eqz-non-at" },
        { "slug": "ATGENERIC", "modalTypes": ["product_list"], "contentFile": "generic" }
    ],
    "scenarios": ["base", "belowMin", "aboveMax", "crossBorder", "multiProduct"]
}
```

`crossBorder: true` is why half the modules carry a `-non-at` suffix and the
`:NON-AT` dispatch keys. It doubles the module count.

`rendersAs` decides which shared gating array each product's account joins in
the snapshot specs. `accordion` is the European long-term shape.

---

## Source: dry run first

```
$ node tools/scripts/apply-geo-source.js --spec geo-at.spec.json --dry-run

spec        : DTGPLUPBLR-553  DE -> AT  (new-country)
branch      : feature/DTGPLUPBLR-553-geo-expansion-at
locale tree : 44 new file(s), 0 already present
registration: import + switch case to add
dev accounts: 16 to add, 0 already present
```

Then the review list — the script separates what it can do from what it cannot:

```
REVIEW — 30 cloned file(s) carry DE copy that must be
replaced with target-market copy from the PRD or Figma. The clone gives you the
structure; it does not give you the language.
```

Cloning is exact and instant. The German copy inside is yours to replace.

## What registration produces

```diff
  import CA from './CA';
+ import AT from './AT';

          case 'DE':
              return DE(offerType);
+         case 'AT':
+             return AT(offerType);
```

Germany's signature takes `offerType`, so Austria's does too. Great Britain's
would have been bare. The script reads this rather than assuming.

## Dev account keys

Generated from the slugs, all exactly 13 characters:

```
DEV000ATPLEQZ   DEV000ATPLGTZ   DEV00ATPLQEQZ   DEV00ATPLQGTZ
DEVXBATPLQEQZ   DEVXBATPLQGTZ   DEV00ATPI30NQ   DEV000ATPI30Q
DEV0000ATPI30   DEVXBATPI30NQ   DEV0XBATPI30Q   DEV00XBATPI30
DEV0ATGENERIC   DEV000XBATGEN   DEV000ATMULTI   DEV0XBATMULTI
```

All sixteen match what PR 1276 shipped by hand, byte for byte.

## Re-running

```
$ node tools/scripts/apply-geo-source.js --spec geo-at.spec.json

locale tree : 0 new file(s), 44 already present
registration: already registered
dev accounts: 0 to add, 16 already present

no-op: everything already applied
```

---

## Unit tests: the gate catching a real gap

Run against the merged Austria market as it exists on `develop` today:

```
$ node tools/scripts/apply-geo-unit-tests.js --spec geo-at.spec.json --check

ERROR=coverage gap: generic x jest.mock + test.each row
ERROR=coverage gap: generic-non-at x jest.mock + test.each row
ERROR=coverage gap: pi30nq x jest.mock + test.each row
ERROR=coverage gap: pi30-non-at x jest.mock + test.each row
ERROR=coverage gap: pi30q-non-at x jest.mock + test.each row
ERROR=coverage gap: pi30nq-non-at x jest.mock + test.each row
exit=1
```

**These six shipped.** Six modules dispatching Austrian offer types that no test
has ever exercised — 37.5% of the market. This is what the gate is for, and it
is not hypothetical.

Applying closes them:

```
  modules in spec    : 16
  jest.mock to add   : 6
  test.each to add   : 6
```

producing blocks in the file's existing idiom:

```js
jest.mock('server/locale/AT/Pi30/mutations/pi30nq', () => ({
    'layout:text': ['text', 'AT', 'PI30NQ'],
    'layout:flex': ['flex', 'AT', 'PI30NQ']
}));
```

and rows in the table:

```js
            ['AT', 'PI30NQ'],
```

The suite goes from 32 passing to 38 passing. A second run reports
`no-op: all 16 AT module(s) already covered`.

---

## Content: what to check

Structure is cloned from Germany; every string is replaced from the PRD or
Figma. Then verify each file:

-   every `{token}` in copy is declared in `meta.variables`
-   no `snake_case` tokens survive — this repo uses `formattedMinAmount`, upstream
    uses `formatted_min_amount`, and an unconverted copy-paste is currently live
    in the Italian modal content
-   each variable points at the field it names
-   amounts match both the PRD and the functional config

For Austria, upstream had **no** counterpart for any of the 16 message files.
Every one came from Figma or the PRD. Expect that.

---

## The two gates

After verification and before committing, present the diff, the baseline
comparison, and the generated keys, and wait for explicit approval. Then again
before pushing, with the full pre-push report. Neither is skippable in
interactive mode.
