# Todo First-Draft Workflow

## Scope

- Work `when: now` first, then `when: next`.
- Reuse existing repo patterns only.
- Run a pre-intake context sweep (item name + sponsors) across `src/page/todo/todo.json`, `src/content.json`, `src/updates/bank.md`, and local ref repos before asking questions.
- Do intake before each item edit.
- No code or content edits until intake is complete (or explicitly waived by you).
- Never run `npm run build` (or any manual build command) unless Matt explicitly requests it in the current thread.
- If Matt asks to add an item to `src/content.json` and there is not enough context to draft more, add it and scaffold a blank page with title only.

## Matt-grade reasoning gate (required before drafting)

1. Pick the best existing starting point (exact file/path) approved by Matt, or declare none.
2. Decide if existing layer/page template is sufficient.
3. If not sufficient, define the minimal new template and sponsor it from the parent item/dependency.
4. Record the decision before any edits.

## Per-item loop

1. Pre-intake context sweep (required): gather known refs/inspo/prompt/source notes and prefill answers when there is existing project data.
2. Intake interview (required): ask only unresolved questions after prefill.
3. Matt-grade reasoning gate (required).
4. Capture source intelligence first (raw notes/notebook section) before distilling.
5. Add timestamped interview transcript entries for each major intake message.
6. Keep transcript and FAQ content expanded (no collapsed UI) while Matt is the sole reviewer.
7. Save context in `src/content.json` with real keys only (`description`, `inspo`, `prompt`, `ref`, etc.).
8. Scaffold route/component only if missing.
9. Validate against the existing dev server flow (`npm run dev` already running).
10. Log AGENTS compliance summary.

## Intake questions

1. One-sentence product/site outcome.
2. Audience + action you want them to take.
3. Tone in three adjectives.
4. Must-have sections/components.
5. Best existing starting point to reuse (exact project/page/path), and Matt approval.
6. Existing refs (`ref`) and inspiration links (`inspo`).
7. Seed generation prompt (`prompt`) if needed.
8. Source notes that must be preserved verbatim (or near-verbatim).
9. Any transcript lines that must be excluded from public page copy.

## Batch order

1. That Matt Life (test run)
2. DonePager
3. Quictate
4. Human
5. Doublebook
6. Mattborn.com
7. Form Controls
8. Selection & Toggle
9. Overlays
10. Navigation & Layout
11. Content & Display
12. CPQ UI
13. Mingentic
14. shadcn
15. Minterface
