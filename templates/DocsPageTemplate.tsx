import type { TemplateProps } from "nefantaris";
import { Link, useLocation } from "wouter";
import classNames from "../classNames";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import Prose from "../components/Prose";
import { docsLocation, type DocsEntry } from "../docsRoutes";

type NeighbourLinkProps = {
    entry: DocsEntry;
    direction: "Previous" | "Next";
    isNumbered: boolean;
};

const NeighbourLink = ({
    entry,
    direction,
    isNumbered,
}: NeighbourLinkProps) => {
    const isNext = direction === "Next";

    return (
        <Link
            href={entry.route.path}
            rel={isNext ? "next" : "prev"}
            className={classNames(
                "border-line hover:bg-surface flex flex-col gap-1 rounded-md border px-4 py-3 transition-colors duration-100",
                isNext && "sm:col-start-2 sm:items-end sm:text-right"
            )}
        >
            <span className="text-muted flex items-center gap-1 text-sm">
                {!isNext && <Icon name="arrowLeft" isSmall />}
                {direction}
                {isNext && <Icon name="arrowRight" isSmall />}
            </span>
            <span className="text-ink flex items-baseline gap-2 font-medium">
                {isNumbered && (
                    <span
                        data-part="chapter-number"
                        className="text-muted font-mono text-xs font-normal"
                    >
                        {entry.number}
                    </span>
                )}
                {entry.route.title}
            </span>
        </Link>
    );
};

const DocsPageTemplate = ({
    meta,
    routes,
    settings,
    children,
}: TemplateProps) => {
    const [currentPath] = useLocation();
    const { section, current, previous, next } = docsLocation(
        routes,
        currentPath
    );
    const isNumbered = settings.chapterNumbers;
    const pageNumber = isNumbered ? current?.number : undefined;
    const sectionLabel = section?.label;
    const hasNeighbours = settings.pageLinks && !!(previous || next);

    return (
        <article className="max-w-(--width-prose)">
            <PageHeader
                title={meta.title}
                description={meta.description}
                eyebrow={
                    !!(pageNumber || sectionLabel) && (
                        <>
                            {!!pageNumber && (
                                <span
                                    data-part="chapter-number"
                                    className="text-accent font-mono"
                                >
                                    {pageNumber}
                                </span>
                            )}
                            {sectionLabel}
                        </>
                    )
                }
            />
            <Prose className="mt-8">{children}</Prose>
            {hasNeighbours && (
                <nav
                    data-part="page-nav"
                    aria-label="Previous and next pages"
                    className="mt-12 grid gap-3 sm:grid-cols-2 print:hidden"
                >
                    {!!previous && (
                        <NeighbourLink
                            entry={previous}
                            direction="Previous"
                            isNumbered={isNumbered}
                        />
                    )}
                    {!!next && (
                        <NeighbourLink
                            entry={next}
                            direction="Next"
                            isNumbered={isNumbered}
                        />
                    )}
                </nav>
            )}
        </article>
    );
};

export default DocsPageTemplate;
