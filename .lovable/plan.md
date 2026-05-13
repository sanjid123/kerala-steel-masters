# Goal

Keep the Service Area Explorer card (hero + services page) as a **pure search box**. Submitting a pincode or town navigates to a dedicated results page. No inline results, no helper hint paragraph.

# Changes

### 1. New route — `src/routes/service-areas.tsx`
- Reads `?q=<pincode-or-town>` from search params.
- Runs `lookupPincode` / falls back to `searchPincodes` for town names.
- Renders the existing `FoundResult` / `OutsideKerala` / `ErrorState` / `LoadingState` UI (extracted from `ServiceAreaExplorer.tsx`) inside a normal page layout (Header + container + Footer already provided by `__root.tsx`).
- Shows the same search box at the top so users can search again.
- Adds proper `head()` meta: title "Service Areas — PS Steels", description about Kerala-wide pincode coverage.

### 2. Refactor `src/components/site/ServiceAreaExplorer.tsx`
- Remove the entire result panel block (lines 190–203) and the `IdleHint`, `LoadingState`, `ErrorState`, `OutsideKerala`, `FoundResult`, `Detail` sub-components.
- Remove all result/lookup state: `status`, `result`, `runLookup`, related `useMemo` for towns/primaryCity.
- On submit (and on suggestion click / Enter on highlighted suggestion), use `useNavigate()` from `@tanstack/react-router` to push `/service-areas?q=<digits-or-town>`.
- Keep header (eyebrow, title, subtitle), search input with autocomplete suggestions, Search button.
- The card becomes a single rounded box (no white lower panel).

### 3. Move shared result components
- Extract `FoundResult`, `OutsideKerala`, `ErrorState`, `LoadingState`, `Detail` into the new route file (or a small `src/components/site/ServiceAreaResult.tsx` if cleaner — single import surface).

### 4. No changes needed in
- `src/routes/index.tsx` — still renders `<ServiceAreaExplorer />` in the hero right column.
- `src/routes/services.tsx` — still renders it above the SEO intro.
- `src/lib/pincodes.ts` — lookup logic untouched.

# Out of scope
No styling overhaul, no nav/header changes, no new design tokens, no removal of the explorer from hero/services.

# Risk
Low. One new route, one component slimmed, helper components moved. Type-safe `Link`/`navigate` to the new `/service-areas` route is added before any usage so the TanStack route tree compiles.
