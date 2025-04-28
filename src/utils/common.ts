import { ReactNode, ReactElement, Children, isValidElement } from "react";

export const findComponentWithDisplayName = (
  children: ReactNode,
  targetDisplayName: string
): ReactElement | null => {
  const queue: ReactNode[] = [children];

  while (queue.length > 0) {
      const current = queue.shift();
      const childrenArray = Children.toArray(current);

      for (const child of childrenArray) {
        if (!isValidElement(child) || !child.props || !child.props.children) continue;

        const componentType = child.type as React.FunctionComponent | React.ComponentClass
        if (componentType.displayName === targetDisplayName) return child;
        queue.push(child.props.children)
      }
  }
  return null
}