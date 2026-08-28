import type { RouteSummary, TemplateProps } from "nefantaris";
import { Link, useLocation } from "wouter";
import classNames from "../classNames";
import Prose from "../components/Prose";
import { docsNeighbours } from "../docsRoutes";

type NeighbourLinkProps = {
    route: RouteSummary;
    direction: string;
    isTrailing?: boolean;
};

const NeighbourLink = ({
    route,
    direction,
    isTrailing,
}: NeighbourLinkProps) => (
    <Link
        href={route.path}
        className={classNames(
            "text-link block rounded-md px-2 py-1",
            isTrailing && "ml-auto text-right"
        )}
    >
        <span className="text-muted block text-xs font-semibold tracking-wide uppercase">
            {direction}
        </span>
        <span className="underline underline-offset-2">{route.title}</span>
    </Link>
);

const DocsPageTemplate = ({ meta, routes, children }: TemplateProps) => {
    const [currentPath] = useLocation();
    const { previous, next } = docsNeighbours(routes, currentPath);

    return (
        <article className="max-w-3xl">
            <p className="text-accent text-sm font-semibold tracking-wide uppercase">
                Documentation
            </p>
            <h1 className="mt-1 text-2xl font-semibold">{meta.title}</h1>
            {!!meta.description && (
                <p className="text-muted mt-2">{meta.description}</p>
            )}
            <Prose>{children}</Prose>
            {!!(previous || next) && (
                <nav
                    aria-label="Documentation pages"
                    className="border-line mt-10 flex flex-wrap items-start gap-3 border-t pt-4 text-sm"
                >
                    {!!previous && (
                        <NeighbourLink route={previous} direction="Previous" />
                    )}
                    {!!next && (
                        <NeighbourLink
                            route={next}
                            direction="Next"
                            isTrailing
                        />
                    )}
                </nav>
            )}
        </article>
    );
};

export default DocsPageTemplate;
