import type { NotFoundProps } from "nefantaris";
import { Link } from "wouter";

const NotFoundTemplate = ({ site }: NotFoundProps) => (
    <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted mt-2">
            That page is not part of the {site.name} documentation.
        </p>
        <p className="mt-4">
            <Link href="/" className="text-link underline underline-offset-2">
                Back to {site.name}
            </Link>
        </p>
    </article>
);

export default NotFoundTemplate;
