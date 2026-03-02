# CJM-Fleet-BOT

[![CI](https://github.com/juliusjay9-lang/CJM-Fleet-BOT/actions/workflows/ci.yml/badge.svg)](https://github.com/juliusjay9-lang/CJM-Fleet-BOT/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/juliusjay9-lang/CJM-Fleet-BOT/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/juliusjay9-lang/CJM-Fleet-BOT/actions/workflows/deploy-pages.yml)

Fleet BOT is a lightweight AI-style fleet management system interface for tracking vehicles, checking status, generating daily reports, monitoring maintenance, and supporting FMCSA-oriented compliance workflows from a single dashboard.

## Features

- Vehicle activity overview
- Smart command input (vehicle lookup, active status, report, maintenance)
- Daily report text export
- Quick-start guide download
- Responsive UI for desktop and mobile
- Live dashboard metrics rendered from fleet data
- Installable PWA with offline cache support

## FMCSA compliance support

This project can be used as a front-end foundation for FMCSA-related fleet operations, such as:

- Driver qualification tracking (CDL/medical card/renewal reminders)
- Hours-of-service status visibility (ELD-connected workflows)
- Vehicle maintenance and inspection scheduling
- Incident and safety event logging for internal review
- Documentation support for audit preparation

Note: This project does not automatically certify regulatory compliance by itself. Final FMCSA compliance depends on your connected data sources, operating procedures, and legal/regulatory review.

## FMCSA checklist template

Use this as a practical operations checklist and adapt it to your fleet profile.

### Daily

- Verify driver HOS/ELD status and identify potential violations before dispatch
- Confirm DVIR submissions and resolve out-of-service defects
- Review active vehicle alerts (brake, tire, engine, safety-critical faults)
- Validate trip assignments against driver qualification and endorsements
- Log incidents/near-misses and start internal follow-up

### Weekly

- Audit a sample of logs for HOS accuracy and unassigned driving time
- Review maintenance due list and schedule required preventive service
- Check expiring credentials (CDL, medical certificates, training)
- Reconcile fuel and mileage anomalies for potential misuse or data errors
- Confirm all new incident records have documented actions

### Monthly

- Perform compliance review for driver qualification files completeness
- Confirm periodic inspection records and maintenance documentation retention
- Review safety performance trends and high-risk routes/drivers
- Run mock audit packet preparation (logs, DVIR, maintenance, incidents)
- Update SOPs and retrain staff on recurring compliance gaps

## FMCSA audit packet file list

Prepare and maintain these records in a consistent folder structure for faster internal reviews and external audits.

### Driver qualification

- CDL copies and status verification
- Medical examiner certificates and expiration tracking
- Motor vehicle record (MVR) checks and annual reviews
- Driver application and employment history
- Drug and alcohol testing records (as applicable)

### Hours of service and operations

- ELD logs and edits history
- Supporting documents for log verification (fuel receipts, tolls, bills of lading)
- Unassigned driving time resolution records
- Dispatch and trip assignment records

### Vehicle maintenance and inspections

- DVIR reports and defect resolution proof
- Preventive maintenance schedules and completed work orders
- Periodic/annual inspection reports
- Roadside inspection reports and corrective actions

### Safety and incidents

- Incident and accident register
- Investigation notes and corrective action plans
- Driver coaching or retraining documentation
- Insurance claim references and outcomes

### Administration and policy

- Current fleet safety policies and SOPs
- Compliance training completion logs
- Assigned compliance roles and escalation contacts
- Document retention policy and archive index

## Suggested audit folder tree

Use this structure as a starting point for organizing FMCSA-related records.

```text
fleet-compliance/
	2026/
		terminal-01/
			drivers/
				DRIVER-001/
					qualification/
						cdl/
						medical/
						mvr/
					hos/
						eld-logs/
						supporting-docs/
					incidents/
			vehicles/
				TRUCK-001/
					dvir/
					maintenance/
					inspections/
					roadside/
			reports/
				weekly/
				monthly/
			policies/
			training/
```

### Naming convention (recommended)

- Date-first format: `YYYY-MM-DD`
- Driver files: `YYYY-MM-DD_DRIVER-001_document-type.pdf`
- Vehicle files: `YYYY-MM-DD_TRUCK-001_document-type.pdf`
- Incident files: `YYYY-MM-DD_INCIDENT-####_summary.pdf`

### Versioning and control

- Keep one source-of-truth folder per year and terminal
- Restrict edit access; log who uploaded or changed records
- Archive superseded documents instead of deleting them
- Run a monthly spot-check for missing files by driver and vehicle

## Website setup and build

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Run website in development

```bash
npm run dev
```

Open the local URL shown by Vite (typically `http://localhost:5173`).

### Progressive Web App (PWA)

- Install from supported browsers using “Add to Home Screen” / “Install app”
- Offline cache is enabled through a service worker for core app assets
- Manifest and service worker are configured for root and subpath deployments
- iOS-friendly file export fallback is included for generated reports/guides

### Build production website

```bash
npm run build
```

Production files are generated in `dist/`.

### Deploy to GitHub Pages

Automated deployment is configured via [deploy-pages workflow](.github/workflows/deploy-pages.yml).

- Trigger: push to `main`
- Output: GitHub Pages site from `dist/`
- Build base path: `/CJM-Fleet-BOT/` (set by workflow env)

For local builds, no extra setup is needed (`PUBLIC_BASE` defaults to `/`).

### Preview production build

```bash
npm run preview
```

### Unit tests

Run once:

```bash
npm run test:unit
```

Watch mode:

```bash
npm run test:watch
```

### E2E smoke tests (desktop + mobile viewport)

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

## Mobile app (Capacitor)

This project uses Capacitor to package the same web app as native Android/iOS apps.

### 1) Build and sync web assets

```bash
npm run build
npm run cap:sync
```

### 2) Android

```bash
npm run cap:add:android
npm run mobile:android
npm run cap:open:android
```

Open Android Studio, then run on an emulator or physical device.

### 3) iOS

```bash
npm run cap:add:ios
npm run mobile:ios
npm run cap:open:ios
```

Open Xcode, then run on Simulator or physical device (macOS required).
