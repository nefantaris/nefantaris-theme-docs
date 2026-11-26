import type { TemplateProps } from "nefantaris";
import PageHeader from "../components/PageHeader";
import Prose from "../components/Prose";

const PageTemplate = ({ meta, children }: TemplateProps) => (
    <article className="mx-auto max-w-(--width-prose)">
        <PageHeader title={meta.title} description={meta.description} />
        <Prose className="mt-8">{children}</Prose>
    </article>
);

export default PageTemplate;
