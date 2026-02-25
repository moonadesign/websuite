## Data

- Never add a key to a JSON object until there is actual data to populate it — no empty strings, empty arrays, or placeholder values.

## Prime directive

- Minimize lines of code.
- Prefer deletion over addition.
- Prefer existing selectors/classes over new ones.
- Use the least specific selector that is correct.
- Do not introduce new wrappers/classes/ids unless strictly required.
- If two solutions work, choose the one with fewer lines and fewer moving parts.
- Avoid “future-proofing” abstractions unless requested.
- Any change that increases complexity must include a one-line justification in the response.
- If I add non-essential complexity, treat it as incorrect and revise to the minimal equivalent.
- Before any edit, identify the exact existing in-repo pattern being reused (file + selector/structure) and list the planned selectors to add/remove. If this is missing, do not edit.
- After each edit, provide a compliance summary with: selectors added, selectors removed, wrappers/ids added, wrappers/ids removed, and one-line justification for any complexity increase.
