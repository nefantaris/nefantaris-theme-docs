import type { DirectiveProps } from "nefantaris";
import classNames from "../classNames";
import {
    selectedTabClasses,
    tabClasses,
    tabLabel,
    tabPanelClasses,
    tabStripClasses,
} from "./tabStrip";

const Tab = ({ attributes, children }: DirectiveProps) => (
    <div data-part="tabs" className="mt-6">
        <p className={tabStripClasses}>
            <span className={classNames(tabClasses, selectedTabClasses)}>
                {tabLabel(attributes, "Tab")}
            </span>
        </p>
        <div className={tabPanelClasses}>{children}</div>
    </div>
);

export default Tab;
