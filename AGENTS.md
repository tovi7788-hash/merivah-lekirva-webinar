<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Webinar signups insert directly from the browser into `webinar_registrations` (anon insert-only RLS, DB CHECKs validate); no one can read rows from the app — keeps leads private.
- Keep the thank-you page independent of the campaign route module; navigate there only after a successful registration insert so the campaign page stays unchanged.
- Validate campaign ref search state in the campaign route and pass it to the registration form as an optional source; attribution belongs to the current visit, not persistent browser storage.
- Keep relationship-quiz questions and scoring in a browser-safe pure module, with answers held only in page state; this makes scoring testable without collecting sensitive relationship responses.
- Reuse RegistrationForm for quiz signups with a fixed source, independently of the campaign route; this preserves one registration validation and success-navigation path.
- Keep testimonial navigation in an RTL Embla carousel with responsive grouped snaps and decorative PhoneFrame children; this separates navigation from the one-time entrance animation and makes image additions automatic.
