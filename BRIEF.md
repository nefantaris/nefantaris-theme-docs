# nefantaris-theme-docs

## Mission

A documentation-site theme, and the proof that the theme contract generalizes:
a docs-shaped content repo should get a docs site by changing one line of
config.

## Current state

A stub that proves the shape rather than the feature set: `theme.json`, a
layout, and `page` / `docsPage` / `notFound` templates. It declares no `post`
and no `blogIndex`, which is the first exercise of core's open template set.

Three v1 items are in: the sidebar is derived from `routes` rather than from
`nefantaris.json`'s `nav`, prev/next links follow the same reading order, and
the full GFM set — tables, task lists, footnotes, strikethrough, bare autolinks
— is styled.

Authored ordering works. A page's `order` frontmatter reaches the theme on
`RouteSummary`, core sorts `routes` by `order` first and `path` second, and the
sidebar and prev/next both walk that sequence — pages that declare an `order`
lead, the rest keep the alphabetical tail. The theme groups sections by the
first path segment at first appearance, so an authored sequence that jumps
between segments still collapses into one group per segment rather than
repeating one.

The rest of the v1 scope below is Phase 3 work.

## v1 scope

- Sidebar navigation derived from the content folder hierarchy
- Per-page table of contents
- Code blocks with syntax highlighting and a copy button
- Search across the site (static index — no server)
- Prev/next page navigation
- Shared with nefantaris-theme-base where sharing makes sense, through the child
  theme overlay rather than through an import

## Non-goals (v1)

- Versioned docs (stretch: version switcher)
- API reference generation from source code

## Open questions

- Sections have no channel of their own. `order` closed the sequencing half of
  this: an author now controls the order of pages. What is left is identity —
  a section is still just a first path segment with a humanized label, so an
  author cannot title one, cannot order the sections against each other except
  by moving a page's `order` and changing which segment appears first, and
  cannot nest deeper than one segment without the extra levels flattening into
  the same group. The open question is whether the contract grows a channel for
  section identity — directory-level frontmatter, or a `section` key on a page
  — or whether docs hierarchy stays one segment deep by design.
- A per-page table of contents needs the page's headings, and a template
  receives its body as opaque `children` it cannot introspect. Neither `routes`
  nor `meta` carries heading data, so a TOC has no source today.
- A static search index needs body text. `routes` supplies every page's path,
  title, and description but not its content, so the index has nothing
  full-text to build from — before choosing between a Pagefind-style prebuilt
  index and rolling our own, that gap has to close.
- Syntax highlighting is no longer blocked by the contract: a plugin's
  `provides.dependencies` is consumed in v1, so a highlighter plugin would
  work. Open is which highlighter, and whether one plugin serves both themes.

## References

Match the feel of these, closely:

- https://doc.rust-lang.org/stable/std/index.html
- https://laravel.com/framework/docs
