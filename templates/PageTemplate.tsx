import type { TemplateProps } from "nefantaris";
import Prose from "../components/Prose";

const PageTemplate = ({ meta, children }: TemplateProps) => (
    <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">{meta.title}</h1>
        {!!meta.description && (
            <p className="text-muted mt-2">{meta.description}</p>
        )}
        <Prose>{children}</Prose>
    </article>
);

export default PageTemplate;
