import type { RouteSummary } from "nefantaris";

export const docsTemplateName = "docsPage";

export type DocsEntry = {
    route: RouteSummary;
    number: string;
};

export type DocsSection = {
    key: string;
    number: string;
    label: string | undefined;
    entries: DocsEntry[];
};

export type DocsLocation = {
    section: DocsSection | undefined;
    current: DocsEntry | undefined;
    previous: DocsEntry | undefined;
    next: DocsEntry | undefined;
};

type GroupedRoute = {
    route: RouteSummary;
    segments: string[];
};

type SectionDraft = {
    key: string;
    isGroup: boolean;
    routes: RouteSummary[];
};

const withoutTrailingSlash = (path: string): string =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

const segmentsOf = (path: string): string[] =>
    withoutTrailingSlash(path)
        .split("/")
        .filter((segment) => segment.length > 0);

const labelFromKey = (key: string): string => {
    const words = key.replaceAll("-", " ");
    return words.slice(0, 1).toUpperCase() + words.slice(1);
};

const sharedPrefixLength = (paths: string[][]): number => {
    const [first = [], ...rest] = paths;
    const mismatch = first.findIndex((segment, index) =>
        rest.some((path) => path[index] !== segment)
    );
    return mismatch === -1 ? first.length : mismatch;
};

export const isCurrentRoute = (path: string, currentPath: string): boolean =>
    withoutTrailingSlash(path) === withoutTrailingSlash(currentPath);

export const docsRoutes = (routes: RouteSummary[]): RouteSummary[] =>
    routes.filter((route) => route.template === docsTemplateName);

const groupedBelowSharedRoot = (routes: RouteSummary[]): GroupedRoute[] => {
    const paths = routes.map((route) => segmentsOf(route.path));
    const rootLength = sharedPrefixLength(paths);
    return routes.map((route, index) => ({
        route,
        segments: (paths.at(index) ?? []).slice(rootLength),
    }));
};

const numberSection = (draft: SectionDraft, position: number): DocsSection => {
    const number = String(position);
    return {
        key: draft.key,
        number,
        label: draft.isGroup ? labelFromKey(draft.key) : undefined,
        entries: draft.routes.map((route, index) => ({
            route,
            number: draft.isGroup ? `${number}.${index + 1}` : number,
        })),
    };
};

export const docsSections = (routes: RouteSummary[]): DocsSection[] => {
    const drafts = new Map<string, SectionDraft>();

    for (const { route, segments } of groupedBelowSharedRoot(
        docsRoutes(routes)
    )) {
        const key = segments.at(0) ?? "";
        const draft = drafts.get(key) ?? { key, isGroup: false, routes: [] };
        draft.routes.push(route);
        draft.isGroup = draft.isGroup || segments.length > 1;
        drafts.set(key, draft);
    }

    return [...drafts.values()].map((draft, index) =>
        numberSection(draft, index + 1)
    );
};

export const docsLocation = (
    routes: RouteSummary[],
    currentPath: string
): DocsLocation => {
    const sections = docsSections(routes);
    const ordered = sections.flatMap((section) => section.entries);
    const index = ordered.findIndex((entry) =>
        isCurrentRoute(entry.route.path, currentPath)
    );
    const current = index === -1 ? undefined : ordered.at(index);

    return {
        section: sections.find((section) =>
            section.entries.some((entry) => entry === current)
        ),
        current,
        previous: index > 0 ? ordered.at(index - 1) : undefined,
        next: index === -1 ? undefined : ordered.at(index + 1),
    };
};
