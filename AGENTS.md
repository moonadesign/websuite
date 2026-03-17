## Data

- Never add a key to a JSON object until there is actual data to populate it — no empty strings, empty arrays, or placeholder values.

## Prime directive

- Minimize lines of code by considering changes in this order: delete, edit one existing line, reuse a shared primitive, add a selector, add markup.
- Prefer deletion over addition.
- Prefer existing selectors/classes over new ones.
- Use the least specific selector that is correct.
- Introduce new wrappers/classes/ids only after naming the exact existing selector, structure, or primitive that proved insufficient.
- Elements with class `.layer` belong directly to `body` and almost always contain exactly one direct `.layer-inset` child.
- If two solutions work, choose the one with fewer lines and fewer moving parts.
- Avoid “future-proofing” abstractions unless requested.
- Any change that increases complexity must include a one-line justification in the response.
- If I add non-essential complexity, treat it as incorrect and revise to the minimal equivalent.
- Before any edit, identify the exact existing in-repo pattern being reused (file + selector/structure), the smallest possible fix, and the planned selectors/wrappers to add/remove. If this is missing, do not edit.
- After each edit, provide a compliance summary with: selectors added, selectors removed, wrappers/ids added, wrappers/ids removed, and one-line justification for any complexity increase.
