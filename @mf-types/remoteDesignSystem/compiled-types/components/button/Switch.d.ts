import React from 'react';
interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
    spacing?: string;
}
declare const Switch: React.FC<SwitchProps>;
export default Switch;
