import type { Spacing } from '@styles/spacing';
interface RadioGroupProps {
    legend: string;
    options: {
        id: string;
        columnTwoValue?: string;
        disabled?: boolean;
    }[];
    spacing?: Spacing | Spacing[];
    twoColumn?: boolean;
    hasBorder?: boolean;
}
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
