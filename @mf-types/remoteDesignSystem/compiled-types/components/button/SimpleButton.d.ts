import type { Spacing } from '@styles/spacing';
import { ThemeVariant } from '../types';
interface SimpleButtonProps {
    clickHandler: () => void;
    disabled?: boolean;
    spacing?: Spacing | Spacing[];
    text: string;
    type?: 'button' | 'submit';
    variant?: ThemeVariant;
}
declare const SimpleButton: React.FC<SimpleButtonProps>;
export default SimpleButton;
