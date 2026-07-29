frontend display options (for generate updated resume feature)
Option 1 (Recommended): JSON
Your AI always returns the same structured JSON then you write a json to tiptap converter function

Option 2: Have the AI generate Tiptap JSON directly
Instead of asking the AI for resume JSON, ask it to return Tiptap's document format.
The downside is that LLMs can occasionally produce invalid Tiptap JSON, so you'll likely need validation and retries.

Option 3 (My recommendation): AI returns HTML
This is what many AI editors do.