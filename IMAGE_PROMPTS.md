# ZEPHYRUS — Image Generation Prompts

**For:** the Zephyrus marketing site (`PLAN.md`)
**Status:** ready to generate after plan approval
**Art direction:** COLD BREATH — black technical broadsheet, analog monochrome, one frost-blue signal
**Rule:** the dragon is a guardian, not a fantasy character. One literal dragon scene maximum; the optional macro eye is a fragment, not a scene.

---

## 0. How to use this file

1. Read the global direction and negative prompt first.
2. Generate the **P0** shots before the P1/P2 shots; the layout can ship with P0 only.
3. Generate at the stated aspect ratio. Do not crop with the model; we crop in build.
4. Deliver the largest useful original (≥2K on the long edge), no borders, no text, no watermark.
5. Keep originals in `ref/images/source/` (gitignored). Optimized files go to `src/assets/images/`.
6. Reject anything that looks like concept art, CGI, or a game splash screen — even if it is beautiful.

The supplied reference image is a **tonal reference only** (grain, contrast, black field, mono type). Do not reproduce its layout, its “EMERGENCE” branding, its “BY OPENAI” strip, or its exact compositions.

---

## 1. Global art direction

**What these photographs are:** quiet, cold, architectural documentary images of the places and objects around a self-hosted machine. A basement server room. A desk at 2am. A carved door. A corridor with wind in it. They feel found, not staged.

**Treatment:** black-and-white analog film, deep crushed blacks, silver highlights, visible halide grain, slight halation, dust and faint scratches, neutral contrast. No color except the optional eye. No HDR, no digital sharpness, no CGI, no “epic” lighting.

**Composition:** generous negative space for typography; subjects in the lower third or off-center; 35mm or medium-format documentary framing; no centered hero shots; no faces looking at camera; no brand names or readable text in frame.

**Mood:** archival, patient, slightly ominous, expensive restraint. Think a technical monograph about a machine that lives under a desk — not a fantasy campaign.

---

## 2. Global prompt suffix

Append this to every photographic prompt unless the prompt says otherwise:

```
Editorial black-and-white analog photograph, documentary architectural still life, quiet and ominous, shot on 35mm Kodak Double-X 5222 pushed two stops, deep crushed blacks, silver highlights, visible halide grain, subtle halation, dust and faint scratches, no color, no HDR, no digital sharpness, no CGI, no text, no logos, no watermark, no border.
```

## 3. Global negative prompt

```
color, sepia, HDR, CGI, 3D render, digital illustration, fantasy art, concept art, glowing runes, glowing eyes, fire, neon, armor, swords, castles, flying dragons, epic landscape, lens flare, bokeh balls, oversharpened, plastic texture, smooth skin, text, letters, numbers, signage, logo, watermark, border, frame, collage, split screen, UI, screenshot, cartoon, anime, low resolution, JPEG artifacts
```

For the eye image, replace `color` with `saturated colors other than pale ice blue, red, orange, green` and keep the rest.

---

## 4. Shot list

| # | File | Placement | Ratio | Priority | Alt text |
|---|---|---|---|---|---|
| 01 | `lair-server.avif` | 01 Lair, right plate | 4:5 | **P0** | A single black server rack in a bare concrete basement, lit by one cold status light. |
| 02 | `hoard-desk.avif` | Full-bleed interlude after 02 Anatomy | 3:2 | P1 | A dark desk with a glowing CRT, stacked hard drives, and a coiled cable. |
| 03 | `ward-relief.avif` | 04 Hoard/Ward plate | 3:4 | **P0** | A weathered stone dragon relief above a concrete doorway, lit by a raking flashlight. |
| 04 | `ward-eye.avif` | 04 Ward, 1:1 inset (optional) | 1:1 | P2 | Macro of a reptilian eye with a pale ice-blue iris. |
| 05 | `wind-corridor.avif` | 07 Wind closing | 16:9 | **P0** | Wind moving dust and a plastic sheet through a dark concrete corridor. |
| 06 | `scales-texture.avif` | Section texture (optional) | 1:1 | P2 | Overlapping blackened steel plates that resemble scales. |
| 07 | `og-backdrop.avif` | OG background (optional) | 2:1 | P1 | Abstract field of white marks forming a coiled dragon silhouette. |

**Not generated with AI:** the logo/mark, favicons, OG typography, stamps, barcodes, ASCII sigil, product UI. See §8.

---

## 5. Delivery specification

- **Resolution:** at least 2048px on the long edge; 2400–3000px preferred for full-bleed.
- **Format:** 16-bit TIFF or high-quality PNG/JPEG original. We export AVIF/WebP at build.
- **Color:** grayscale sRGB; the eye may keep only the iris in pale ice blue (`#8FE0FF` family).
- **Crop safety:** keep the subject and any important edges ≥8% inside the frame; we will crop for 4:5, 3:2, 3:4, 1:1, or 16:9.
- **No baked-in typography, borders, frames, or watermarks.**
- **Grain:** subtle halide grain is welcome; do not add digital noise. The site adds a light grain layer.
- **Files:** lowercase, hyphenated, no spaces. Keep a contact sheet of chosen generations.

---

## 6. Prompts

### 01 — THE LAIR / basement server room

**Placement:** Section 01, right-hand 4:5 plate. This is the first photograph after the hero, so it carries the “found place” feeling.
**Caption:** `THE LAIR / 002`
**Priority:** P0

**Prompt**

```
Night interior of a small windowless server room in a converted basement. A single matte-black 12U rack stands against rough poured concrete; thin black cables run across the floor and disappear into a wall conduit. One cold status LED reflects across brushed aluminum. Haze in the air, a faint light leak from a door at the far edge. Camera at chest height, 35mm lens, f/4, long exposure on a tripod. The rack sits in the lower third; the upper 40% is empty concrete wall for typography. 4:5 portrait. No people. No text on equipment. No brand logos.
```

**Composition notes**
- Subject lower third; empty wall above for the plate header and caption.
- One small light source only. The room should be almost black at the edges.
- Cables should read as veins, not a messy pile; keep them thin and deliberate.
- No blinking-light “hacker” cliché, no monitors with code, no fake UI.

**Reject if:** it looks like a stock data center, has a person, has readable labels, or is lit like a product shoot.

---

### 02 — THE HOARD / desk still life

**Placement:** Full-bleed 3:2 interlude between Anatomy and Spine. A caption strip sits below the image, not over it.
**Caption:** `THE HOARD / FIELD NOTE 01`
**Priority:** P1

**Prompt**

```
Three-quarter overhead still life of a dark wooden workbench at night: a small vintage CRT terminal glowing faintly, a stack of bare hard drives, a coil of black cable arranged in a loose spiral like a sleeping serpent, a closed black notebook, a matte ceramic tile with a subtle scale pattern, dust. Harsh direct on-camera flash, hard shadows, quick falloff into black. 3:2 landscape. The CRT screen is blank glow, no text. No brand names.
```

**Composition notes**
- The coiled cable is the only “dragon” in the frame: a spiral, not a snake with a face.
- Leave a quiet top-right area for the caption strip.
- The CRT is a warm point of light, but the image stays monochrome.
- Objects should feel used, not styled for a catalog.

**Reject if:** the screen shows code/text, the objects look plastic, or the flash is flat and even.

---

### 03 — THE WARD / stone dragon relief

**Placement:** Section 04, 3:4 portrait plate. This is the only literal dragon scene on the site; the optional eye is a fragment.
**Caption:** `THE WARD / 004`
**Priority:** P0

**Prompt**

```
An eroded stone relief of a coiled serpentine dragon carved above a brutalist concrete doorway, photographed at night as found. The carving is old and softened by weather, moss in the crevices, one horn broken. Raking flashlight from below left, deep shadows, wet concrete. Medium format, 80mm lens, f/5.6, sharp center with edge falloff. 3:4 portrait. Architectural documentary. No glowing eyes, no fire, no people, no text.
```

**Composition notes**
- It must read as a real architectural carving, not a fantasy illustration.
- The dragon is coiled, circular, almost like the supplied mark; the eye is not glowing.
- Leave the top 15% dark for the plate label.
- Moss, erosion, and wet stone are the texture. No gold, jewels, or runes.

**Reject if:** it has glowing eyes, a full dragon body, wings, fire, armor, or a “mystical temple” look. If the model cannot resist fantasy, generate a weathered **serpent relief** instead and let the copy carry the dragon.

---

### 04 — THE EYE / macro (optional)

**Placement:** Section 04, small 1:1 inset beside the Ward copy. Maximum 320px. This is the only color photograph on the site.
**Caption:** `THE WARD / WATCH`
**Priority:** P2 — cut it if it reads as CGI or fantasy.

**Prompt**

```
Extreme macro of a large reptilian eye, vertical slit pupil, iris pale ice blue, surrounding scales matte black and slightly wet. A window reflection crosses the cornea. 100mm macro lens, f/8, shallow depth of field, studio darkness. 1:1 square. The iris is the only colored element; everything else monochrome. Analog film grain, no CGI sheen. No text.
```

**Negative override**

```
saturated colors other than pale ice blue, red, orange, green, glowing, laser, cartoon, CGI, illustration, text, logo, watermark, border
```

**Composition notes**
- The eye fills the frame; no full head, no horns, no neck.
- Ice blue must sit close to `#8FE0FF` after grading; we may desaturate further in build.
- If it looks like a movie creature, drop it. A cold macro of a machine lens would be a safer fallback.

---

### 05 — THE WIND / corridor long exposure

**Placement:** Section 07, full-bleed 16:9 closing image. Copy sits on a solid band or ≥78% scrim, never directly on a busy area.
**Caption:** `THE WIND / 007`
**Priority:** P0

**Prompt**

```
Long exposure inside a dark concrete corridor at night. Wind pushes dust and a torn translucent plastic sheet sideways across the frame; a single distant cold light at the far end. Brutalist architecture, wet floor, faint reflections. 24mm lens, f/8, 4-second exposure, tripod. 16:9 landscape. Architecture sharp; only the sheet and dust blur. No people, no ghost figures, no text.
```

**Composition notes**
- The movement is sideways, like the west wind; it should not look like smoke or a ghost.
- Keep the lower third calm enough for a caption/CTA band.
- One distant light; no neon, no doorway glow, no lens flare.
- This is the release after the technical middle of the page. It can be the most atmospheric image.

**Reject if:** there is a figure, a face, a glowing portal, or a horror-movie vibe.

---

### 06 — SCALES / material texture (optional)

**Placement:** A faint background texture in Anatomy and Hoard, ≤4% opacity. Not a standalone image.
**Priority:** P2

**Prompt**

```
Near-abstract macro of overlapping blackened steel roof shingles, industrial scale-like plates, raking hard light from the left, wet edges, deep shadows. 1:1 square. Monochrome, high micro-contrast, analog grain. No text.
```

**Notes:** It should look like roofing or industrial cladding, not reptile skin. If it reads as a dragon texture, it is too literal. We may generate this pattern procedurally instead.

---

### 07 — OG backdrop (optional, code-composed)

**Placement:** 1200×630 social card. The type and logo are composed in code; this is only the background field.
**Priority:** P1 — but prefer generating the whole OG in code.

**Prompt**

```
A dense field of tiny white marks and points forming the abstract silhouette of a coiled dragon on pure black, high contrast, no text, no letters, no words, 2:1 landscape. The silhouette is grainy, like a halftone field. No glowing eyes, no fantasy illustration.
```

**Notes:** AI often adds fake glyphs; if so, discard. The site can generate the field from the logo alpha at build time. Never let AI set the word “ZEPHYRUS”, the version, or the license.

---

## 7. Do not generate

| Asset | How it is made |
|---|---|
| Dragon mark / wordmark / lockups | Vectorize `ref/Zephyrus-Logo.png` |
| Favicons / app icons | Derive from the vector mark |
| Stamp / barcode | SVG in code |
| ASCII sigil / hero field | Canvas 2D sampled from the vector mark |
| OG typography / labels | Satori + site tokens |
| Product UI / screenshots | Real capture from the running app only |
| Charts, diagrams, architecture | SVG in code |
| Any readable text in a photo | Never; crop or regenerate |

---

## 8. Post-processing

1. Neutralize to grayscale; remove color casts (except the eye).
2. Crush blacks toward `#0A0A0B` without clipping detail; cap highlights around 92%.
3. Add a light halation and 3–5% grain only if the generation is too clean.
4. Crop to the target ratio; protect the negative space used by type.
5. Export at 2K long edge; keep originals. Build creates AVIF + WebP at 640/960/1280/1600/2000 as needed.
6. For the eye: keep only the iris blue; match the site accent; otherwise grayscale.
7. Check at 100%: no AI text artifacts, no extra fingers/objects, no plastic edges, no fake bokeh.

---

## 9. Captions and alt text

| File | Caption | Alt |
|---|---|---|
| `lair-server.avif` | `THE LAIR / 002` | A single black server rack in a bare concrete basement, lit by one cold status light. |
| `hoard-desk.avif` | `THE HOARD / FIELD NOTE 01` | A dark desk with a glowing CRT, stacked hard drives, and a coiled cable. |
| `ward-relief.avif` | `THE WARD / 004` | A weathered stone dragon relief above a concrete doorway, lit by a raking flashlight. |
| `ward-eye.avif` | `THE WARD / WATCH` | Macro of a reptilian eye with a pale ice-blue iris. |
| `wind-corridor.avif` | `THE WIND / 007` | Wind moving dust and a plastic sheet through a dark concrete corridor. |
| `scales-texture.avif` | — (decorative) | — (aria-hidden) |
| `og-backdrop.avif` | — | — (decorative) |

Captions are optional in the layout; alt text is mandatory. Decorative textures and the OG backdrop are `aria-hidden`.

---

## 10. Platform notes

- **Midjourney:** append `--ar 4:5 --style raw --stylize 150` (or the ratio for the shot). Add `--no text, letters, logo, watermark` if needed. Do not rely on a specific model version parameter unless you have tested it.
- **Flux / Nano Banana / Gemini image:** set the aspect ratio in the UI; paste the prompt; keep the negative prompt in a separate field if the tool supports it.
- **Any tool:** generate 4–8 variations, choose the least “AI” one, then grade. Do not ask the model to fix text or logos; regenerate.
- **Style reference:** if the tool accepts an image reference, use the supplied poster only for grain/contrast. Do not use it for composition, text, or branding.
- **Consistency:** keep the same film-stock language and grade across all images. If one image is cleaner than the rest, add grain/contrast rather than making the others cleaner.

---

## 11. Generation checklist

- [ ] P0 shots generated: `lair-server`, `ward-relief`, `wind-corridor`.
- [ ] P1 assets ready: `hoard-desk` generated, `og-backdrop` generated or code-only OG, `product-ui` supplied.
- [ ] P2 decisions: eye (include/drop), scales texture (include/drop).
- [ ] No text, logos, watermarks, borders, or brand names in any image.
- [ ] No fantasy dragon, glowing eyes/runes, fire, armor, or “epic” landscape.
- [ ] Ratios correct; crop-safe margins respected.
- [ ] Originals archived; optimized files named and handed off.
- [ ] Alt text and captions match the table above.

