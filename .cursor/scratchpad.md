# Background and Motivation

## New UI Task: Navbar dropdown on hover (Servizi, Info)

The user wants to **redo the hover dropdown menus** for the marketing site navbar items:
- **Servizi**
- **Info**

Goal: a delightful, consistent, **accessible** dropdown experience (hover for pointer devices, click for touch), matching the current site design.

## New UI Task: Events page (marketing)

The user wants a new **Events** marketing page, taking strong inspiration from the layout/feel of:
- `acctual.com` homepage (hero, section rhythm, typographic hierarchy)
- `acctual.com/about` (mission-style storytelling blocks)
- `acctual.com/teams` (card grids, feature callouts, pricing-like structure)
- `acctual.com/blog` (list/feed layout patterns)

Goal: ship a **new `/info/eventi` page** in the marketing site that recreates the **overall Acctual-like visual style** (elements, UI, appearance, density, rhythm), while keeping **DataWeb’s own text/content** as the source of truth.

Content sources (copy + event list):
- Events copy/list: `dataweb-srl.it/eventi`
- News copy: `dataweb-srl.it/novita`
- Case studies copy: `dataweb-srl.it/casi-studio`
- About copy: `dataweb-srl.it/chi-siamo`

Important: We will NOT copy Acctual’s text, brand phrases, logos, or proprietary imagery. We will recreate the *style system* and section patterns with DataWeb’s content.

## New Feature: Admin Panel

The user needs a comprehensive admin panel to:
- Control and manage waitlist users
- Manage active users
- View app activity and statistics
- Ban/unban users
- Follow the same design patterns and style as the existing application

The admin panel should be accessible only to admin users and provide a complete dashboard for managing the application.

---

## Previous Task (Completed): Next.js 16 Suspense Issue

We had a Next.js 16 App Router error on route `/dashboard/decks/[id]/settings`:

- "Blocking Route: Uncached data was accessed outside of <Suspense>"

The route currently awaits `params` and fetches deck data via `getDeck(id)` at the top-level of the page component. This blocks route streaming and triggers the Next.js 16 warning/error.

# Key Challenges and Analysis

## Navbar hover dropdown challenges

1. **Accessibility first (keyboard + screen readers)**:
   - Hover-only menus are not sufficient; triggers must work via keyboard (Enter/Space) and expose state via ARIA.
   - Focus must not get “lost” when moving between trigger and panel; Escape should close and restore focus.

2. **Pointer vs touch behavior**:
   - Hover behaviors must be limited to pointer devices to avoid “sticky hover” on touch.
   - Touch devices should use tap/click to open/close reliably.

3. **Don’t rebuild primitives by hand**:
   - Use an existing accessible menu primitive already in the codebase (Radix/Base UI/etc).
   - Avoid mixing different primitive systems within the same interaction surface.

4. **Motion constraints**:
   - Only add animations if they already exist or are explicitly desired.
   - If present, keep interactions ≤200ms and honor `prefers-reduced-motion`.

## Admin Panel Challenges

**UPDATE: Using Better Auth Admin Plugin**

We'll use Better Auth's built-in admin plugin which provides:
- User management (create, list, update, ban/unban, remove)
- Role management (set roles, check permissions)
- Session management (list, revoke sessions)
- Impersonation functionality
- Access control with custom permissions

The plugin automatically handles:
- Database schema (adds `role`, `banned`, `banReason`, `banExpires` to user table)
- Admin authentication and authorization
- API endpoints for all admin operations

1. **Database Schema**:
   - Better Auth admin plugin will add required fields automatically via migration
   - Need to create a `waitlist` table for managing waitlist entries
   - Need to track user activity for analytics (optional)

2. **Plugin Integration**:
   - Add admin plugin to server auth config
   - Add admin client plugin to client auth config
   - Run migrations to add admin fields

3. **Custom Features**:
   - Waitlist management (custom implementation)
   - Activity tracking and statistics (custom implementation)
   - Statistics dashboard (custom implementation)

4. **UI/UX Design**:
   - Follow existing design patterns (rounded corners, card-based layouts)
   - Use same color scheme and typography
   - Create responsive admin dashboard
   - Implement data tables with sorting and filtering
   - Add statistics cards and charts
   - Use Better Auth admin client methods for user management

## Previous Task Analysis

- `getDeck(id)` calls `fetch()` (cookie-based auth; `credentials: "include"`) which Next considers **uncached**.
- In Next.js 16, **uncached data access must be inside a `<Suspense>` boundary** to allow the route to stream a shell immediately.
- The stack trace points to `await params`, but the fundamental issue is "top-level async work" (including `params` + `fetch`) happening outside Suspense.

## Events page challenges

1. **“Recreate style” without copying brand assets**:
   - We will replicate *patterns* (typography scale, spacing rhythm, card/border/shadow language, button treatment, section composition) from Acctual-like references.
   - We must avoid copying Acctual’s brand phrases/logos/illustrations; use **DataWeb brand** (colors, logo, existing assets in repo).

2. **Copy ingestion (from DataWeb pages) → structured UI**:
   - We’ll map the existing Events list into a typed schema (title, city, date range, “Scopri di più” link target).
   - We’ll also pull a small amount of supporting copy from “Novità / Casi Studio / Chi Siamo” to fill the non-list sections (hero/supporting text, “why attend”, CTA).

3. **Performance + UX**:
   - Keep it mostly server-rendered (RSC) and avoid heavy client state.
   - Use `next/image` for images, avoid CLS, and ensure mobile layouts are first-class.

4. **Accessibility**:
   - Strong heading structure (`h1` → `h2`…), keyboard-friendly event cards/links, and good focus rings.
   - Make sure any “filters” are either real controls (and accessible) or omitted until needed.

# High-level Task Breakdown

## Phase 0: Marketing site navbar hover dropdown (Servizi, Info)

### Task 0.1: Audit current `Header` nav implementation
- **Approach**: Inspect `apps/web/src/components/header.tsx` to identify:
  - Which primitive is currently used for menus (if any)
  - Current DOM structure and focus handling
  - Mobile nav behavior and whether “Servizi/Info” are duplicated for mobile
- **Success criteria**:
  - We can clearly point to the current trigger + panel code for both menus
  - We identify the existing primitive system to reuse (or confirm none exists)

### Task 0.2: Implement hover-open for pointer devices (Servizi, Info)
- **Approach**:
  - Keep the menus **controlled** (`open` state) so hover, focus, and click remain consistent.
  - Open on `pointerenter` / close on `pointerleave` **only** when `(hover: hover) and (pointer: fine)` is true.
  - Use a short close delay (e.g. 80–150ms) to prevent accidental close when moving between trigger and panel.
- **Success criteria** (manual):
  - Hovering “Servizi” opens its panel; moving pointer away closes it
  - Same behavior for “Info”
  - Moving pointer from trigger → panel does **not** flicker/close prematurely

### Task 0.3: Ensure full keyboard support
- **Approach**:
  - Triggers must be focusable and toggle via Enter/Space.
  - Arrow keys navigate items (or rely on the chosen primitive to handle this).
  - Escape closes and returns focus to the trigger.
  - Add any missing ARIA/state props required by the primitive.
- **Success criteria** (manual):
  - Tab to “Servizi”, press Enter/Space to open
  - Arrow keys navigate items
  - Escape closes and returns focus to the trigger

### Task 0.4: Mobile behavior parity
- **Approach**:
  - On touch devices: tap opens/closes; no hover side effects.
  - Ensure large hit targets (≥44px) and no dead zones.
- **Success criteria** (manual):
  - On mobile simulator: tap “Servizi/Info” opens and can be closed; no “stuck hover”

### Task 0.5: Visual polish + consistency checks
- **Approach**:
  - Match spacing, radii, shadows, and typography to existing header styling.
  - Avoid new gradients or glow effects.
  - If animations exist: keep them ≤200ms, transform/opacity only, and add reduced-motion variant.
- **Success criteria**:
  - Dropdown feels consistent with existing UI and doesn’t introduce layout shift or accidental scrollbars
  - No regressions for other nav items

---

## Phase 0b: Marketing site Eventi page (`/info/eventi`)

### Task 0b.1: Decide content + IA (information architecture)
- **Approach**:
  - Define the sections we want, mirroring the **Acctual-like** *elements + appearance*:
    - Hero (big typographic headline + short supporting paragraph + primary/secondary CTA)
    - “Upcoming events” (card grid)
    - “Why come / what you’ll learn” (feature grid)
    - “Past events” (feed/list style, blog-like)
    - CTA strip (newsletter / “request an invite”)
    - Footer (reuse existing)
  - Decide whether we need filters (type, city, online/in-person). If not, keep it simple and fast.
- **Success criteria**:
  - We have a final section list and a minimal event schema defined in the plan (see Task 0b.3).
  - We identify exactly which DataWeb pages supply copy for each section (hero, CTA, supporting blocks).

### Task 0b.2: Add the route and SEO metadata
- **Approach**:
  - Create `apps/web/src/app/info/eventi/page.tsx` (Server Component by default).
  - Add `export const metadata` with page title/description aligned with the brand voice.
  - Ensure the page uses existing global layout (`apps/web/src/app/layout.tsx`) and shared `Header`/`Footer` patterns already in use.
- **Success criteria** (manual):
  - Visiting `/info/eventi` renders without errors.
  - `<title>` and meta description match “Events” context.

### Task 0b.3: Create a small, typed Events data source (static-first)
- **Approach**:
  - Add a small file like `apps/web/src/lib/events.ts` that exports:
    - `interface MarketingEvent { ... }` (no `any`)
    - `UPCOMING_EVENTS` and `PAST_EVENTS` arrays
  - Keep dates ISO strings and format on the server for locale correctness.
- **Success criteria**:
  - The events page renders both Upcoming and Past sections from this data source.
  - TypeScript strictness passes for the new types/usage.

### Task 0b.4: Build the UI sections (Acctual-inspired, original execution)
- **Approach**:
  - Implement section components under `apps/web/src/components/` (or keep inline if tiny), reusing existing UI primitives and styles.
  - Visual direction (Acctual-like, but using DataWeb content and assets):
    - Oversized, friendly headlines with tight leading
    - Subtle borders, layered shadows, rounded cards
    - “Editorial” spacing and short, punchy labels
    - Blog-like list treatment for Past events
  - Use `next/image` for any decorative images; keep them `aria-hidden` if decorative.
- **Success criteria** (manual):
  - Page looks good on mobile, tablet, and desktop (no horizontal scroll).
  - Cards are clickable, have visible focus rings, and read well with a screen reader.

### Task 0b.5: Add Events link to the header nav
- **Approach**:
  - Add an “Events” link in `apps/web/src/components/header.tsx` in desktop + mobile nav.
  - Ensure it’s a real link (supports Cmd/Ctrl click).
- **Success criteria** (manual):
  - “Events” appears in nav on desktop and mobile.
  - Clicking it navigates to `/info/eventi`.

### Task 0b.6: Quality checks (lint/types + basic a11y sanity)
- **Approach**:
  - Run lint and type checks for the web app (and fix issues introduced by the new page/components).
  - Quick accessibility sanity:
    - One `h1`
    - Logical tab order
    - No interactive divs
- **Success criteria**:
  - Lint + typecheck pass for touched files.
  - No obvious accessibility regressions in the Events page.

## Phase 1: Better Auth Admin Plugin Setup

### Task 1.1: Add admin plugin to server auth config
- **Approach**: Import and add `admin()` plugin to the auth config in `packages/auth/src/index.ts`
- **Success criteria**:
  - Plugin imported from `better-auth/plugins`
  - Plugin added to plugins array
  - No TypeScript errors

### Task 1.2: Add admin client plugin to client auth config
- **Approach**: Import and add `adminClient()` plugin to the auth client in `apps/web/src/lib/auth-client.ts`
- **Success criteria**:
  - Plugin imported from `better-auth/client/plugins`
  - Plugin added to plugins array
  - No TypeScript errors

### Task 1.3: Run migrations to add admin fields
- **Approach**: Run Better Auth CLI migration to add `role`, `banned`, `banReason`, `banExpires` fields to user table
- **Success criteria**:
  - Migration runs successfully
  - Database schema updated
  - Existing users have default `role: "user"` and `banned: false`

### Task 1.4: Create waitlist table
- **Approach**: Create new `waitlist` table in `packages/db/src/schema.ts` with fields: id, email, name (optional), createdAt, updatedAt, status (pending/approved/rejected)
- **Success criteria**:
  - Table created with proper indexes
  - Schema exported and types generated
  - Migration created and applied

### Task 1.5: Create activity log table (optional but recommended)
- **Approach**: Create `activity_log` table to track user actions (login, logout, study sessions, etc.)
- **Success criteria**:
  - Table created with proper indexes
  - Can efficiently query recent activity

## Phase 2: Backend API Implementation

### Task 2.1: Create waitlist API routes
- **Approach**: Create Elysia routes for waitlist management (Better Auth admin handles user management):
  - GET `/api/admin/waitlist` - List all waitlist entries (with pagination/filtering)
  - POST `/api/admin/waitlist/:id/approve` - Approve waitlist entry
  - POST `/api/admin/waitlist/:id/reject` - Reject waitlist entry
  - DELETE `/api/admin/waitlist/:id` - Delete waitlist entry
- **Success criteria**:
  - All routes protected by admin check (using Better Auth session)
  - Proper validation and error handling
  - Follows Elysia patterns

### Task 2.2: Create statistics API routes
- **Approach**: Create routes for:
  - GET `/api/admin/stats/overview` - Overall app statistics (total users, active users, study sessions, etc.)
  - GET `/api/admin/stats/activity` - Activity statistics (daily/weekly/monthly)
  - GET `/api/admin/stats/users` - User growth statistics
- **Success criteria**:
  - Returns aggregated statistics
  - Efficient queries (use indexes)
  - Proper date range filtering
  - Protected by admin check

## Phase 3: Frontend Implementation

### Task 3.1: Create admin layout and navigation
- **Approach**: Create `/app/admin` route with layout, sidebar navigation, and protected route wrapper
- **Success criteria**:
  - Only accessible to admin users
  - Redirects non-admin users
  - Follows existing design patterns
  - Responsive navigation

### Task 3.2: Create waitlist management page
- **Approach**: Create `/app/admin/waitlist` page with:
  - Table showing waitlist entries
  - Search and filter functionality
  - Approve/Reject/Delete actions
  - Pagination
- **Success criteria**:
  - Matches existing design style
  - All actions work correctly
  - Proper loading and error states

### Task 3.3: Create user management page
- **Approach**: Create `/app/admin/users` page using Better Auth admin client methods:
  - Table showing all users (using `authClient.admin.listUsers()`)
  - Search, filter, and sort functionality (using Better Auth query params)
  - User details modal/drawer
  - Ban/Unban actions (using `authClient.admin.banUser()` / `authClient.admin.unbanUser()`)
  - Set role action (using `authClient.admin.setRole()`)
  - View user sessions (using `authClient.admin.listUserSessions()`)
  - Impersonate user (using `authClient.admin.impersonateUser()`)
- **Success criteria**:
  - Matches existing design style
  - All Better Auth admin methods work correctly
  - Proper loading and error states
  - Responsive table
  - Pagination works correctly

### Task 3.4: Create statistics dashboard
- **Approach**: Create `/app/admin/stats` page with:
  - Overview cards (total users, active users, etc.)
  - Activity charts (line/bar charts)
  - Recent activity feed
  - User growth visualization
- **Success criteria**:
  - Matches existing design style
  - Charts render correctly
  - Data updates properly
  - Responsive layout

### Task 3.5: Create activity log page
- **Approach**: Create `/app/admin/activity` page with:
  - Filterable activity log table
  - User, action type, and date filters
  - Pagination
- **Success criteria**:
  - Matches existing design style
  - Filters work correctly
  - Efficient loading

## Phase 4: Testing and Polish

### Task 4.1: Test all admin functionality
- **Approach**: Manually test all admin routes and UI components
- **Success criteria**:
  - All CRUD operations work
  - Proper error handling
  - Non-admin users cannot access

### Task 4.2: Add loading states and error handling
- **Approach**: Ensure all async operations have proper loading states and error messages
- **Success criteria**:
  - No unhandled errors
  - User-friendly error messages
  - Proper loading indicators

### Task 4.3: Verify design consistency
- **Approach**: Review all admin pages to ensure they match existing design patterns
- **Success criteria**:
  - Consistent spacing, colors, typography
  - Same rounded corners and card styles
  - Responsive on all screen sizes

---

## Previous Tasks (Completed)

### Task 1: Refactor `/dashboard/decks/[id]/settings` to stream via `<Suspense>`
- **Status**: Completed
- **Success criteria**: Met

### Task 2: Verify no new lints/type errors
- **Status**: Completed
- **Success criteria**: Met

# Project Status Board

## Marketing Site Navbar
- [ ] Task 0.1: Audit current `Header` nav implementation
- [ ] Task 0.2: Implement hover-open for pointer devices (Servizi, Info)
- [ ] Task 0.3: Ensure full keyboard support
- [ ] Task 0.4: Mobile behavior parity
- [ ] Task 0.5: Visual polish + consistency checks

## Marketing Site Eventi Page
- [ ] Task 0b.1: Decide content + IA (information architecture)
- [ ] Task 0b.2: Add the route and SEO metadata (`/info/eventi`) — DONE (pending your confirmation)
- [ ] Task 0b.3: Create typed events data source (static-first) — DONE (pending your confirmation)
- [ ] Task 0b.4: Build the UI sections (original, Acctual-inspired) — IN PROGRESS
- [ ] Task 0b.5: Add “Events” link to header nav (desktop + mobile)
- [ ] Task 0b.6: Quality checks (lint/types + a11y sanity)

## Marketing Site Casi Studio Page
- [ ] Task 0c.1: Add full-height hero carousel (newest project) using Motion Plus — DONE (builds; using Motion fallback until Motion+ token)
- [ ] Task 0c.2: Add carousel controls bar near bottom (thumbs + arrows)
  - Notes: removed arrows; normalized outline path length to fix start/overflow.
- [ ] Task 0c.3: Add “past projects” section that appears on scroll
- [ ] Task 0c.4: Quality checks (lint/types)

## Admin Panel Implementation

### Phase 1: Database Schema
- [x] Task 1.1: Add admin and ban fields to user table (via Better Auth admin plugin)
- [x] Task 1.2: Create waitlist table
- [ ] Task 1.3: Create activity log table (optional, skipped for now)

### Phase 2: Backend API
- [x] Task 2.1: Create admin middleware
- [x] Task 2.2: Create waitlist API routes
- [x] Task 2.3: User management handled by Better Auth admin plugin (no custom routes needed)
- [x] Task 2.4: Create statistics API routes

### Phase 3: Frontend
- [x] Task 3.1: Create admin layout and navigation
- [x] Task 3.2: Create waitlist management page
- [x] Task 3.3: Create user management page (using Better Auth admin client)
- [x] Task 3.4: Create statistics dashboard
- [ ] Task 3.5: Create activity log page (optional, skipped for now)

### Phase 4: Testing and Polish
- [ ] Task 4.1: Test all admin functionality
- [x] Task 4.2: Add loading states and error handling
- [x] Task 4.3: Verify design consistency (matches existing design patterns)

---

## Previous Tasks (Completed)
- [x] Task 1: Add Suspense boundary + move async work to child
- [x] Task 2: Run lint/type checks for touched files
- [x] Task 3: Persist breadcrumb CSS preview changes for deck settings page
- [x] Task 4: Make deck settings right-hand sidebar width flexible

# Current Status / Progress Tracking

## Admin Panel - Implementation Complete

- **Status**: ✅ Implementation complete - ready for testing
- **Completed**: All core admin panel features implemented
- **Approach**: Used Better Auth admin plugin for user management, custom routes for waitlist and stats
- **Design**: Matches existing UI patterns (rounded corners, card layouts, SF Pro Rounded font, Tailwind CSS)

### What Was Implemented:

1. **Better Auth Admin Plugin Integration**:
   - Added admin plugin to server and client configs
   - Migration applied successfully (admin fields added to user table)
   - Admin middleware created to protect admin routes

2. **Database Schema**:
   - Admin fields added: `role`, `banned`, `banReason`, `banExpires` on user table
   - `impersonatedBy` field added to session table
   - Waitlist table created with proper indexes

3. **Backend API Routes**:
   - `/api/admin/waitlist` - List, approve, reject, delete waitlist entries
   - `/api/admin/stats/overview` - Overall app statistics
   - `/api/admin/stats/activity` - Activity statistics (daily/weekly/monthly)
   - `/api/admin/stats/users` - User growth statistics
   - All routes protected by admin middleware

4. **Frontend Admin Panel**:
   - Admin layout with navigation (`/admin`)
   - Overview dashboard with statistics cards (`/admin`)
   - User management page using Better Auth admin methods (`/admin/users`)
   - Waitlist management page (`/admin/waitlist`)
   - All pages follow existing design patterns

## Marketing Site Eventi Page (`/info/eventi`)

- **Status**: Task 0b.2 implemented — awaiting your quick manual check
- **What changed**:
  - Added a new Next.js App Router route at `apps/web/src/app/info/eventi/page.tsx`
  - Added page-level SEO metadata (`title`, `description`)
  - Added the first Acctual-like UI pass for the main content:
    - Upcoming events as a card grid
    - Past events as a clean “feed/list”
- **Verification**:
  - `apps/web` production build succeeds and `/info/eventi` is included in the generated routes list

## Marketing Site Navbar (Phase 0)

### Task 0.1 Audit: current `Header` nav implementation (Servizi, Info) — DONE (pending your confirmation)

**Where it lives**
- Desktop nav: `apps/web/src/components/header.tsx` inside `<nav className="hidden ... lg:flex ...">`
  - “Servizi dropdown”: around the inline IIFE starting near `/* Servizi dropdown */`
  - “Info dropdown”: around the inline IIFE starting near `/* Info dropdown */`
- Mobile nav: same file, inside the animated side panel (`mobileMenuOpen`) under `/* Mobile Navigation Items */`

**Primitive system currently used (desktop)**
- Uses `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent` imported from `@/components/ui/dropdown-menu` (shadcn/Radix-style wrapper).
- The menu is **controlled** via `open={isOpen}` where `isOpen = desktopOpenMenu === name`.

**How open/close works today (desktop)**
- Open is driven by hover handlers on a wrapper `<div>`:
  - `onMouseEnter={() => handleHoverEnter(name)}` → `setDesktopOpenMenu(name)`
  - `onMouseLeave={() => handleHoverLeave(name)}` → delayed close (150ms) via `closeTimeoutRef`
- `DropdownMenuContent` repeats the same enter/leave handlers to avoid closing while moving into the panel.
- `onOpenChange` currently only handles **closing**:
  - If `open` becomes `false` → `setDesktopOpenMenu(null)`
  - There is no path that sets `desktopOpenMenu` when `open` becomes `true`
  - Practical consequence: **click / keyboard toggle likely won’t open** because state is fully controlled by hover.

**Potential a11y/focus issue found**
- There’s a `useEffect` that calls `blur()` on focused links inside `[data-slot="dropdown-menu-content"]` whenever `desktopOpenMenu` is truthy.
  - Comment says it’s to “remove focus when opened via hover” to avoid a visible outline.
  - In practice it runs regardless of *how* the menu was opened, and risks breaking keyboard behavior.

**Mobile behavior today**
- Mobile does **not** use `DropdownMenu`: it uses a custom expandable section (`mobileOpenCategory`) per category.
- Animations are via `AnimatePresence` + `motion.div` from `motion/react` (overlay, slide-in panel, and collapsible submenu height/opacity).

### Task 0.2 Implement hover-open for pointer devices (Servizi, Info) — DONE (pending your manual test)

**What changed (desktop)**
- Hover open is now gated to **fine pointers only** using `matchMedia("(hover: hover) and (pointer: fine)")`.
  - This prevents hover behavior on touch devices (avoids “sticky hover”).
- Hover close delay remains short (120ms) to prevent accidental close when moving from trigger → panel.
- Fixed a subtle bug: the delayed close previously used a stale state closure; now it uses a ref (`desktopOpenMenuRef`) so it won’t close the “wrong” menu if you move quickly between items.

**Click/keyboard support**
- `onOpenChange(true)` now correctly opens the controlled menu state, enabling click + keyboard toggling.
- Opening one menu automatically closes the other (single `desktopOpenMenu` state).

**Motion entrance animation**
- Added a Motion entrance animation (opacity + transform, 180ms easeOut) via Base UI `render` prop on `DropdownMenuContent`.
- Disabled the menu’s built-in CSS animations for these two dropdowns (`data-open:animate-none data-closed:animate-none`) to avoid double animations.
- Honors `prefers-reduced-motion` via `useReducedMotion()`.

**Notes**
- The “blur focus when opened via hover” effect is now gated to hover-only openings, so keyboard usage should not be disrupted.
- Fixed a JSX parse issue in the CTA button (`<        span` → `<span`) to avoid build/runtime failures while editing this file.
 - Follow-up fix: if you still see a “tab-like” outline after hover-close, we now blur the *trigger button* after hover-close (Base UI may restore focus asynchronously).

### Task 0.5 Visual polish + consistency checks — IN PROGRESS

**Update**
- Updated the desktop dropdown content UI for both “Servizi” and “Info” to a clean “mega menu” layout inspired by the reference:
  - Header (title + subtitle)
  - Divider
  - Two-column grid of cards with subtle borders and minimal icon placeholders
  - Same Motion entrance animation (opacity + transform, 180ms easeOut) already in place

### Next Steps for User:

1. **Set First Admin User**: 
   - Update a user's role to "admin" in the database:
     ```sql
     UPDATE "user" SET "role" = 'admin' WHERE "email" = 'your-email@example.com';
     ```

2. **Test Admin Panel**:
   - Navigate to `/admin` as an admin user
   - Test waitlist management
   - Test user management (ban/unban, set role)
   - Verify statistics are loading correctly

3. **Optional Enhancements**:
   - Add activity log table and page (if needed)
   - Add more detailed user activity tracking
   - Add export functionality for waitlist/users

## Previous Task Status (Completed)

- Identified root cause: uncached fetch in `getDeck()` performed at route top-level without Suspense.
- Prepared plan to refactor route to stream.
- Implemented Suspense refactor in `apps/web/src/app/dashboard/decks/[id]/settings/page.tsx` (awaits now happen inside `DeckSettingsContent`).
- Fixed runtime crash when `getDeck()` fails by restoring a `notFound()` guard when `deck` is null.
- Updated settings page to fetch deck server-side with cookie forwarding (matches `dashboard/decks/[id]/page.tsx`), preventing false `notFound()` from missing cookies/base URL mismatch.
- Extracted `DeckSettingsContent` into `deck-settings-content.tsx` to keep `page.tsx` thin and focused on the Suspense boundary + fallback UI.
- Persisted breadcrumb CSS preview changes in `apps/web/src/app/dashboard/decks/[id]/settings/deck-settings-content.tsx` by translating them into Tailwind utility classes (width/font sizing/weight/opacity/color/alignment).
- Updated the `DeckSettingsLoading` breadcrumb skeleton in `apps/web/src/app/dashboard/decks/[id]/settings/page.tsx` to mirror the new breadcrumb layout/styles to avoid CLS.
- Adjusted the right-hand sidebar container in `deck-settings-content.tsx` from `flex-0 min-w-[280px]` to `flex-1 min-w-0` so its width is now flexible (`width: 100%`) and can shrink to fit the available page width while staying in the flex layout.

# Executor's Feedback or Assistance Requests

## Navbar hover dropdown

Questions for user (to avoid rework):
1. Should the dropdown open **immediately** on hover, or with a tiny delay (e.g. 50–100ms) to prevent accidental opens?
2. Do you want a subtle entrance animation (opacity/transform only, ≤200ms), or **no animation**?
3. When opening one menu, should it automatically close the other (Servizi vs Info)? (Recommended: yes)

## Marketing Site Eventi Page (`/info/eventi`)

Please do a quick manual check:
1. Visit `/info/eventi` and confirm it renders (no white screen / no console error).
2. Confirm the browser tab title is “Eventi | Dataweb Group”.
3. Confirm you now see:
   - “Eventi in programma” cards
   - “Eventi passati” list items

Once you confirm, I’ll mark Task 0b.2 + 0b.3 as completed and proceed to Task 0b.4 (full Acctual-like sections and creative polish).

## Admin Panel Implementation

**Ready to begin implementation.** The plan is comprehensive and follows all existing patterns. 

**Questions for user:**
1. Should we implement activity logging (Task 1.3) or is it optional for now?
2. Do you want real-time updates for statistics, or is periodic refresh sufficient?
3. Should admin users be able to see user passwords or other sensitive data? (We should NOT expose passwords)
4. What should be the default admin user? Should we create a migration script to set a specific user as admin?

**Next Steps:**
- Awaiting user confirmation to proceed with Phase 1 (Database Schema Updates)
- Once confirmed, will start with Task 1.1: Add admin and ban fields to user table

---

## Previous Task Feedback (Completed)

- Please refresh `/dashboard/decks/[id]/settings` in the browser and confirm the \"Blocking Route\" error is gone.
  - If you still see an error, paste the updated message and stack trace here.
- Please visually verify the breadcrumb styling matches your preview:
- The breadcrumb line should be full-width, centered, `text-lg`, `font-medium`
- "Decks" should be ~40% opacity
- The "/" separators should be ~50% opacity
- Deck name + "Settings" should use the title-secondary color, with "Settings" slightly bolder (`font-semibold`)
- Please also check the deck settings layout: the right-hand "settings" sidebar should no longer be locked to 280px and should be able to shrink with the page while still participating in the main flex row.

# Lessons

- Next.js 16 may report "Blocking Route" when a page does uncached data access at the top level. Fix by moving uncached `await` work into a component rendered inside `<Suspense>` with a fast fallback.


