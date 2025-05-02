import React, { forwardRef } from 'react';
import { ContentProps } from './types';

const Content = forwardRef<HTMLDivElement, ContentProps>((props: ContentProps, ref) => {
  return <div ref={ref} {...props} />;
});

Content.displayName = 'Content';

export default Content;
