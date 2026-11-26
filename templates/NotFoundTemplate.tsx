import type { NotFoundProps } from "nefantaris";
import { Link } from "wouter";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";

const NotFoundTemplate = ({ site }: NotFoundProps) => (
    <article className="mx-auto max-w-(--width-prose) lg:py-12">
        <PageHeader
            title="Page not found"
            description={`That page is not part of the ${site.name} documentation`}
            eyebrow={<span className="text-accent font-mono">404</span>}
        />
        <Link
            href="/"
            className="bg-accent text-page hover:bg-accent/90 mt-8 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-100"
        >
            <Icon name="arrowLeft" isSmall />
            Back to {site.name}
        </Link>
    </article>
);

export default NotFoundTemplate;
