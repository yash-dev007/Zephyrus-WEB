# ZEPHYRUS — Website Plan v1

**Status:** Awaiting approval
**Date:** 2026-10-21
**Concept:** THE WYRM IN THE MACHINE
**Art direction:** COLD BREATH
**Build:** Astro 7 · React 19 islands · Motion 14 · Lenis 1.3 · Canvas 2D
**Scope:** `/` (one-page site) + `/colophon` + `/404`

---

## 0. One-screen summary

- A single, highly art-directed landing page for **Zephyrus**, the local-first AI harness.
- The reference's black technical-poster language is kept: grain, mono labels, hairlines, ASCII field, barcode/stamp motifs, faded monochrome photography.
- The dragon is treated as **myth, not decoration**: the supplied mark becomes an interactive ASCII/particle sigil; the copy frames local-first data as a dragon's hoard; one weathered stone relief and one optional macro eye carry the motif in photography. No fantasy illustrations, armor, fire, or glowing runes.
- Primary conversion: **install Zephyrus**. Secondary: GitHub star and docs depth.
- Seven numbered sections plus the hero: Hero → Lair → Anatomy → Spine → Hoard/Ward → Kin → Rite → Wind.
- Stack is current-stable: **Astro 7.4.1 + React 19.3.1 islands + TypeScript 7.0.2 + Motion 14.5.0 + Lenis 1.3.27**, static output, no CMS, no analytics by default, no cookie banner.
- The hero LCP is text, not an image; the sigil is a lightweight Canvas 2D field with a static reduced-motion fallback.
- Logo must be vectorized before build (source is 780×210; mark is only 116×130). Image prompts are in **`IMAGE_PROMPTS.md`**.
- Six phases (0–5) with explicit review gates. No production code until this plan is approved.

**How this plan was assembled.** Three specialist tracks ran in parallel — architecture/stack, information architecture/copy, and art direction — then were reconciled against your requirements. Two overrides are deliberate: the architecture track initially recommended no smooth scroll, but your premium-motion requirement wins with accessibility guardrails; and the art-direction track's generic display font was replaced by the supplied dragon mark as the primary brand element. Versions were checked against the live npm registry on 2026-10-21, not assumed.

---

## 1. What the site must do

### 1.1 Goals

| Priority | Goal | How we measure |
|---|---|---|
| 1 | Get a developer to run the Docker install | GitHub traffic referrers + docs outbound clicks; optional cookieless Umami for install copy/scroll depth |
| 2 | Make the project legible in under 30 seconds | Qualitative review; optional Umami scroll depth past Anatomy |
| 3 | Earn trust for a self-hosted admin surface | Threat-model / security outbound clicks; optional Umami engagement |
| 4 | Send qualified traffic to GitHub | GitHub referrers + outbound click counts |
| 5 | Feel like a product with a point of view | Return visits (if analytics enabled), OG previews, qualitative feedback |

**Measurement stance:** no analytics by default. GitHub referrers and outbound links are the baseline. If on-site measurement is wanted, use **self-hosted, cookieless Umami** — no banner, no third-party request, documented in the colophon.

### 1.2 Audience and objections

**Audience:** developers, self-hosters, AI engineers, privacy-conscious power users, and people already running Ollama / vLLM / LM Studio.

| Objection | Where it dies |
|---|---|
| "Another chat-UI wrapper" | **Spine**: named files, one FastAPI server, real request flow |
| "Won't run on my stack or hardware" | **Kin**: local engines + hosted APIs; Cookbook hardware-fit line |
| "Where does my data actually go?" | **Hoard**: `data/` tree, `ZEPHYRUS_DATA_DIR`, no hosted account |
| "How long until it works?" | **Rite**: four Docker commands, health check, first-boot password |
| "Is it stable enough?" | Branch note (`main` stable, `dev` unstable), version stamp, AGPL line |
| "What does AGPL mean for me?" | Footer: one sentence + license link |
| "What happens when a service is down?" | **Ward**: degraded state instead of a crash |

### 1.3 Non-goals for v1

No CMS, blog, docs hosting, pricing, cloud offering, testimonials, logo wall, newsletter, chat widget, cookie banner, feature comparison tables, benchmark claims, or full API reference. Docs stay in the GitHub repo; the site links deep.

---

## 2. Creative direction

### 2.1 The idea

> **THE WYRM IN THE MACHINE**
> Zephyrus is the west wind. The wyrm is its keeper. The hoard is your data.

Local-first is usually explained with architecture diagrams. This site explains it with a myth: **a dragon guards its hoard; Zephyrus keeps yours on your machine.** The dragon is not a mascot bolted onto a SaaS page. It is the visual argument for sovereignty.

The reference's poster language supplies the body: black paper, film grain, monospaced instrumentation, hairline rules, technical annotations, a field of ASCII characters, a barcode and a circular stamp. The supplied dragon mark supplies the soul. The result should feel like a **classified technical broadsheet for a machine that lives under your desk** — not a fantasy game, not a developer-tool template.

### 2.2 Dragon translation

| Dragon idea | Site expression |
|---|---|
| Wyrm | The supplied logo mark; an ASCII/particle sigil that morphs between sphere and dragon silhouette |
| Hoard | `data/` — sessions, uploads, vectors, memory, settings; "your data has an address" |
| Lair | The server-room photograph; the install section as the way in |
| Spine | The architecture sequence: client → FastAPI → routes → logic → state |
| Scales | A faint SVG scale pattern; plate textures; no literal reptile skin |
| Claw | L-shaped corner ticks on plates and interactive blocks |
| Breath | One frost-blue accent (`#8FE0FF`), used like a cold signal, never a flood |
| Ward | Auth, per-user privileges, admin-gated tools, degraded-state behavior |
| Kin | Model providers — local engines and hosted APIs as one OpenAI-compatible family |
| Rite | The four-command Docker install; the first boot |
| Wind | The closing section and the long-exposure corridor image |

### 2.3 Restraint rules

- **One literal dragon scene maximum**: a weathered stone relief photographed as architecture. The optional macro eye is a fragment, not a scene; cut it if it reads fantasy. No flying dragons, no armor, no swords, no castles, no glowing runes, no fire.
- **No fire palette.** The dragon is a cold-weather wyrm: black, bone, frost blue. The only warmth comes from a CRT glow inside a photograph.
- **No fantasy typography.** No blackletter, no runic faces, no faux-Asian brush strokes.
- **Feature names stay literal.** Dragon language lives in eyebrows, captions, and the sigil — never in place of "Memory", "RAG", or "MCP".
- **No AI-generated UI, text, logos, or charts.** Those are built in code or captured from the real app.
- **No emoji.** Matches the product repo's UI convention.
- **No SaaS gradients, glassmorphism, rounded cards, drop shadows, accent floods, or cursor followers.**

### 2.4 Palette

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0A0A0B` | Page field |
| `--surface-1` | `#101013` | Plates, hovered rows |
| `--surface-2` | `#16161A` | Terminal, code blocks |
| `--text` | `#F2F2F0` | Primary text — 17.7:1 on bg |
| `--muted` | `#8E8E93` | Secondary text — 6.1:1 on bg |
| `--faint` | `#5A5A5F` | Non-text only (indices, disabled glyphs) — 2.9:1 |
| `--hairline` | `rgba(242,242,240,.14)` | Decorative 1px rules |
| `--hairline-strong` | `#6A6A70` | Interactive borders — 3.7:1 |
| `--accent` | `#8FE0FF` | Frost signal — 13.4:1 on bg |
| `--accent-deep` | `#2E5F72` | Pressed / visited accent |
| `--on-accent` | `#04161C` | Text on accent fill |
| `--scrim` | `rgba(10,10,11,.78)` | Text-over-photo safety |

**Accent budget:** no more than ~3% of any viewport. Permitted only on: focus rings, active tab underline, terminal cursor, one status dot, link-hover underline, current section index, and the primary button's hover border/label. Never body copy, section tints, card borders en masse, icon sets, gradients, or filled CTAs at rest.

**Contrast:** all body, label, and interactive text must pass WCAG 2.2 AA. `--faint` never carries meaning. Hairlines never communicate state alone. Text over photography must measure ≥4.5:1 at the brightest pixel behind it; when in doubt, use a solid band or the `--scrim`.

### 2.5 Typography

| Role | Face | Behavior |
|---|---|---|
| Display | **Archivo Variable** (OFL, wght 100–900, wdth 62–125) | Uppercase, wide, institutional; headlines and section titles |
| Technical | **JetBrains Mono Variable** (OFL, 100–800) | Labels, nav, body, terminal, annotations |
| Mythic accent (optional) | **Instrument Serif** italic (OFL) | Exactly one or two pull quotes; never UI or body |

**Scale**
- Hero: `clamp(2.75rem, 7.2vw, 7.5rem)`, line-height `.86`, letter-spacing `-.03em`, Archivo wdth 118 / wght 520, uppercase.
- Section title: `clamp(1.5rem, 3vw, 2.5rem)`, line-height `1.02`, letter-spacing `.01em`, wght 600.
- Lead: mono `clamp(.9375rem, .5vw + .8rem, 1.125rem)`, line-height `1.6`.
- Body: mono `clamp(.9375rem, .25vw + .875rem, 1.0625rem)`, line-height `1.65`.
- Label/annotation: mono `11px` fixed — never smaller; uppercase; letter-spacing `.18em`; line-height `1.4`.
- Terminal: mono `13px`, line-height `1.55`.

**Rules:** uppercase only for display, section titles, labels, nav, and buttons — never body or input values. Max measure: body `62ch`, lead `46ch`, mono statement `66ch`. Large type gets negative tracking; small type stays near zero. One justified mono statement per page at ≥1024px (the manifesto), ragged-right everywhere else. Instrument Serif is a seasoning, not a third system: if it weakens the poster language in the prototype, drop it.

**Font import note:** `@fontsource-variable/archivo` ships separate `wght` and `wdth` CSS. Import the `wdth` file (and the italic file only if needed) and use `font-stretch: 118%` for display; importing the default `index.css` gives weight only. Subset to `latin` to stay within the font budget.

### 2.6 Layout

- 12-column grid, max width **1400px**, outer margin `clamp(20px, 4.5vw, 72px)`, gutter `clamp(16px, 1.8vw, 28px)`.
- Breakpoints: 480 / 768 / 1024 / 1440. Below 768px: 4 columns, 16px gutters, vertical annotations removed.
- Section padding: `clamp(96px, 12vw, 180px)`. 8px baseline rhythm.
- The recurring unit is a **plate**: a tall bordered panel (3:4 or 4:5) with an internal header strip (label left, glyph right), body zone, and footer meta row. Corner ticks are 10×10px, 1px, inset −1px.
- Content alternates: text in columns 2–7 with an annotation rail in column 1; plate in columns 8–12. Then mirrored. At most two full-bleed moments: the closing image and one interlude.
- Numbering `001`…`007` top-left of each section, aligned to the title baseline, `--faint`.
- One 45° diagonal rule per viewport maximum, 24–48px, opacity `.12`. Vertical mono margin labels at ≥1024px only, `aria-hidden`.
- Every one or two sections closes with a full-bleed hairline that extends past the container to the viewport edge.

### 2.7 Texture and motifs

- **Grain:** build-time 256×256 grayscale WebP tile plus a 512px coarse layer. Fine layer at `.045`, coarse at `.028`, `soft-light`. No live SVG filter in the DOM. `pointer-events: none`, `aria-hidden`. Disable under `prefers-reduced-data` and Save-Data. Grain never animates.
- **Scales:** an SVG `<pattern>` of overlapping arcs at 2.5% opacity in Anatomy and Hoard only. It should read as paper texture, not reptile skin.
- **Spine rule:** hairline with short vertical vertebra ticks, used as a section divider; draws in once on scroll.
- **Claw ticks:** L-shaped corner marks on plates, terminal blocks, and the install panel.
- **Stamp:** circular seal with the dragon mark and `ZEPHYRUS / LOCAL-FIRST / EDITION 2026 / AGPL-3.0` around the ring. Footer and OG only.
- **Barcode:** decorative, `aria-hidden`, serial `ZYR-{APP_VERSION}`. Footer and OG only.

### 2.8 Motion language

Motion is the product's pulse, not a screensaver. The rules come from the Apple fluid-interface principles:

- **Respond on pointer-down.** Buttons and rows show press feedback immediately; never wait for `click`.
- **Springs over durations for anything a user can touch.** Default UI spring: `{ type: 'spring', bounce: 0, duration: 0.45 }`. Press: `bounce: 0, duration: 0.28`. Menu: `bounce: 0, duration: 0.42`. Overshoot only when a gesture carried momentum; there are almost no such gestures here, so default to no bounce.
- **Interruptible.** Use `AnimatePresence` and `layoutId`; never lock input during a transition; animate from the current presentation value.
- **Spatial consistency.** The mobile menu enters from the right and exits to the right. Tabs move their underline along the tab row. Accordions open from their trigger. No in-from-right / out-the-bottom.
- **Direct manipulation.** The sigil responds to pointer with a small parallax and a phase stir; it does not spin continuously.
- **No scroll hijacking.** Lenis smooths the wheel but native touch, keyboard, and screen-reader scrolling remain intact. No horizontal hijack, no snap traps.
- **Reduced motion is a first-class mode:** static sigil, no Lenis, no parallax, opacity-only reveals ≤120ms, no layout animations, no marquee.
- **No slow full-screen loops.** The sigil resolves once; it does not “breathe” forever at 0.2 Hz.

**Lenis contract:** `lerp: 0.09`, `wheelMultiplier: 1`, `smoothWheel: true`, `syncTouch: false`, `anchors: true`, `autoRaf: true`. Disabled when `prefers-reduced-motion: reduce` or when the user has requested reduced data. Anchor clicks move focus to the target after the scroll completes. Body scroll locks only while the mobile menu is open.

### 2.9 Reference translation

| Reference device | Zephyrus interpretation |
|---|---|
| `EMERGENCE` wordmark + technical labels | Zephyrus lockup + `LOCAL-FIRST AI HARNESS / v{APP_VERSION} / AGPL-3.0` |
| ASCII sphere | ASCII/particle **wyrm sigil**, morphing sphere ↔ dragon silhouette |
| Faded alley CRT photograph | Basement server rack; CRT workbench; stone dragon relief; wind corridor |
| Barcode + circular stamp | Zephyrus serial barcode + `LOCAL / FIRST / EDITION 2026` stamp |
| Portrait poster panels | Reusable **plates** with header strips, corner ticks, captions |
| Mono uppercase body | JetBrains Mono body/labels; Archivo for scale |
| Black paper + grain | Same, with one frost-blue signal |
| `BY OPENAI` strip | `BY ZEPHYRUS / OPEN SOURCE / AGPL-3.0` — no third-party branding |

---

## 3. Page architecture and copy

### 3.1 Sitemap and navigation

```
/            one-page site (the argument)
/colophon    type, stack, image credits, accessibility statement
/404         same language, "the wyrm found nothing"
```

**Header:** Zephyrus lockup left · `ANATOMY` · `ARCHITECTURE` · `LOCAL-FIRST` · `PROVIDERS` · `INSTALL` · `GITHUB ↗` · `INSTALL` button. Sticky 64px, hairline bottom, solid background after the hero, active-section dot, 1px scroll-progress line in frost. No blur.

**Anchors:** `#anatomy`, `#spine`, `#hoard`, `#kin`, `#rite`. Section labels in nav stay literal English; the dragon language lives in the section eyebrows.

**Footer:** four columns — Product (Install, Setup, Roadmap, Branch model) · Source (GitHub, Issues, Contributing, Releases) · Trust (Security, Threat model, License: AGPL-3.0) · Colophon (Stack, Type, Image credits, Edition 2026). Bottom row: barcode, `© 2026 ZEPHYRUS`, `AGPL-3.0`, `NOT AFFILIATED WITH MODEL PROVIDERS`.

### 3.2 Section-by-section

| # | Anchor | Eyebrow | Headline | Job |
|---|---|---|---|---|
| 00 | `#top` | `THE WYRM` | **Your models. Your machine. Your hoard.** | Identity + one action |
| 01 | `#lair` | `THE LAIR` | **Not a wrapper. A harness.** | Reframe the category |
| 02 | `#anatomy` | `THE ANATOMY` | **Twelve systems. One organism.** | Prove breadth without a card wall |
| 03 | `#spine` | `THE SPINE` | **One server. Every layer on the table.** | Prove it is real architecture |
| 04 | `#hoard` | `THE HOARD / THE WARD` | **Your data has an address. It's yours.** | Trust: data + security |
| 05 | `#kin` | `THE KIN` | **Bring the model you already run.** | Fit: providers + hardware |
| 06 | `#rite` | `THE RITE` | **Four commands to a local console.** | Convert: install |
| 07 | `#wind` | `THE WIND` | **Run it before you trust it.** | Permission to try + GitHub |
| — | footer | `COLOPHON` | — | Craft, license, credits |

### 3.3 Exact copy deck

#### 00 — Hero

- Eyebrow: `ZEPHYRUS / LOCAL-FIRST AI HARNESS / v{APP_VERSION} / AGPL-3.0`
- H1:

```
YOUR MODELS.
YOUR MACHINE.
YOUR HOARD.
```

- Sub: “Zephyrus is a self-hosted AI harness for OpenAI-compatible models. Agent loops, persistent memory, RAG, MCP bridges, and local serving behind one FastAPI server — with your data under `data/`, not someone else's account.”
- CTAs: `[ INSTALL ]` · `[ SOURCE ↗ ]`
- Micro: `DOCKER / PYTHON 3.11+ / AGPL-3.0`
- Status rail: `APP.PY :7000` · `DATA/ LOCAL` · `SSE` · `AUTH ON`
- Sigil caption: `THE WYRM / SIGIL 001`
- No hero photograph. The sigil plate is the visual.

#### 01 — The Lair

- Eyebrow: `01 / THE LAIR`
- H2: **Not a wrapper. A harness.**
- Lead: “Most AI tools rent you a chat box and keep the machinery. Zephyrus hands you the machinery: the agent loop, the memory store, the retrieval layer, the tool bridge, the server.”
- Body: “One FastAPI server. One data directory. No hosted account in the path. Point it at the model you already run, then keep everything it learns.”
- Pull quote (Instrument Serif italic, optional): *“A dragon guards its hoard. Zephyrus keeps yours on your machine.”*
- Caption: “Named for the west wind. Marked by the wyrm that guards the hoard.”
- CTA: `READ THE ANATOMY ↓`
- Visual: the 4:5 server-room plate, captioned `THE LAIR / 002`.

#### 02 — The Anatomy

- Eyebrow: `02 / THE ANATOMY`
- H2: **Twelve systems. One organism.**
- Lead: “A selected index of the harness. Everything below is wired through the same server and the same data directory; the full API surface lives in the repo.”
- Small print: “Selected feature areas, not the complete API.”
- Interaction: native `<details>` rows, grouped I–IV. One open at a time. Hover/focus moves the index to frost; click/tap opens the detail. No hover-only content.
- CTA: `FULL FEATURE MAP ↗` → GitHub README `#features`.

#### 03 — The Spine

- Eyebrow: `03 / THE SPINE`
- H2: **One server. Every layer on the table.**
- Lead: “A no-build SPA talks HTTP and SSE to `app.py`. Routes stay thin. Logic lives in `src/`. State lives in `data/`. The spine holds.”
- Scroll sequence: five layers light up in order; a vertical path draws; the final line is a real SSE trace.
- Terminal annotation: `POST /api/chat → text/event-stream`
- CTA: `REPO MAP ↗`

#### 04 — The Hoard / The Ward

- Eyebrow: `04 / THE HOARD`
- H2: **Your data has an address. It's yours.**
- Lead: “Every session, upload, vector, and setting is a file under `data/`. Back it up with `cp`. Move it with `ZEPHYRUS_DATA_DIR`. Keep it on the machine you chose.”
- Data tree (mono, interactive hover highlights a row).
- Ward sub-block:
  - Eyebrow: `THE WARD`
  - H3: **The ward is on by default.**
  - Bullets:
    - Session cookies + `ody_` bearer tokens.
    - Per-user privileges; dangerous tools are admin-gated.
    - `AUTH_ENABLED=true`, `LOCALHOST_BYPASS=false`, `SECURE_COOKIES=true` behind HTTPS.
    - If ChromaDB, SearXNG, email, or a provider is down, the UI reports degraded state; the server keeps serving.
    - “Self-host it like an admin console” — shell, uploads, model serving, email, API tokens.
  - CTAs: `THREAT MODEL ↗` · `SECURITY ↗`
- Visual: the 3:4 stone relief plate, captioned `THE WARD / 004`. Optional 1:1 eye inset.

#### 05 — The Kin

- Eyebrow: `05 / THE KIN`
- H2: **Bring the model you already run.**
- Lead: “Local engines and hosted APIs share one OpenAI-compatible path. Change the endpoint in Settings; nothing else moves.”
- Local row: `OLLAMA` · `LM STUDIO` · `VLLM` · `SGLANG` · `LLAMA.CPP` · `ANY /v1`
- Hosted row: `ANTHROPIC` · `GEMINI` · `GROQ` · `XAI` · `OPENROUTER` · `OPENAI` · `DEEPSEEK`
- Cookbook line: “The cookbook checks hardware fit, downloads weights, and serves them from the same box. Local GPU serving wants Linux or WSL2.”
- Footnote: “From Docker, host Ollama is `http://host.docker.internal:11434/v1`.”
- CTA: `PROVIDER SETUP ↗` → `docs/setup.md#configuration`
- Trademark note in footer; no provider logos.

#### 06 — The Rite

- Eyebrow: `06 / THE RITE`
- H2: **Four commands to a local console.**
- Lead: “Docker is the supported path. Native Linux, macOS, and Windows installs are documented and tested separately. Requires Docker, or Python 3.11+.”
- Tabs: `DOCKER` (default) · `LINUX / MACOS` · `WINDOWS`
- First-boot note: “First boot creates admin `admin` (or `$ZEPHYRUS_ADMIN_USER`) and prints a temporary password to stdout / `docker compose logs zephyrus`. Change it in Settings.”
- Verification block: `docker compose ps` → expect `Up (healthy)`; `docker compose logs zephyrus | grep -E 'ChromaDB|MemoryVectorStore|DEGRADED'`.
- CTA: `FULL SETUP ↗`

#### 07 — The Wind

- Eyebrow: `07 / THE WIND`
- H2: **Run it before you trust it.**
- Lead: “Clone the repo, start the stack, point it at a model you already run. If it doesn't earn the disk space, remove it. No hosted account. No lock-in.”
- CTAs: `[ INSTALL ]` · `[ STAR ON GITHUB ↗ ]`
- Footer line: `AGPL-3.0 / LOCAL-FIRST / EDITION 2026`
- Visual: 16:9 wind-corridor plate, copy on a solid band or ≥78% scrim; contrast verified.

### 3.4 Capability index

| Group | # | Name | One-line spec | Detail (opens on click) |
|---|---|---|---|---|
| I — REASON | 01 | Agent loop | Streaming chat, tool calls, background bash | Plans, calls tools, observes results, streams over SSE. Admin-gated tools stay gated. |
| I — REASON | 02 | Deep research | Multi-step web research, visual reports | Plans sub-questions, searches, reads, and assembles a report on your SearXNG. |
| I — REASON | 03 | Model compare | Same prompt, two models, side by side | A/B a local model against a hosted one without leaving the console. |
| II — REMEMBER | 04 | Memory | Long-term `memory.json` + vector recall | Facts persist across sessions; semantic recall uses your local vector store. |
| II — REMEMBER | 05 | RAG | Point at directories; ChromaDB + FastEmbed | Documents stay local; embeddings fall back to FastEmbed ONNX if no endpoint. |
| II — REMEMBER | 06 | Web search | Self-hosted SearXNG, no search API key | Results come from your instance; DuckDuckGo is optional. |
| III — OPERATE | 07 | Email | Multi-account IMAP/SMTP, threads, pollers | Read, compose, and poll mailboxes; Outlook limits are documented. |
| III — OPERATE | 08 | Calendar + contacts | CalDAV/CardDAV, `.ics` import/export | Sync calendars and contacts; keep the data in your own store. |
| III — OPERATE | 09 | Tasks + notes | Scheduler, event bus, Keep-style notes | Schedule work, react to events, and keep notes next to the rest of your data. |
| IV — MAKE | 10 | Documents | Artifact/canvas editor, Office/PDF extraction | Edit artifacts, extract text from Office and PDF files, keep outputs local. |
| IV — MAKE | 11 | Media + voice | Gallery, generation, TTS/STT | Local `faster-whisper` STT, TTS, image library, and transforms. |
| IV — MAKE | 12 | MCP + bridges | MCP manager, Codex/Claude bridges, API tokens | Connect MCP servers, bridge external agents, issue scoped tokens. |

### 3.5 Architecture layers (the spine sequence)

| Step | Label | Path | What it does |
|---|---|---|---|
| 01 | CLIENT | `static/` | No-build SPA (`index.html` + `js/`); HTTP + SSE |
| 02 | GATE | `app.py` | FastAPI entrypoint: CORS, gzip, timeout, auth, router wiring, lifespan |
| 03 | ROUTES | `routes/` | One module per feature area; thin handlers |
| 04 | LOGIC | `src/` | Agent loop, chat, memory, RAG, research, scheduler, tools |
| 05 | STATE | `data/` + services | SQLite `app.db`, JSON, uploads, vectors; ChromaDB, SearXNG, providers |

Supporting folders shown as annotations, not sequence steps: `core/` (auth, database, middleware), `services/` (docs, search, hwfit, shell, STT, TTS, YouTube), `integrations/` (Codex, Claude), `mcp_servers/`.

**Request trace (annotation line):** `POST /api/chat` with cookie or `ody_` token → auth/middleware → chat routes → agent loop + memory + RAG → provider `/v1/chat/completions` → `text/event-stream` back to the browser.

**Diagram construction:** SVG paths, 1px strokes, mono labels, node dots. No 3D, no isometric illustration, no glowing cards. On desktop the diagram is sticky for ~160vh; on mobile it becomes a stacked five-row list. Reduced motion shows the complete diagram immediately.

### 3.6 Data tree (Hoard visual)

```
data/
  app.db            sessions · messages · documents · tasks
  auth.json         users · privileges
  settings.json     app settings
  memory.json       long-term memory
  presets.json      model presets
  uploads/          chat attachments
  personal_docs/    RAG source documents
  chroma/           local vector persistence
  gallery/          images · uploads · generated
  tts_cache/        speech cache
  skills/           disk-backed skills
  mail-attachments/ email files
```

Annotations: `BACK UP: cp -r data/` · `RELOCATE: ZEPHYRUS_DATA_DIR=/path` · `ONE DIRECTORY, NO HOSTED ACCOUNT`. Do not include a copyable `rm -rf` command.

### 3.7 Install commands

**Docker (default)**

```bash
git clone https://github.com/yash-dev007/Zephyrus.git
cd Zephyrus
cp .env.example .env
docker compose up -d --build
# open http://localhost:7000
```

**Verify**

```bash
docker compose ps
docker compose logs zephyrus | grep -E 'ChromaDB|MemoryVectorStore|DEGRADED'
```

**Linux / macOS (native)**

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m uvicorn app:app --host 127.0.0.1 --port 7000
```

macOS note: `./start-macos.sh` serves on `7860` because AirPlay often holds `7000`.

**Windows (native)**

```powershell
git clone https://github.com/yash-dev007/Zephyrus.git
cd Zephyrus
powershell -ExecutionPolicy Bypass -File .\launch-windows.ps1
```

Notes: Docker is recommended; native needs Python 3.11+; local GPU serving wants Linux/WSL2; on Windows use Ollama at `http://localhost:11434/v1`. Full details link to `docs/setup.md`.

### 3.8 Meta, OG, and structured data

- **Title:** `Zephyrus — Local-first AI harness`
- **Description:** `Self-hosted AI harness: agent loops, memory, RAG, MCP bridges and local model serving in one FastAPI server. Docker install, AGPL-3.0.`
- **OG title:** `Your models. Your machine. Your hoard.`
- **OG description:** `Zephyrus is a local-first AI harness. One FastAPI server, one data directory, every provider you already run.`
- **OG image:** 1200×630, code-generated (Satori + resvg): black field, grain, dragon mark left, wordmark + hairline rule, ASCII field right, `{APP_VERSION} / AGPL-3.0 / :7000` bottom-right. No AI-generated text.
- **Twitter:** `summary_large_image`.
- **Theme color:** `#0A0A0B`.
- **JSON-LD:** `SoftwareApplication` — name, applicationCategory `DeveloperApplication`, operatingSystem `Linux, macOS, Windows`, offers price `0`, license `AGPL-3.0`, sameAs GitHub, softwareVersion. No aggregate rating.
- **Also:** `robots.txt`, sitemap, canonical, `llms.txt` with a concise product summary and deep links. No RSS.

---

## 4. Signature interactions

### 4.1 Hero sigil (the one unforgettable moment)

- A Canvas 2D field of ~1,500–2,300 monospace glyphs on a 4:5 plate.
- On load: resolves from noise into a sphere (≈900ms), holds, then morphs once into the supplied dragon mark silhouette (≈1.6s). No perpetual loop.
- Pointer: small parallax rotation and a phase stir; on hover the grid steps from 32×32 to 48×48. No click required.
- A vertical band of glyphs uses the frost accent at very low density — the “cold breath” / slit. Accent stays under 3% of the canvas.
- Performance: 12fps interval (not rAF), DPR capped at 2, paused when offscreen or `document.hidden`, static single frame under reduced motion, `<noscript>` PNG/SVG fallback.
- Accessibility: canvas is `aria-hidden`; the brand name is in the H1 and nav. A visually hidden sentence describes the sigil for screen readers.
- Failure: if canvas or fonts fail, show the vector mark on the same plate. Never a blank box.

### 4.2 The spine scroll sequence

- Sticky 160vh container, 100vh inner viewport, SVG diagram on the right, layer labels on the left.
- As scroll progress moves 0→1, the path draws, nodes activate in order, and annotations fade in. Active node uses the frost accent; previous nodes go `--muted`.
- `useScroll({ target, offset: ['start end', 'end start'], layoutEffect: false })` + `useSpring` for smoothing. No GSAP.
- Mobile: no sticky; five stacked rows with hairline separators and a one-time reveal.
- Reduced motion: full diagram visible, no drawing, no stickiness.

### 4.3 Capability ledger

- Native `<details>` / `<summary>` so it works without JS; CSS grid `0fr → 1fr` height animation; Motion rotates the chevron and shifts the index.
- One open at a time via a small controller; closing is interruptible.
- 72–96px rows, hairline dividers, roman-numeral group headers. Hover/focus: `--surface-1` row, frost index. No hover-only content.
- `summary` is a real focus target; keyboard Enter/Space works; expanded state is native, so no custom ARIA is needed.

### 4.4 Install tabs

- `role="tablist"` with roving tabindex; ArrowLeft/Right, Home, End; `aria-selected`, `aria-controls`.
- Active underline moves with Motion `layoutId`; panel content cross-fades 120ms.
- Copy button: clipboard API with fallback; `aria-live="polite"` “Copied”; resets after 2s.
- No-JS fallback: all three panels render stacked; only the tab controls hide.
- macOS/WSL/Windows caveats sit below the relevant panel, not in a modal.

### 4.5 Header and mobile menu

- Desktop: sticky, 64px, hairline bottom, `--bg` solid after 24px scroll; scroll progress line at the very top.
- Mobile: menu button is a 44px target; sheet enters from the right and exits right (same path). Focus trap, Escape, restore focus, `inert` on the background, Lenis stopped while open, body scroll locked.
- Menu links are large mono; footer meta includes `AGPL-3.0` and version. No blur, no full-screen image background.
- No-JS: a `<noscript>` style reveals the nav row; the menu button is hidden.

### 4.6 Smooth scroll contract

- Lenis runs only when `prefers-reduced-motion: no-preference` and `navigator.connection.saveData !== true`.
- Wheel smoothing on desktop; native touch momentum on mobile (`syncTouch: false`). Never smooth-scroll a keyboard user's PageDown or a screen reader's jump.
- Anchor links: `scroll-margin-top: 88px`; custom handler scrolls, updates the hash, then moves focus to the target (`tabindex="-1"`). Back/forward still works.
- No scroll snapping, no horizontal scroll sections, no scroll-driven pin longer than 160vh.
- If Lenis fails to initialize, native scrolling is unaffected.

### 4.7 Apple-design checklist

- Press feedback on pointer-down; active states are instant.
- 44×44px minimum targets; visible `:focus-visible` ring (2px frost, 3px offset).
- Springs are interruptible; no input lockout; menus/tabs/accordions animate from their current state.
- Enter/exit paths match; origins are anchored to triggers.
- Reduced motion, reduced transparency, and increased contrast are handled.
- Type tracking is size-specific; leading tightens as size grows.
- No autoplay audio, no cursor followers, no fake 3D, no confetti.

---

## 5. Tech stack

Versions verified against the npm registry on **2026-10-21**. Pin exact versions in `package.json` and commit the lockfile.

### 5.1 Decision table

| Concern | Choice | Version | Why |
|---|---|---|---|
| Framework | **Astro**, static output | `7.4.1` | 90% static type/photography; zero JS by default; build-time image pipeline; no server runtime to secure |
| UI islands | **React** via `@astrojs/react` | `19.3.1` / `7.1.0` | Only interactive/motion-heavy components hydrate; static copy stays HTML |
| Language | **TypeScript** strict | `7.0.2` | Typed content, orb math, scroll helpers, component props |
| Motion | **Motion** (`motion/react`) | `14.5.0` | Current package name for Framer Motion; springs, `useScroll`, `AnimatePresence`, `layoutId` |
| Smooth scroll | **Lenis** | `1.3.27` | Premium wheel feel with native touch and a clean reduced-motion escape hatch |
| Styling | **Vanilla CSS** layers + CSS Modules for islands | — | Bespoke poster design; tokens are smaller and more precise than utility soup |
| Canvas | **Canvas 2D** + TypeScript | — | The sigil is a 2D glyph field; Three.js is unnecessary weight |
| Images | **Sharp** + `astro:assets` | `0.35.5` | AVIF/WebP, fixed dimensions, LQIP, art-directed crops at build |
| Fonts | **@fontsource-variable** Archivo + JetBrains Mono; optional Instrument Serif | `5.3.0` | Self-hosted, OFL, no third-party requests |
| OG image | **Satori** + resvg, build-time route | `0.63.2` | Type-perfect OG; no AI text artifacts |
| Package manager | **pnpm** | `12.14.0` | Fast, strict, lockfile-friendly |
| Runtime | **Node 24 LTS** | `24.x` | Astro 7 baseline; local Node 22 should be upgraded or pinned in `.nvmrc` |
| Lint/format | **ESLint 10** + typescript-eslint + eslint-plugin-astro; **Prettier 3.9** + prettier-plugin-astro | `10.13.0` / `8.72.0` / `3.2.1` / `3.9.10` / `1.1.1` | Mature Astro support; Biome's Astro story is still thinner |
| Unit tests | **Vitest** | `5.0.5` | Orb sampling, scroll math, data formatting |
| E2E/a11y | **Playwright** + **@axe-core/playwright** | `1.64.1` / `4.14.0` | Real browser, keyboard, reduced-motion, mobile viewports |
| Perf CI | **Lighthouse CI** | `0.15.1` | Enforce budgets on every PR |
| Deploy | **Cloudflare Workers Static Assets** | Wrangler latest | Static CDN, custom headers, no runtime; Vercel is the fallback |
| Analytics | **None** by default | — | Privacy is part of the product argument; optional self-hosted Umami later |

### 5.2 Why this shape

- **Astro, not Next.js.** The page is static typography, rules, and photography. Astro ships HTML/CSS with zero framework runtime by default, and its image pipeline gives AVIF/WebP + LQIP without a runtime image service. Next.js 16.4 would add RSC, caching, and server concepts the site does not use. If the site later grows into docs, a playground, or a dashboard, revisit; for v1, Astro is the smaller correct tool.
- **React islands, not a full SPA.** React 19 + Motion only where state or gesture behavior exists: header/menu, sigil, spine, tabs, ledger chevrons. Hero copy, section headings, data tree, and footer remain server-rendered HTML. This protects LCP and keeps the JS budget honest.
- **Motion, not GSAP.** One motion system, not two. Motion covers springs, layout, presence, scroll progress, and in-view work. GSAP is excellent, but it would duplicate the same responsibilities and add a second mental model. No Three.js: the sigil is a glyph field, not a 3D scene.
- **Lenis, with guardrails.** The user explicitly wants smooth scroll for the premium feel. We keep it wheel-only on desktop, native on touch, off for reduced motion, and never hijack keyboard or screen-reader scrolling. It is a feel layer, not a navigation mechanism.
- **Vanilla CSS, not Tailwind.** A poster this specific needs named tokens, custom grid placements, and unusual type behavior. Tailwind 4.3 is a fine tool for app UIs; here it would add class noise and fight the art direction. CSS Modules handle island scoping.
- **Content in git.** Copy and feature data live in `src/data/`, typed. No CMS, no database, no build-time API dependency. The site should be reproducible from a clone.

### 5.3 Rejected alternatives

| Option | Why not |
|---|---|
| Next.js 16 App Router | Unused server complexity, heavier baseline, hosting coupling |
| Vite + React SPA | We would rebuild image optimization, sitemap, and content handling; ships React for static text |
| Three.js / R3F | ~150KB+ for an effect that projects cleanly to 2D canvas |
| GSAP + ScrollTrigger | Duplicates Motion; a second animation system for one pinned section |
| Tailwind CSS | Wrong abstraction for a bespoke broadsheet; tokens + modules are clearer |
| shadcn / MUI / Chakra | Component aesthetics fight the art direction; adds runtime |
| Headless CMS | One page, developer audience, content belongs in git |
| GA4 / cookie banner | Unnecessary weight and a privacy contradiction; no analytics by default |
| Smooth-scroll + scroll-jacking libraries | Lenis is enough; hijacking hurts keyboard, touch, and INP |
| AI-generated OG text / UI | Unreliable typography and fake product surfaces |

### 5.4 Stack verification gate (Phase 1)

Before building sections, run a spike and record the result:

1. `pnpm create astro@latest` → static, TypeScript strict, no Tailwind.
2. Add `@astrojs/react`, React 19.3, Motion 14.5, Lenis 1.3.
3. Build one page with a React island, a Lenis-driven anchor link, and a Motion `useScroll` progress bar.
4. Run `pnpm build`, `pnpm astro check`, `pnpm lint`, `pnpm test`.
5. Verify TS 7.0.2 works with `astro check` + typescript-eslint. If not, pin the newest compatible 6.x/5.9 and document it. No code depends on TS 7-only syntax.
6. Measure the JS baseline. If the initial payload exceeds the budget, convert static reveals to CSS/IntersectionObserver and keep Motion for the hero, menu, tabs, and spine.

**Budget target:** ≤100KB gzip initial JS (target 85KB), ≤100KB fonts, LCP ≤2.0s p75 mobile, CLS ≤0.02, INP ≤200ms.

### 5.5 Repository structure

```
Zephyrus_WEB/
  PLAN.md
  IMAGE_PROMPTS.md
  README.md                  # site README (build/deploy)
  astro.config.mjs
  tsconfig.json
  package.json
  pnpm-lock.yaml
  .nvmrc                     # 24
  .gitignore                 # ref/, dist/, node_modules/, .env
  public/
    favicon.svg
    favicon-32.png
    apple-touch-icon.png
    robots.txt
    llms.txt
    _headers                 # Cloudflare security/cache headers
  src/
    pages/
      index.astro
      colophon.astro
      404.astro
      og.png.ts              # Satori, prerendered
    layouts/
      Base.astro
    components/
      layout/  Header.tsx · Footer.astro · SkipLink.astro
      sections/ Hero.astro · Lair.astro · Anatomy.astro · Spine.astro
                Hoard.astro · Kin.astro · Rite.astro · Wind.astro
      ui/      Plate.astro · Rule.astro · SectionHeader.astro
                Stamp.astro · Barcode.astro · Terminal.astro
      motion/  SigilCanvas.tsx · ScrollProgress.tsx · Reveal.tsx
                SpineSequence.tsx · MobileMenu.tsx
      forms/   InstallTabs.tsx · CopyButton.tsx
    data/
      site.ts                # title, description, version, links
      capabilities.ts        # 12 rows, groups, details
      providers.ts           # local + hosted lists
      install.ts             # commands + verification
      images.ts              # filenames, alt, dimensions, credits
    styles/
      tokens.css
      base.css
      type.css
      layout.css
      motion.css
    scripts/
      smooth-scroll.ts
      reveal.ts
    assets/
      brand/                 # vectorized mark, lockups, stamp
      images/                # source photography (optimized by Astro)
  scripts/
    vectorize-logo.sh
    generate-grain.mjs
    optimize-images.mjs
  tests/
    e2e/                     # nav, tabs, menu, anchors, 404
    a11y/                    # axe on /, /colophon, /404
    visual/                  # 375 / 768 / 1440 + reduced motion
    unit/                    # orb sampling, install formatting
  .github/workflows/ci.yml
```

### 5.6 Content/data model

- `site.ts`: `name`, `description`, `version` (manually synced from `src/constants.py` `APP_VERSION`), `repo`, `docsBase`, `license`, `edition`, `og`.
- `capabilities.ts`: `{ group, index, name, spec, detail, href? }[]` — exactly 12.
- `providers.ts`: `{ local: string[], hosted: string[] }` — names only, no logos.
- `install.ts`: `{ id, label, commands, note?, verify? }[]` — rendered by tabs and plain fallbacks.
- `images.ts`: import metadata from `astro:assets`, plus `alt`, `caption`, `credit`, `position` for `object-position`.
- No runtime fetch for GitHub stars in v1. The CTA is static; no third-party request, no rate-limit failure state.

### 5.7 Build, CI, and deploy

**Commands**

```bash
pnpm install
pnpm dev              # local
pnpm build            # static dist/
pnpm preview          # serve dist/
pnpm astro check      # types + content
pnpm lint             # eslint + prettier check
pnpm test             # vitest
pnpm test:e2e         # playwright
pnpm lhci             # lighthouse budgets
```

**CI (GitHub Actions, Node 24 + pnpm cache)**
1. Install with frozen lockfile.
2. Typecheck, lint, unit tests.
3. Build.
4. Playwright + axe against `dist/` preview.
5. Lighthouse CI budgets.
6. Deploy preview on PR; production on `main` (Cloudflare).
7. `pnpm audit --prod` as a non-blocking report; Renovate/Dependabot monthly.

**Cloudflare**
- Static assets only; no adapter, no server runtime.
- `_headers`: immutable caching for `/_astro/*`; `no-cache` for HTML; security headers.
- CSP baseline: `default-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`. Motion writes inline style attributes, so `style-src` includes `'unsafe-inline'`; test whether Astro emits inline scripts and tighten with hashes if needed.
- HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (no camera/mic/geolocation).
- No cookies and no analytics by default; no third-party requests at launch. If analytics is added later, it must be cookieless and self-hosted (Umami) and documented in the colophon.

**Deploy alternatives:** Vercel or Netlify static; the build output is portable. The plan assumes Cloudflare for cost, headers, and CDN behavior.

### 5.8 Testing matrix

| Layer | Tool | Cases |
|---|---|---|
| Unit | Vitest | Sigil point sampling, ASCII grid math, install command formatting, Lenis guard |
| E2E | Playwright | Header/menu, anchors + focus, tabs keyboard, copy button, `<details>` ledger, external links, 404 |
| A11y | axe + manual | `/`, `/colophon`, `/404`; zero serious/critical; keyboard-only; 200% zoom |
| Visual | Playwright screenshots | 375, 768, 1440; default + reduced motion; hero, spine, install, footer |
| Perf | Lighthouse CI | Mobile + desktop budgets; LCP element check; no third-party |
| Cross-browser | Playwright projects | Chromium, WebKit, Firefox; iOS Safari device profile |
| Content | Manual | Copy accuracy vs README; version; license; provider names |

---

## 6. Brand assets

### 6.1 Logo audit

Source: `ref/Zephyrus-Logo.png` — 780×210 RGBA, transparent, light gray `#D7D8D8`. The mark occupies roughly `116×130` at x=144–259; the wordmark occupies `358×44` at x=275–632. The wordmark is custom italic lettering, not a standard font.

**Issues to solve**
- Too low-resolution for a large hero or retina footer.
- The wordmark is only 44px tall; upscaling will soften.
- The gray is dull on a black field; the site uses `#F2F2F0`.
- The mark and wordmark need separate assets and clear-space rules.

**Approach**
1. Rasterize at high scale, isolate alpha, trace with Potrace/vtracer, then clean curves manually in Inkscape/Figma.
2. Rebuild the **mark** first; it is the hero/sigil source and the favicon. Simplify for 16px (drop the finest scale details).
3. Trace the **wordmark** only if the curves survive cleanup. If not, use it at ≤24px display height (source is adequate) and set oversized “ZEPHYRUS” in Archivo for the footer/OG. Do not fake a font match.
4. Deliver light, black, and frost variants; test on `#0A0A0B` and `#F2F2F0`.
5. Define clear space = the height of the mark's eye/coil gap; minimum sizes: mark 20px, lockup 96px wide.

### 6.2 Vector deliverables

| File | Use |
|---|---|
| `mark.svg` | Sigil fallback, favicon source, stamp center, OG |
| `mark-simplified.svg` | 16–24px favicon/app icon |
| `wordmark.svg` | Small nav/footer lockup if trace quality holds |
| `lockup-horizontal.svg` | Header, footer, OG |
| `lockup-stacked.svg` | Colophon, social, print |
| `stamp.svg` | Circular seal: mark + `ZEPHYRUS / LOCAL-FIRST / EDITION 2026 / AGPL-3.0` |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Browser + iOS |
| `mark-mono.svg`, `mark-frost.svg` | Accent/hover variants; use sparingly |

**Acceptance:** crisp at 16px, 32px, 64px, and 512px; no filled counters; no jagged scale edges; balanced optical weight against Archivo and JetBrains Mono.

### 6.3 Image slots

All prompts, negatives, alt text, crops, and delivery specs are in **`IMAGE_PROMPTS.md`**.

| # | File | Placement | Ratio | Priority | Notes |
|---|---|---|---|---|---|
| 01 | `lair-server.avif` | 01 Lair, right plate | 4:5 | P0 | Basement rack; subject lower third; negative space top |
| 02 | `hoard-desk.avif` | Full-bleed interlude after 02 Anatomy | 3:2 | P1 | CRT, drives, coiled cable; caption strip, no text over image |
| 03 | `ward-relief.avif` | 04 Hoard/Ward plate | 3:4 | P0 | Weathered stone dragon relief over a door; the only literal dragon scene |
| 04 | `ward-eye.avif` | 04 Ward, 1:1 inset (optional) | 1:1 | P2 | Macro reptile eye, ice-blue iris; drop if it reads CGI/fantasy |
| 05 | `wind-corridor.avif` | 07 Wind closing | 16:9 | P0 | Wind in a concrete corridor; copy on solid band/scrim |
| 06 | `scales-texture.avif` | Anatomy/Hoard background (optional) | 1:1 | P2 | Near-abstract blackened steel “scales”; 4% opacity |
| 07 | `product-ui.png` | 03 Spine or 02 Anatomy (optional) | 16:10 | P1 | **Real screenshot only**, supplied by you; never AI-generated |
| 08 | `og.png` | Social cards | 1200×630 | P1 | Code-generated with Satori; not AI |

**Hero has no photograph.** The LCP is the H1 text; the sigil plate is Canvas 2D. This keeps the first paint fast and preserves the black-paper impact. The photography starts at Lair, below the fold.

### 6.4 Image treatment

- Fully desaturate, neutral grade, crush blacks toward `#0A0A0B`, cap highlights around 92%, add subtle halation, keep grain. Do not double-grade; the CSS grain layer is light.
- Portrait plates bleed off one edge only. Type overlays live only in the darkest 40%, with a bottom scrim `--bg → transparent` at 55%; verify ≥4.5:1 at the brightest pixel.
- Mono label inset 16px top-left; 1px inset frame; 11px caption bottom-right. No centered type over a face; no text strokes.
- `object-fit: cover` with per-image `object-position` in `images.ts`; fixed aspect boxes to protect CLS.
- Lazy-load everything below the hero; `decoding="async"`; `srcset` widths 640/960/1280/1600/2000 where useful.

### 6.5 OG, favicons, and social

- OG is a build-time `og.png.ts` route: 1200×630, black, grain, mark left, `ZEPHYRUS` in Archivo, `LOCAL-FIRST AI HARNESS` + `v{APP_VERSION}` in JetBrains Mono, a small ASCII field right, hairline frame, `AGPL-3.0 / :7000` bottom-right. Reuse the site tokens; no separate design.
- Favicon: simplified mark on `#0A0A0B`; test at 16px. Provide SVG + 32px PNG + 180px Apple touch icon + 512px maskable.
- No AI-generated text in OG, favicons, or stamps.
- Twitter/X, LinkedIn, Discord previews checked manually.

### 6.6 AI image policy

- AI images are **art direction references for photography only** — no UI, no logos, no readable text, no fake charts, no fake product screenshots.
- The only literal dragon scene is the stone relief photograph; the optional eye is a macro fragment. No AI dragon character, no wings/armor/fire.
- Keep originals and generation metadata in `ref/images/source/` (gitignored). Deliver optimized files to `src/assets/images/`.
- Reject outputs with: text artifacts, extra limbs, plastic skin, glowing eyes/runes, HDR halos, digital sharpness, fake bokeh balls, watermarks, brand logos, or a “concept art” look.
- The eye image is optional and the only colored photo; if it looks like fantasy illustration, cut it. The page works without it.
- Colophon credits the generation tool and any retouching once known.

---

## 7. Quality gates

### 7.1 Performance budgets

| Metric | Budget |
|---|---|
| LCP (p75 mobile) | ≤ 2.0s |
| LCP (desktop lab) | ≤ 1.2s |
| CLS | ≤ 0.02 |
| INP | ≤ 200ms |
| Initial JS | ≤ 100KB gzip (target 85KB) |
| Fonts | ≤ 100KB total, two preloaded WOFF2 + optional serif |
| Hero LCP element | H1 text, not an image |
| Above-fold photography | None |
| Photo AVIF | ≤ 180KB each; lazy below fold |
| Grain tiles | ≤ 20KB total |
| Lighthouse mobile | ≥ 95 performance, 100 a11y, 100 SEO, ≥ 95 best practices |
| Third-party requests | 0 |

**Techniques:** Astro static HTML, `build.inlineStylesheets: 'auto'`, font preload + metric fallback, fixed aspect boxes, `loading="lazy"` + `decoding="async"`, Canvas at 12fps with DPR cap, `content-visibility: auto` for long below-fold sections (test first), no client-side data fetching, no analytics by default.

### 7.2 Accessibility (WCAG 2.2 AA)

- One `h1`; ordered headings; semantic landmarks; skip link; visible focus.
- 44×44px targets; 2px frost focus ring at 3px offset; never removed.
- All text ≥4.5:1; interactive boundaries ≥3:1; `--faint` non-text only.
- Text over photos: solid band or ≥78% scrim; verify at the brightest pixel and at 200% zoom.
- Keyboard: tabs, menu, `<details>` ledger, copy buttons, anchors; focus moves to anchor targets; the menu traps focus, closes on Escape, restores focus.
- Screen reader: canvas and decorative layers `aria-hidden`; copy status `aria-live`; real button/link elements; no “clickable div”.
- Reduced motion: Lenis off, static sigil, opacity-only reveals, no parallax, no sticky spine.
- Reduced transparency: no blur is used; surfaces are solid.
- Increased contrast: bump `--muted` toward `--text` and hairlines toward `--hairline-strong`.
- Test: keyboard-only, VoiceOver or NVDA, 200% zoom, 4× CPU throttle, iOS Safari.

### 7.3 SEO

- Static HTML, semantic headings, canonical, sitemap, robots.
- Title/description/OG as in §3.8; `summary_large_image`.
- JSON-LD `SoftwareApplication`; no fake ratings.
- Internal anchors descriptive; external links `rel="noopener noreferrer"` and an ↗ glyph.
- `llms.txt` with a concise product summary + links (docs, repo, license, setup).
- 404 returns the correct status and offers a route home.
- No keyword stuffing, no hidden text, no doorway pages.

### 7.4 Security and privacy

- Static output; no secrets, no API keys, no server runtime.
- CSP + HSTS + nosniff + referrer + permissions headers via `_headers`.
- External links safe; no `target="_blank"` without `noopener`.
- No cookies and no third-party analytics by default; optional self-hosted cookieless Umami if measurement is required. No third-party fonts/scripts, no embedded video.
- Dependency audit in CI; Renovate/Dependabot monthly.
- Product links point to the canonical GitHub repo; license links to `LICENSE`.
- Footer disclaimer: not affiliated with model providers; provider names are trademarks of their owners.

### 7.5 Browser support

Evergreen Chrome, Edge, Firefox, Safari (last two versions); iOS Safari 17+. Astro serves modern HTML/CSS; canvas has a static fallback; `<details>` and native anchors work without JS; no reliance on experimental CSS scroll-driven animations.

### 7.6 Acceptance checklist

- [ ] All copy matches the approved deck; version, port, license accurate.
- [ ] Hero renders text immediately; sigil never blocks LCP.
- [ ] Lenis disabled under reduced motion; anchors move focus; no scroll trap.
- [ ] Mobile menu enters/exits from the same side; focus trapped/restored.
- [ ] Tabs keyboard-operable; copy button announces success.
- [ ] Ledger works without JS; details are not hover-only.
- [ ] Every image has alt text; decorative layers are hidden.
- [ ] No console errors; no horizontal scroll at 320/375/768/1440.
- [ ] Lighthouse budgets pass; axe zero serious/critical.
- [ ] OG preview verified; favicon crisp at 16px.
- [ ] Security headers verified with `curl -I`.
- [ ] `ref/` is gitignored; no unlicensed reference imagery shipped.

---

## 8. Build phases

| Phase | Work | Gate | Effort |
|---|---|---|---|
| **0 — Approve + assets** | Sign off this plan; vectorize logo; generate/collect P0 images; confirm domain, version, links | Assets ready; decisions closed | 0.5–1 day |
| **1 — Foundation** | Astro 7 scaffold, React/Motion/Lenis spike, TS/ESLint/Prettier, tokens, fonts, grain, grid, header/footer, static hero + Lair | Stack spike green; responsive screenshots; baseline Lighthouse | 1–2 days |
| **2 — Motion system** | Lenis, Motion config, sigil canvas, scroll progress, reveals, mobile menu, reduced-motion paths | 60fps/INP on mid-tier; no scroll trap; static fallback | 1–2 days |
| **3 — Sections** | Anatomy ledger, spine sequence, Hoard/Ward, Kin, Rite tabs, Wind, footer, colophon | All content in place; keyboard + mobile + copy review | 2–3 days |
| **4 — Assets + polish** | Photos integrated, logo, OG/favicons, image optimization, SEO/JSON-LD, 404, llms.txt | LCP/CLS/image budgets; OG preview | 1–2 days |
| **5 — QA + launch** | Playwright/axe, Lighthouse CI, cross-browser, headers, domain, final copy | All gates pass; launch checklist signed | 1 day |

**Total:** ~6–10 focused build sessions. No production code is written before Phase 0 approval.

---

## 9. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Lenis + Motion + sticky spine conflict on Safari/iOS | Medium | Spike first; native touch (`syncTouch: false`); test WebKit; fall back to non-sticky diagram |
| JS payload exceeds budget (React + Motion + Lenis) | Medium | `client:visible` below fold; keep static copy HTML; if needed, use Motion's vanilla API for reveals; measure in Phase 2 |
| AI images look like fantasy concept art | High | Strict prompts; grayscale; no glowing eyes/runes; only the stone relief is a literal scene; reject and regenerate |
| Logo tracing quality is poor | Medium | Vectorize the mark first; keep the wordmark at small sizes; use Archivo for oversized type; never fake the custom lettering |
| Hero text hidden until hydration | Medium | SSR visible; CSS load animation; no `opacity:0` above the fold; Motion only enhances |
| Grain + photos hurt LCP/INP | Low | Hero has no image; static grain tile; lazy images; disable on Save-Data |
| Dragon theme becomes kitsch | Medium | Restraint rules in §2.3; dragon only in eyebrows, captions, mark, one relief; literal feature names |
| Smooth scroll hurts accessibility | Medium | Reduced-motion off, native touch, keyboard intact, anchor focus, no hijack |
| Product copy drifts from the repo | Medium | Central `src/data/site.ts`; link to README; version constant; review at Phase 5 |
| Provider trademarks / affiliation confusion | Low | Text-only names; footer disclaimer; no logos |
| CSP blocks Motion inline styles | Low | Test headers; `style-src 'unsafe-inline'` baseline; tighten with hashes if possible |
| Reference imagery/licensing leaks into production | Low | `ref/` gitignored; only generated/owned images; colophon credits |
| Font swap causes layout shift | Low | Self-host WOFF2, preload two files, metric-matched fallbacks, `font-display: swap` |

---

## 10. Decisions to confirm (defaults proposed)

1. **Dragon intensity:** restrained myth (default). The mark/sigil + one stone relief + optional eye; no fantasy illustration.
2. **Stack:** Astro 7 + React 19 islands + Motion 14 + Lenis 1.3 (default). Alternative: Next.js 16 if you want a React-first codebase, at a heavier baseline.
3. **Smooth scroll:** Lenis wheel-only on desktop, native touch, off for reduced motion (default).
4. **Colophon page:** include (default). It signals craft and documents type, stack, credits, accessibility.
5. **Eye image:** optional P2; include only if it reads as analog macro, not fantasy (default: decide after generation).
6. **Product screenshot:** optional; real capture only (default: omit until you supply one).
7. **Deploy:** Cloudflare static (default); Vercel/Netlify alternative.
8. **Domain:** TBD. Until confirmed, canonical is a placeholder in `site.ts`; do not launch with a placeholder.
9. **Analytics:** none (default). If added later: self-hosted Umami, cookieless, documented.
10. **Live GitHub stars:** no (default). Static CTA, no third-party request.
11. **Product version:** manually sync `APP_VERSION` from `src/constants.py` (default); build-time GitHub fetch only if you want automation.
12. **Site source license:** AGPL-3.0 to match the product (default), unless you want the site code separate.
13. **Light theme:** no (default). The art direction is black; `color-scheme: dark`.
14. **`llms.txt`:** yes (default). Concise summary + deep links.

---

## 11. Approval checklist

- [ ] Concept **THE WYRM IN THE MACHINE** and restraint rules approved.
- [ ] Copy deck and section order approved (or edits listed).
- [ ] Stack approved: Astro 7 + React 19 + Motion 14 + Lenis 1.3.
- [ ] Dragon treatment approved: mark/sigil, stone relief, optional eye.
- [ ] Image slots + prompts approved; generation can start.
- [ ] Deploy/domain/analytics decisions confirmed.
- [ ] Build phases and gates approved.

**To approve:** reply **APPROVE**, or list changes. No code will be written until then.

---

## Appendix A — Desktop wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ZEPHYRUS [mark]      ANATOMY  ARCHITECTURE  LOCAL-FIRST  PROVIDERS  GITHUB │
│                                                   [ INSTALL ]             │
├──────────────────────────────────────────────────────────────────────────┤
│ 00 / THE WYRM                                                            │
│                                                                          │
│  YOUR MODELS.                              ┌───────────────────────────┐  │
│  YOUR MACHINE.                             │   [ ASCII WYRM SIGIL ]    │  │
│  YOUR HOARD.                               │                           │  │
│                                            │   THE WYRM / SIGIL 001    │  │
│  A local-first AI harness for              └───────────────────────────┘  │
│  OpenAI-compatible models...                                             │
│  [ INSTALL ]  [ SOURCE ↗ ]                                               │
│  APP.PY :7000   DATA/ LOCAL   SSE   AUTH ON                              │
├──────────────────────────────────────────────────────────────────────────┤
│ 01 / THE LAIR           Not a wrapper. A harness.                        │
│  [ text 6 cols ]                          [ 4:5 lair photo plate ]       │
├──────────────────────────────────────────────────────────────────────────┤
│ 02 / THE ANATOMY        Twelve systems. One organism.                    │
│  I REASON   01 Agent loop   02 Deep research   03 Model compare          │
│  II REMEMBER 04 Memory      05 RAG             06 Web search             │
│  III OPERATE 07 Email       08 Calendar        09 Tasks + notes          │
│  IV MAKE     10 Documents   11 Media + voice   12 MCP + bridges          │
├──────────────────────────────────────────────────────────────────────────┤
│ [ full-bleed 3:2 desk interlude + caption strip ]                        │
├──────────────────────────────────────────────────────────────────────────┤
│ 03 / THE SPINE          One server. Every layer on the table.            │
│  CLIENT → GATE → ROUTES → LOGIC → STATE        [ sticky SVG diagram ]    │
├──────────────────────────────────────────────────────────────────────────┤
│ 04 / THE HOARD          Your data has an address. It's yours.            │
│  [ data tree ]                            [ 3:4 stone relief plate ]     │
│  THE WARD  auth · privileges · degraded state · threat model             │
├──────────────────────────────────────────────────────────────────────────┤
│ 05 / THE KIN            Bring the model you already run.                 │
│  LOCAL: OLLAMA LM STUDIO VLLM SGLANG LLAMA.CPP ANY /V1                   │
│  HOSTED: ANTHROPIC GEMINI GROQ XAI OPENROUTER OPENAI DEEPSEEK            │
├──────────────────────────────────────────────────────────────────────────┤
│ 06 / THE RITE           Four commands to a local console.                │
│  [ DOCKER ] [ LINUX / MACOS ] [ WINDOWS ]                                │
│  $ git clone ...                                                         │
│  $ docker compose up -d --build                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ 07 / THE WIND           Run it before you trust it.                      │
│  [ full-bleed 16:9 wind corridor + copy on solid band ]                  │
│  [ INSTALL ]  [ STAR ON GITHUB ↗ ]                                       │
├──────────────────────────────────────────────────────────────────────────┤
│ FOOTER: lockup · product · source · trust · colophon · barcode · stamp    │
└──────────────────────────────────────────────────────────────────────────┘
```

## Appendix B — Mobile wireframe (375px)

```
┌─────────────────────────────┐
│ ZEPHYRUS              ☰     │
├─────────────────────────────┤
│ 00 / THE WYRM               │
│ YOUR MODELS.                │
│ YOUR MACHINE.               │
│ YOUR HOARD.                 │
│ ┌─────────────────────────┐ │
│ │   [ ASCII WYRM SIGIL ]  │ │
│ └─────────────────────────┘ │
│ subcopy                     │
│ [ INSTALL ]                 │
│ [ SOURCE ↗ ]                │
│ APP.PY :7000 · DATA/ · SSE  │
├─────────────────────────────┤
│ 01 / THE LAIR               │
│ Not a wrapper. A harness.   │
│ [ 4:5 photo, full width ]   │
├─────────────────────────────┤
│ 02 / THE ANATOMY            │
│ [ accordion rows ]          │
├─────────────────────────────┤
│ 03 / THE SPINE              │
│ [ stacked 5 layers ]        │
├─────────────────────────────┤
│ ...                         │
└─────────────────────────────┘
```

## Appendix C — Motion tokens

```css
:root {
  --ease-reveal: cubic-bezier(.16, 1, .3, 1);
  --ease-state: cubic-bezier(.4, 0, .2, 1);
  --dur-hover: 120ms;
  --dur-state: 220ms;
  --dur-reveal: 520ms;
}
```

```ts
export const spring = {
  ui:     { type: 'spring', bounce: 0, duration: 0.45 },
  press:  { type: 'spring', bounce: 0, duration: 0.28 },
  menu:   { type: 'spring', bounce: 0, duration: 0.42 },
  reveal: { type: 'spring', bounce: 0, duration: 0.55 },
} as const;
```

**Rules:** no animation over 1.1s; transform/opacity/clip-path only; `will-change` sparingly; no transition on `height` except `<details>` via grid rows; pause canvas offscreen; no motion under reduced motion beyond opacity ≤120ms.

## Appendix D — Definition of done

A launch is done when:
1. The page states what Zephyrus is, who it is for, and how to run it — in under 30 seconds.
2. The dragon reads as a guardian of local data, not a fantasy skin.
3. The sigil is memorable without blocking the LCP text.
4. Smooth scroll feels premium but is invisible to keyboard/reduced-motion users.
5. Every claim is traceable to the repo README or docs.
6. Lighthouse, axe, and the visual matrix pass on the agreed budgets.
7. The site can be rebuilt from a clean clone with `pnpm install && pnpm build`.

