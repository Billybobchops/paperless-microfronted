import type { Spacing } from '@styles/spacing';
import React from 'react';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingAlignment = 'left' | 'center' | 'right';
interface HeadingProps {
    children: React.ReactNode;
    classLevel?: HeadingLevel;
    spacing?: Spacing | Spacing[];
    semanticLevel: HeadingLevel;
    alignment?: HeadingAlignment;
}
declare const Heading: React.FC<HeadingProps>;
export default Heading;
