# TripTracker PWA - Delivery Package

## Overview
This package contains OpenAPI, xstate machine, Dexie schema, React component skeletons, mock server, Puppeteer export worker, test skeletons, and build config. Use this to bootstrap development and automated execution by an AI model or dev team.

## Files
- openapi.yaml
- machine.xstate.json
- dexie-schema.ts
- components/* (React TSX components + CSS)
- mock-server.js
- export-worker.js
- export-template.html
- tests/* (Playwright skeleton)
- package.json, tsconfig.json
- README.md
- env.example

## Quick start (local dev)
1. Install dependencies:
   - Backend mock: `npm install express body-parser`
   - Puppeteer worker: `npm install puppeteer`
   - Frontend: `npm install` (React deps in package.json)
2. Start mock server:
   - `node mock-server.js`
3. Run frontend dev server (configure webpack or use CRA scaffolding)
4. Run export (example):
   - `node export-worker.js export-template.html output.pdf`

## Acceptance Criteria
- OpenAPI endpoints respond from mock server.
- xstate transitions wired to UI produce expected state flows.
- IndexedDB schema available and read/writable.
- Header dates and sticky shift bar visible and updating.
- Export template prints RTL correctly; Puppeteer produces a PDF.

## Notes
- Replace mock token handling with real auth and integrate real DB.
- Provide real GPS integration for accurate distance.
- Implement full ReportsView, GoalsSettings, syncService, and CI pipeline as next tasks.
