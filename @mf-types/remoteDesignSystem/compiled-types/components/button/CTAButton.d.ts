import type { Spacing } from '@styles/spacing';
import React from 'react';
import type { ExtendedThemeVariant } from '@components/types';
interface ButtonProps {
    clickHandler?: () => void;
    disabled: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    iconPosition?: 'start' | 'end';
    spacing?: Spacing | Spacing[];
    text: string;
    type?: 'button' | 'submit';
    variant?: ExtendedThemeVariant;
}
declare const CTAButton: React.FC<ButtonProps>;
export default CTAButton;
