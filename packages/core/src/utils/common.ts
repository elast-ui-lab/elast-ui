import React, {
  ReactNode,
  ReactElement,
  Children,
  isValidElement,
  MutableRefObject,
  ForwardedRef,
} from 'react';

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

      const componentType = child.type as React.FunctionComponent | React.ComponentClass;
      if (componentType.displayName === targetDisplayName) return child;
      queue.push(child.props.children);
    }
  }
  return null;
};

/**
 * forwardRef로 감싸진 컴포넌트 내부에서
 * useRef와 forwardRef가 동일한 DOM 요소를 참조해야 하는 경우 사용
 *
 * @param ref 컴포넌트 내부에서 사용중인 useRef
 * @param forwardedRef forwardRef의 ref
 * @returns void
 *
 * @example
 * ```
 * const Example = forwardRef((props, ref) => {
 * const innerRef = useRef()
 * const combineRef = combineRefs(innerRef, ref)
 *
 * return (
 *   <div ref={combineRef}/>
 * )
 * })
 * ```
 */
export const combineRefs = <T>(
  ref: MutableRefObject<T | null | undefined>,
  forwardedRef: ForwardedRef<T>
): ((element: T) => void) => {
  return (element: T) => {
    ref.current = element;

    // 부모 컴포넌트에서 ref={() => ...} 형태로 ref를 참조하는 경우
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);

      // 부모 컴포넌트에서 useRef와 같은 객체 형태로 참조하는 경우
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
  };
};
