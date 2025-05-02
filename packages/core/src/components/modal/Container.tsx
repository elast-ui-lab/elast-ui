import React, { forwardRef, useContext } from 'react';
import { ModalContext } from './context';
import { CommonProps } from './types';

const Container = forwardRef<HTMLDivElement, CommonProps>((props: CommonProps, ref) => {
  const context = useContext(ModalContext);

  if (!context || !context.open) return null;

  return <div ref={ref} {...props} />;
});

Container.displayName = 'Container';

export default Container;
