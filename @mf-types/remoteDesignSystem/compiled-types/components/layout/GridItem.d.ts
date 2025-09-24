import type { Spacing } from '@styles/spacing';
interface GridItemProps {
    area?: string;
    children: React.ReactNode;
    className?: string;
    columnEnd?: number | string;
    columnSpan?: number;
    columnStart?: number | string;
    rowEnd?: number | string;
    rowSpan?: number;
    rowStart?: number | string;
    spacing?: Spacing | Spacing[];
    style?: React.CSSProperties;
}
declare const GridItem: React.FC<GridItemProps & React.HTMLAttributes<HTMLDivElement>>;
export default GridItem;
