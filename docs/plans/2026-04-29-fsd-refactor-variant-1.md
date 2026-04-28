# FSD Refactor Variant 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the project so application wiring lives in `app`, domain logic lives in `entities/application`, and the main generation use case becomes a real feature instead of page-owned orchestration.

**Architecture:** Keep the current layer set (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) but make the boundaries honest. Move runtime providers out of `entities`, move cover-letter generation logic out of `shared`, and introduce a single feature slice for the generator use case. Keep behavior unchanged while tightening public APIs with `index.ts` entrypoints.

**Tech Stack:** React 19, TypeScript, Vite, TanStack Router, react-hook-form, Vitest, Testing Library, ESLint flat config.

---

## Target Structure

```text
src/
  app/
    app.tsx
    router/
    providers/
      applications-provider.tsx
      letter-generator-provider.tsx
      index.ts
    styles/

  pages/
    applications-list/
      ui/page.tsx
    application-generator/
      ui/page.tsx

  widgets/
    header/
      index.ts
      ui/header.tsx
    goal-banner/
      index.ts
      ui/goal-banner.tsx
    applications-grid/
      index.ts
      ui/applications-grid.tsx
    application-form/
      index.ts
      ui/application-form.tsx
    application-preview/
      index.ts
      ui/application-letter-preview.tsx

  features/
    generate-application-letter/
      index.ts
      model/use-generate-application-letter.ts
    delete-application/
      index.ts
      ui/delete-application-button.tsx
    copy-application/
      index.ts
      ui/copy-application-button.tsx

  entities/
    application/
      index.ts
      model/
        types.ts
        application-client.ts
        use-applications.ts
        use-applications-progress.ts
        letter-generator-client.ts
      ui/
        application-preview-card.tsx

  shared/
    assets/
    config/
    lib/
    ui/
```

---

### Task 1: Freeze Current Behavior With Routing Smoke Coverage

**Files:**

- Modify: `src/app/router/app-router.test.tsx`
- Modify: `src/pages/application-generator/ui/page.test.tsx`

**Step 1: Write or extend failing tests for unchanged integration behavior**

Add or extend tests for:

- `/` still renders dashboard heading and header
- `/new` still renders generator heading and home button
- generator flow still saves one draft and reuses it on `Try Again`

**Step 2: Run targeted tests to confirm current baseline**

Run: `pnpm test:run src/app/router/app-router.test.tsx src/pages/application-generator/ui/page.test.tsx`

Expected: PASS before refactor starts.

**Step 3: Do not change production code in this task**

This task exists only to make later moves safer.

---

### Task 2: Move Providers To `app/providers`

**Files:**

- Create: `src/app/providers/applications-provider.tsx`
- Create: `src/app/providers/letter-generator-provider.tsx`
- Create: `src/app/providers/index.ts`
- Modify: `src/app/app.tsx`
- Modify: all imports referencing:
  - `src/entities/application/model/applications-provider.tsx`
  - `src/entities/application/model/letter-generator-provider.tsx`
- Delete later: `src/entities/application/model/applications-provider.tsx`
- Delete later: `src/entities/application/model/letter-generator-provider.tsx`

**Step 1: Copy the existing providers into `src/app/providers/`**

Keep behavior byte-for-byte identical at first. This is a move, not a redesign.

**Step 2: Update imports in app/tests/stories**

Expected import targets after move:

- `@/app/providers`
- or `@/app/providers/applications-provider`
- or `@/app/providers/letter-generator-provider`

**Step 3: Run targeted tests**

Run: `pnpm test:run src/app/router/app-router.test.tsx src/widgets/header/ui/header.test.tsx src/widgets/goal-banner/ui/goal-banner.test.tsx`

Expected: PASS.

**Step 4: Delete the old provider files once imports are clean**

---

### Task 3: Move Letter Generator Client Into The Domain Slice

**Files:**

- Create: `src/entities/application/model/letter-generator-client.ts`
- Modify: `src/app/providers/letter-generator-provider.tsx`
- Modify: `src/entities/application/model/use-letter-generator.ts`
- Modify: `src/pages/application-generator/ui/page.test.tsx`
- Modify: `src/shared/api/letter-generator-client.test.ts`
- Delete later: `src/shared/api/letter-generator-client.ts`
- Move test or replace with: `src/entities/application/model/letter-generator-client.test.ts`

**Step 1: Move the current class and payload types without behavior changes**

Keep:

- `LetterGeneratorClient`
- `TemplateLetterGeneratorClient`
- `LetterGenerationPayload`

**Step 2: Update imports to the new entity-level location**

The generator provider and generator page tests should stop importing from `shared/api`.

**Step 3: Move the test beside the domain code**

Preferred final location: `src/entities/application/model/letter-generator-client.test.ts`

**Step 4: Run targeted tests**

Run: `pnpm test:run src/entities/application/model/letter-generator-client.test.ts src/pages/application-generator/ui/page.test.tsx`

Expected: PASS.

---

### Task 4: Introduce Entity Public API

**Files:**

- Create: `src/entities/application/index.ts`
- Modify: imports across `src/app`, `src/pages`, `src/widgets`, `src/features`

**Step 1: Export the stable entity surface**

Export only what consumers need:

- `JobApplication`
- `ApplicationClient`
- `LocalStorageApplicationClient`
- `APPLICATIONS_STORAGE_KEY`
- `useApplications`
- `ApplicationsContext`
- `useApplicationsProgress`
- `APPLICATIONS_GOAL`
- `LetterGeneratorClient`
- `TemplateLetterGeneratorClient`
- `LetterGeneratorContext`
- `useLetterGenerator`
- `ApplicationPreviewCard`

**Step 2: Replace deep entity imports where practical**

Example target style:

- from `@/entities/application`

Do this incrementally. Do not chase perfect consistency if it creates risky churn.

**Step 3: Run entity-adjacent tests**

Run: `pnpm test:run src/entities/application/model/application-client.test.ts src/entities/application/model/use-applications-progress.test.tsx`

Expected: PASS.

---

### Task 5: Introduce Widget Public APIs

**Files:**

- Create:
  - `src/widgets/header/index.ts`
  - `src/widgets/goal-banner/index.ts`
  - `src/widgets/applications-grid/index.ts`
  - `src/widgets/application-form/index.ts`
  - `src/widgets/application-preview/index.ts`
- Modify:
  - `src/app/router/app-shell.tsx`
  - `src/pages/applications-list/ui/page.tsx`
  - `src/pages/application-generator/ui/page.tsx`

**Step 1: Export only widget entry components and widget-specific public types**

Example:

- `Header`
- `GoalBanner`
- `ApplicationsGrid`
- `ApplicationForm`
- `ApplicationLetterPreview`

**Step 2: Replace page/app imports to use widget roots**

Do not change widget internals yet.

**Step 3: Run page and shell tests**

Run: `pnpm test:run src/app/router/app-router.test.tsx src/pages/application-generator/ui/page.test.tsx`

Expected: PASS.

---

### Task 6: Introduce Feature Public APIs For Existing Small Features

**Files:**

- Create:
  - `src/features/copy-application/index.ts`
  - `src/features/delete-application/index.ts`
- Modify:
  - `src/widgets/applications-grid/ui/applications-grid.tsx`
  - `src/widgets/application-preview/ui/application-letter-preview.tsx`

**Step 1: Export the buttons from feature roots**

Exports:

- `CopyApplicationButton`
- `DeleteApplicationButton`

**Step 2: Replace widget imports to feature roots**

This reduces coupling to `ui/` internals.

**Step 3: Run feature and widget tests**

Run: `pnpm test:run src/features/copy-application/ui/copy-application-button.test.tsx src/features/delete-application/ui/delete-application-button.test.tsx src/widgets/applications-grid/ui/applications-grid.test.tsx`

Expected: PASS.

---

### Task 7: Create The Real Generator Feature Slice

**Files:**

- Create: `src/features/generate-application-letter/model/use-generate-application-letter.ts`
- Create: `src/features/generate-application-letter/index.ts`
- Modify: `src/pages/application-generator/ui/page.tsx`
- Test: `src/features/generate-application-letter/model/use-generate-application-letter.test.tsx`

**Step 1: Write a failing test for the new orchestration hook**

The hook should cover one real behavior at a time:

- first successful generation saves a draft
- later generation reuses the draft id
- loading flips during request
- errors surface without crashing the page
- reset clears generator-local draft state

Use dependency injection by consuming existing `useApplications` and `useLetterGenerator` contracts rather than inventing a second client layer.

**Step 2: Run only the new hook test and confirm it fails for the expected reason**

Run: `pnpm test:run src/features/generate-application-letter/model/use-generate-application-letter.test.tsx`

Expected: FAIL because hook does not exist yet.

**Step 3: Implement the minimal hook**

Suggested shape:

- accepts no arguments
- internally reads `saveApplication` and `generateLetter`
- returns:
  - `generate(values)`
  - `resetDraft()`
  - `status`
  - `letter`

The current page-local refs/state move here:

- `draftIdRef`
- `createdAtRef`
- `status`
- `letter`

**Step 4: Re-run the new hook test**

Expected: PASS.

**Step 5: Refactor `ApplicationGeneratorPage` to consume the feature hook**

The page should keep:

- form creation with `react-hook-form`
- heading derivation
- layout composition

The page should stop owning:

- save/regenerate orchestration
- draft id reuse
- generated letter state machine

**Step 6: Run generator page tests**

Run: `pnpm test:run src/pages/application-generator/ui/page.test.tsx`

Expected: PASS.

---

### Task 8: Add Generator Feature Public API And Page Imports

**Files:**

- Modify: `src/features/generate-application-letter/index.ts`
- Modify: `src/pages/application-generator/ui/page.tsx`

**Step 1: Export the hook from the feature root**

Export:

- `useGenerateApplicationLetter`

**Step 2: Make the page consume the feature root import**

Import style:

- `@/features/generate-application-letter`

**Step 3: Re-run generator-related tests**

Run: `pnpm test:run src/features/generate-application-letter/model/use-generate-application-letter.test.tsx src/pages/application-generator/ui/page.test.tsx`

Expected: PASS.

---

### Task 9: Clean Up Empty Placeholder Slices

**Files:**

- Delete:
  - `src/features/create-application/model/.gitkeep`
  - `src/features/create-application/ui/.gitkeep`
  - `src/features/regenerate-application/model/.gitkeep`
  - `src/features/regenerate-application/ui/.gitkeep`
  - any now-unused `.gitkeep` placeholders created only to reserve nonexistent slices

**Step 1: Remove folders that no longer represent real code**

Keep the structure honest. If a slice has no code and no immediate purpose, delete it.

**Step 2: Run a quick file-tree sanity pass**

Run: `ls src/features && ls src/app && ls src/entities/application`

Expected: only real slices remain.

---

### Task 10: Optional ESLint Tightening For Public APIs

**Files:**

- Modify: `eslint.config.js`

**Step 1: Decide whether to enforce shallow imports for slices**

If desired, add restricted import patterns that discourage `@/widgets/foo/ui/bar` and prefer `@/widgets/foo` outside the owning slice.

**Step 2: Keep this incremental**

Do not add a rule that immediately forces a wide repo rewrite unless all imports already comply.

**Step 3: Run lint**

Run: `pnpm lint`

Expected: PASS.

---

### Task 11: Final Verification

**Files:**

- No new files

**Step 1: Run the full test suite**

Run: `pnpm test:run`

Expected: all tests pass.

**Step 2: Run lint**

Run: `pnpm lint`

Expected: no errors.

**Step 3: Run build**

Run: `pnpm build`

Expected: successful production build.

**Step 4: Smoke-check the core routes manually**

Run: `pnpm dev`

Verify:

- `/` renders dashboard
- `/new` renders generator
- generate flow still works
- copy/delete still work

---

## Notes And Constraints

- Keep behavior unchanged during Tasks 2-6. Those are structural moves only.
- Use TDD for Task 7. The new feature hook is the only place where new production code should be introduced.
- Prefer moves and import rewrites over “improving everything while here”.
- Do not introduce a new `processes` layer.
- Do not split the generator feature into create/regenerate unless concrete complexity appears.
- If stale hydration or async client concerns are addressed later, do it as a separate bugfix task, not inside this structure refactor.

## Suggested Commit Boundaries

1. `refactor: move providers to app layer`
2. `refactor: move letter generator into application entity`
3. `refactor: add slice public api entrypoints`
4. `refactor: extract application letter generation feature`
5. `chore: remove placeholder fsd slices`
