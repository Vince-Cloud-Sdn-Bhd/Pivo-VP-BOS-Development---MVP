# PIVO Clickable MVP

Frontend-only, deterministic demonstration of the PIVO property lifecycle. All data is synthetic and held in memory; no backend or real integration is used.

## Run

```sh
npm install
npm run dev
npm run type-check
npm test
npm run build
npm run test:e2e
```

Generate review screenshots with `CAPTURE_SCREENS=1 npm run test:e2e -- tests/e2e/capture.spec.ts`.

The Vite server runs at `http://127.0.0.1:5179`.

## Public demo

The `main` branch deploys automatically to GitHub Pages through
`.github/workflows/deploy-pages.yml`.

Public URL:
`https://vince-cloud-sdn-bhd.github.io/Pivo-VP-BOS-Development---MVP/`

## Personas

The login screen provides staff, developer, agent, Bank A/B, Legal Firm A/B, three purchasers, landowner and fund-partner personas. The header persona switcher changes the active operational role and re-evaluates route access.

## Implemented

- Project lifecycle, inventory, pricing, agency scope and import preview
- Holds, guided booking, booking/case lanes, approvals and Customer Success
- Bank and legal partner portals, documents, appointments, developer and handover
- Purchaser home, progress, payments, documents, help and public booking
- Maker-checker finance, fees, remittance, refunds, bills, reconciliation and campaigns
- Nexus, reports, control room/action register, deterministic assistant, governance
- Preview/future-service screens and a 15-step demo walkthrough at `/demo/walkthrough`

## Preview or subject to confirmation

- Channel A hosted payment remains disabled in seeded data.
- AI, scorecards, recognition, JV securities review, AutoCount, government adapters, WhatsApp and MHP import are preview/demo surfaces.
- Business calendar, retention, provider routes, campaign fee order, language rollout and AutoCount edition remain `TO CONFIRM`.

See `ASSUMPTIONS.md` and `QUALITY_REPORT.md`.
