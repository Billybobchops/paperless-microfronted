import type { Spacing } from '@styles/spacing';
type GridValue = number | string;
type GridGap = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
interface ResponsiveConfig {
    columns: GridValue;
    rows?: GridValue;
    gap?: GridGap;
}
interface ResponsiveBreakpoints {
    sm?: ResponsiveConfig;
    md?: ResponsiveConfig;
    lg?: ResponsiveConfig;
}
interface GridProps {
    children: React.ReactNode;
    columns: GridValue;
    rows?: GridValue;
    gap?: GridGap;
    columnGap?: GridGap;
    rowGap?: GridGap;
    alignItems?: 'start' | 'end' | 'center' | 'stretch';
    justifyItems?: 'start' | 'end' | 'center' | 'stretch';
    alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    className?: string;
    spacing?: Spacing | Spacing[];
    style?: React.CSSProperties;
    responsive?: ResponsiveBreakpoints;
}
declare const Grid: React.FC<GridProps>;
export default Grid;
