import { ThemeVariant } from '../types';
interface DialogProps {
    handleDialogAction?: () => void;
    actionButtonText?: string;
    children: React.ReactNode;
    closeButtonText?: string;
    hasAction?: boolean;
    title?: string;
    TriggerElement: React.FC<{
        clickHandler: () => void;
    }>;
    variant?: ThemeVariant;
}
declare const Dialog: React.FC<DialogProps>;
export default Dialog;
