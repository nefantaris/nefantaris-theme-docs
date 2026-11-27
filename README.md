# nefantaris-theme-docs

A documentation theme for Nefantaris.

This repo is a group of React components and a `theme.json`. There is no
`package.json`, no Vite config, no tsconfig, and no test suite —
[nefantaris-core](https://github.com/nefantaris/nefantaris-core) reads the
manifest, generates a React project around these files, and supplies the
tooling. See the theme contract that ships with core for the full spec.

## Status

A working stub, not a finished docs site. The manifest, the layout, and the
three templates render correctly against core's fixture corpus and pass
`nef theme check`. The sidebar, prev/next links, light and dark modes, the full
GFM prose set, [settings](#settings) for the editor's Design panel,
[parts](#parts) for its Style panel, and the
[callout and tabs blocks](#blocks) are in. Everything else in
[BRIEF.md](./BRIEF.md) — per-page table of contents, syntax highlighting,
search — is Phase 3 work.

Settings, block schemas, parts, and the flat block `children` that `tabs`
reads need a `@nefantaris/core` release after 0.4.5.

## Templates

| Name       | Selected by                      | Renders                          |
| ---------- | -------------------------------- | -------------------------------- |
| `page`     | default for every route          | a centred prose column           |
| `docsPage` | frontmatter `template: docsPage` | the same column plus the sidebar |
| `notFound` | the 404 route                    | a short recovery page            |

The theme declares no `post` and no `blogIndex`. A docs site does not need
them, and core only requires `page` and `notFound`; posts and the generated
blog index fall back to `page`.

## Navigation

The header and the sidebar are deliberately different views. The header renders
`nav` from `nefantaris.json` — site-owned, top-level, hand-written. The sidebar
renders `routes`, the generated route list every template and layout receives,
filtered to the ones that resolved to `docsPage`; a docs site never
hand-maintains a nav entry per page.

`Layout` shows the sidebar only when the resolved `template` is `docsPage`.
Sidebar order is the order core gives: authored `order` first, then `path`.
Routes are grouped by their first path segment below the folder every docs page
shares, so `/docs/guide/install` and `/docs/guide/configure` sit under a
"Guide" heading while `/docs` itself is a bare link. Each entry is numbered by
its position (`2`, `2.1`, `2.2`), and the current page's number is the one mark
of accent in the sidebar. `DocsPageTemplate` walks the same list for its
prev/next links and its number above the title, so all three always agree.

Below the `lg` breakpoint the sidebar folds into a "Contents" button above the
page, and the header `nav` folds into a menu button below `md`.

## Settings

A site changes these in `nefantaris.json` under `theme.settings`, or from the
editor's Design panel. With none set, the site looks exactly as it does without
settings, print included.

| Setting           | Type    | Group           | Default                | Controls                                                           |
| ----------------- | ------- | --------------- | ---------------------- | ------------------------------------------------------------------ |
| `accentColor`     | colour  | Colours         | `#a3391b` / `#e8906f`  | `--accent`: links, current page number, focus, buttons, tabs       |
| `textColor`       | colour  | Colours         | `#1c1b19` / `#e8e6e1`  | `--ink`: text, and every neutral mixed from it                     |
| `backgroundColor` | colour  | Colours         | `#fcfcfa` / `#161514`  | `--page`: the page, and every neutral mixed from it                |
| `textFont`        | select  | Typography      | `open-sans`            | `--font-text`: Open Sans, system, humanist sans, or serif stacks   |
| `codeFont`        | select  | Typography      | `source-code-pro`      | `--font-code`: Source Code Pro or the system monospace stack       |
| `corners`         | select  | Shape and width | `rounded` (`0.375rem`) | `--radius`: square, slight, rounded, very rounded                  |
| `pageWidth`       | select  | Shape and width | `wide` (`80rem`)       | `--width-page`: `64rem`, `72rem`, `80rem`, or the full window      |
| `sidebarWidth`    | select  | Shape and width | `medium` (`16rem`)     | `--width-sidebar`: `14rem`, `16rem`, or `19rem`                    |
| `readingWidth`    | select  | Shape and width | `medium` (`46rem`)     | `--width-prose`: `40rem`, `46rem`, or `56rem`                      |
| `sidebarSide`     | select  | Docs pages      | `left`                 | which side the sidebar sits on at `lg` and up                      |
| `chapterNumbers`  | boolean | Docs pages      | `true`                 | the `2.1` numbers in the sidebar, eyebrow, Contents, and prev/next |
| `pageLinks`       | boolean | Docs pages      | `true`                 | the previous and next links under each docs page                   |

Colour defaults are light / dark. Only the bundled Open Sans and Source Code
Pro are downloaded; the other font choices are system stacks, so the font files
are never fetched when a site picks one. With the sidebar on the right it still
comes first in the page, so keyboard order stays navigation, then content, and
on phones the Contents button stays above the page.

## Blocks

| Block     | Body     | Attributes                                                          |
| --------- | -------- | ------------------------------------------------------------------- |
| `callout` | markdown | `tone`: `note` (default), `tip`, `warning`, `danger`; `title`: text |
| `tabs`    | markdown | none; holds `tab` blocks                                            |
| `tab`     | markdown | `label`: text, required                                             |

A callout's heading is its tone ("Note", "Warning") unless `title` replaces it,
in which case screen readers still hear the tone first. `tabs` picks out the
blocks inside it named `tab` (by directive name, not by component, so it never
imports `Tab.tsx`) and turns them into a tab list with arrow-key, Home, and End
navigation; any other block inside `tabs` renders above the list. Every panel
is prerendered, the first is shown, and print shows them all under their names.
A `tab` on its own renders as a single labelled panel. Containers nest by
growing the outer fence, so a callout inside a tab looks like this:

```
:::::tabs
::::tab{label="Windows"}
Install it with winget.

:::callout{tone="tip"}
Open a new terminal afterwards.
:::
::::
:::::
```

`nef theme dev` previews the callout with the heading "Formatting works here
too" and the lone tab with the name "npm", the `example` values in
`theme.json`. A site never gets them: a callout without a `title` shows its
tone.

## Parts

Parts are the hooks a site restyles from `custom.css` or the editor's Style
panel. Each is a `data-part` attribute, so target `[data-part="sidebar"]`, not
a class: class names and nesting can change in any release, while renaming or
moving a part waits for a major one.

| Part             | Label                   | Marks                                                                     |
| ---------------- | ----------------------- | ------------------------------------------------------------------------- |
| `site-header`    | Header                  | the `<header>` across the top of every page                               |
| `site-name`      | Site name               | the site name in the header, linking home                                 |
| `nav`            | Navigation              | the header menu, from `nav` in `nefantaris.json`                          |
| `sidebar`        | Docs sidebar            | the docs contents column; on phones, the Contents button and its list     |
| `main`           | Main area               | the `<main>` element, beside the sidebar on docs pages                    |
| `page-header`    | Page title              | the title block: number and section on docs pages, title, description     |
| `content`        | Page content            | exactly the rendered markdown, and nothing the theme draws around it      |
| `chapter-number` | Page numbers            | every `2` and `2.1`: sidebar, Contents button, above the title, prev/next |
| `callout`        | Callouts                | each callout box, which also carries `data-tone` with its kind            |
| `tabs`           | Tabs                    | a tabs block, or a tab on its own                                         |
| `page-nav`       | Previous and next links | the `<nav>` at the end of a docs page                                     |
| `site-footer`    | Footer                  | the `<footer>` across the bottom of every page                            |

Parts nest, so `[data-part="sidebar"] [data-part="chapter-number"]` reaches
only the sidebar's numbers, and `[data-part="callout"][data-tone="warning"]`
only warnings. `chapter-number` and `page-nav` render only while the
`chapterNumbers` and `pageLinks` settings are on.

```css
[data-part="sidebar"] {
    background-color: var(--surface);
}

[data-part="content"] h2 {
    border-bottom: 0;
    color: var(--accent);
}
```

The recommended `hero`, `post-list`, and `post-header` are not used: the theme
has no home template and no post list, and posts render with `page`, whose
title block is `page-header` on every page. Code blocks have no part of their
own, because core renders `pre` from markdown without a hook for the theme;
target them as `[data-part="content"] pre`.

## Design tokens

Every colour, font, radius, and width lives in `theme.css` as a custom property
on `:root`, with dark values under `:root[data-mode="dark"]` inside
`@media screen`, so printing always uses the light look. The tokens a setting
writes sit in `@layer base` with the same defaults as `theme.json`, which
`nef theme check` holds them to (`settings/default-drift`). Core's
`nefantaris-settings` layer comes after every theme layer, so a setting wins,
and a site's `custom.css` is unlayered, so it beats both. Print also
drops the header, sidebar, prev/next, and footer, and draws code as a hairline
box:

| Token             | Light           | Dark      | Controls                                 |
| ----------------- | --------------- | --------- | ---------------------------------------- |
| `--page`          | `#fcfcfa`       | `#161514` | page background                          |
| `--ink`           | `#1c1b19`       | `#e8e6e1` | text, and the source of every neutral    |
| `--accent`        | `#a3391b`       | `#e8906f` | links, current page, focus, checked task |
| `--font-text`     | Open Sans       |           | interface and prose                      |
| `--font-code`     | Source Code Pro |           | code, page numbers                       |
| `--radius`        | `0.375rem`      |           | corners; small corners derive from it    |
| `--width-page`    | `80rem`         |           | header, footer, and docs shell           |
| `--width-sidebar` | `16rem`         |           | docs sidebar                             |
| `--width-prose`   | `46rem`         |           | reading column                           |

`--muted`, `--surface`, `--line`, `--code`, `--code-ink`, and `--code-line`
are mixed from `--ink` and `--page` with `color-mix()`, so changing those two
re-tints every neutral. Both fonts ship in `fonts/` under the SIL Open Font
License 1.1, with their license texts beside them: `fonts/OFL-OpenSans.txt`
(The Open Sans Project Authors) and `fonts/OFL-SourceCodePro.txt` (Adobe,
copied from the
[source-code-pro](https://github.com/adobe-fonts/source-code-pro) repo).

Callouts take their colour from `--tone`, which `data-tone` sets: `--ink` for a
note, and `--tip` (`#2c6b3f` / `#8ccb9c`), `--warning` (`#8a5300` / `#e2b766`),
and `--danger` (`#b3261e` / `#f59a9a`) for the rest. Each tone's text clears
5.5:1 on its tinted box in both modes. They are not settings; a site can
override them in `custom.css`.

Plugin components, such as the contact form, style themselves with the shared
`brand` colour names that every theme exposes. This theme maps them onto its own
tokens in `@theme inline`, so the settings above re-tint plugins too:

| Alias                        | Maps to                            |
| ---------------------------- | ---------------------------------- |
| `--color-brand-primary`      | `--accent`                         |
| `--color-brand-primaryHover` | `--accent` mixed 90% with `--page` |
| `--color-brand-onPrimary`    | `--page`                           |
| `--color-brand-danger`       | `--danger`                         |
| `--color-brand-onDanger`     | `--page`                           |
| `--color-brand-text`         | `--ink`                            |
| `--color-brand-muted`        | `--muted`                          |
| `--color-brand-background`   | `--page`                           |
| `--color-brand-surface`      | `--surface`                        |
| `--color-brand-border`       | `--line`                           |

Text on the primary, hover, and danger colours, and the danger colour on the
page, all clear 5.3:1 in both modes with the default settings.

## Commands

Run from a `nefantaris-core` checkout beside this one:

| Command                                    | Purpose                                    |
| ------------------------------------------ | ------------------------------------------ |
| `nef theme dev ../nefantaris-theme-docs`   | preview against core's fixture corpus      |
| `nef theme check ../nefantaris-theme-docs` | manifest, types, imports, lint, formatting |

Both commands write `.nefantaris/`, `tsconfig.json`, and a `node_modules`
symlink into this repo. All three are gitignored, and the editor gets contract
types once either has run.

## License

MIT — see [LICENSE](./LICENSE). The bundled fonts keep their own license, the
SIL Open Font License 1.1; see `fonts/OFL-OpenSans.txt` and
`fonts/OFL-SourceCodePro.txt`.
