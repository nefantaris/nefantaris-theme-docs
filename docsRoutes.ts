import type { RouteSummary } from "nefantaris";

export const docsTemplateName = "docsPage";

export type DocsSection = {
    key: string;
    label: string | undefined;
    routes: RouteSummary[];
};

export type DocsNeighbours = {
    previous: RouteSummary | undefined;
    next: RouteSummary | undefined;
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

export const docsRoutes = (routes: RouteSummary[]): RouteSummary[] =>
    routes.filter((route) => route.template === docsTemplateName);

export const docsSections = (routes: RouteSummary[]): DocsSection[] => {
    const sections = new Map<string, DocsSection>();

    for (const route of docsRoutes(routes)) {
        const segments = segmentsOf(route.path);
        const key = segments.at(0) ?? "";
        const section = sections.get(key) ?? {
            key,
            label: undefined,
            routes: [],
        };
        section.routes.push(route);
        if (segments.length > 1) {
            section.label = labelFromKey(key);
        }
        sections.set(key, section);
    }

    return [...sections.values()];
};

const docsReadingOrder = (routes: RouteSummary[]): RouteSummary[] =>
    docsSections(routes).flatMap((section) => section.routes);

export const docsNeighbours = (
    routes: RouteSummary[],
    currentPath: string
): DocsNeighbours => {
    const ordered = docsReadingOrder(routes);
    const index = ordered.findIndex(
        (route) => route.path === withoutTrailingSlash(currentPath)
    );

    if (index === -1) {
        return { previous: undefined, next: undefined };
    }

    return {
        previous: index > 0 ? ordered.at(index - 1) : undefined,
        next: ordered.at(index + 1),
    };
};
