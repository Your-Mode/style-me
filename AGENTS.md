# AGENTS.md

## Project Overview
- App: "Style Me" (Next.js App Router)
- Core flow: Home -> Apply -> Complete -> Survey -> Result
- State: React Query + Zustand (persist)
- Backend: Axios calls to `/assistant/*` endpoints
- Data: Firebase Firestore + Analytics

## Repo Structure
- app/: Next.js pages (App Router)
  - page.tsx: landing
  - apply/page.tsx: application form
  - complete/page.tsx: post-apply confirmation
  - survey/page.tsx: chat-based survey
  - result/page.tsx: body-type result + PDF print
- components/: UI + shared behavior (AuthGuard, AnalyticsListener)
- apis/: axios instance + chat/result APIs
- hooks/: React Query + Zustand stores
- lib/: providers + survey data + utils
- firebase.ts: Firebase init + Firestore helpers

## How to Run
- Install deps: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`

## Environment Variables
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

## Development Rules
- Prefer App Router conventions (server/client components split)
- Keep UI in `components/ui` for shared atoms
- Keep network calls in `apis/` and hook wrappers in `hooks/`
- Use Zustand stores only for cross-page state; otherwise prefer local state
- Avoid hardcoding API URLs; use `NEXT_PUBLIC_API_URL`
- Keep Firestore access in `firebase.ts`

## Contribution Guide
- Before editing, locate the owning page or hook
- Keep styles consistent with existing Tailwind patterns
- If you add new pages, update navigation links as needed
- If you change survey flow, update `lib/survey-data.ts`
- If you touch auth flow, check `components/auth-guard.tsx` and localStorage keys

## Notes / Known Issues
- UI text mentions 17 questions, but `lib/survey-data.ts` currently has 15
- Auth token key mismatch: `AuthGuard` sets `authToken`, `SurveyPage` reads `aFfuthToken`
- Photo upload is local preview only (no upload/storage)
