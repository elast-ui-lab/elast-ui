import React from "react";
interface CommonProps {
    id?: string;
    className?: string;
    children?: React.ReactNode;
}
declare const Tabs: {
    ({ id, className, defaultIndex, children, onChange, }: {
        defaultIndex?: number | undefined;
        onChange?: ((prop?: unknown) => void) | undefined;
    } & CommonProps): React.JSX.Element;
    TabsWrapper: ({ children, ...props }: {
        children?: React.ReactNode;
    } & CommonProps) => React.JSX.Element;
    ContentWrapper: ({ children, ...props }: CommonProps) => React.JSX.Element;
    Tab: ({ children, ...props }: CommonProps & {
        "data-tabindex"?: number;
    }) => React.JSX.Element;
    Content: ({ children, ...props }: CommonProps) => React.JSX.Element;
};
export default Tabs;
