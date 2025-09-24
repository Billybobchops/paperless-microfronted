import type { Spacing } from '@styles/spacing';
interface ParagraphProps {
    children: React.ReactNode;
    spacing?: Spacing | Spacing[];
    size?: 'xs' | 's';
    isBold?: boolean;
}
declare const Paragraph: React.FC<ParagraphProps>;
export default Paragraph;
