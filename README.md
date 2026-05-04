# Ecommerce — Automation Suite
## Playwright + TypeScript | Page Object Model

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18 LTS or higher |
| npm | 9+ |
| OS | Windows / macOS / Linux |

---

## Quick Start (single command)

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Run the full test suite
npm test
```

That's it. All 8+ E2E scenarios run headlessly and generate an HTML report in `/playwright-report`.

---

## Project Structure

```
wtf-gyms-qa/
├── pages/                     # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
├── tests/
│   ├── login.spec.ts          # Login scenarios (data-driven)
│   ├── inventory.spec.ts      # Sorting & product listing
│   ├── cart.spec.ts           # Add/remove items, badge count
│   └── checkout.spec.ts       # Full checkout + validation
├── fixtures/
│   └── users.json             # Data-driven test credentials
├── playwright.config.ts
├── package.json
└── README.md
```

---

## View HTML Report

After running tests:

```bash
npx playwright show-report
```

---

## Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

---

## CI (GitHub Actions)

A `.github/workflows/playwright.yml` is included. The suite runs on every push and pull request to `main`. Results are published as a GitHub Actions artifact.

---

## Data-Driven Tests

Login tests are parameterised via `fixtures/users.json`. Three scenarios are included:
- Valid credentials → successful login
- Locked-out user → correct error message
- Invalid password → correct error message

To add more cases, append entries to `fixtures/users.json` and re-run.
