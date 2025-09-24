import type { Spacing } from '@styles/spacing';
import React from 'react';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
type FlexJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type FlexGap = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
interface ResponsiveFlexConfig {
    direction?: FlexDirection;
    wrap?: FlexWrap;
    gap?: FlexGap;
    alignItems?: FlexAlign;
    justifyContent?: FlexJustify;
    alignContent?: FlexAlign;
}
interface ResponsiveFlexBreakpoints {
    sm?: ResponsiveFlexConfig;
    md?: ResponsiveFlexConfig;
    lg?: ResponsiveFlexConfig;
}
interface FlexProps {
    children: React.ReactNode;
    direction?: FlexDirection;
    wrap?: FlexWrap;
    gap?: FlexGap;
    rowGap?: FlexGap;
    columnGap?: FlexGap;
    alignItems?: FlexAlign;
    justifyContent?: FlexJustify;
    alignContent?: FlexAlign;
    className?: string;
    spacing?: Spacing | Spacing[];
    style?: React.CSSProperties;
    responsive?: ResponsiveFlexBreakpoints;
}
declare const Flex: React.FC<FlexProps>;
export default Flex;
