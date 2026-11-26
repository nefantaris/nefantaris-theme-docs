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
`nef theme check`. The sidebar, prev/next links, light and dark modes, and the
full GFM prose set are in. Everything else in [BRIEF.md](./BRIEF.md) — per-page table of contents,
syntax highlighting, search — is Phase 3 work.

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

## Design tokens

Every colour, font, radius, and width lives in `theme.css` as a custom property
on `:root`, with dark values under `:root[data-mode="dark"]` inside
`@media screen`, so printing always uses the light look. Print also drops the
header, sidebar, prev/next, and footer, and draws code as a hairline box:

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
re-tints every neutral. Both fonts ship in `fonts/` (SIL Open Font License).

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

MIT — see [LICENSE](./LICENSE).
