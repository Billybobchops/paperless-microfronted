import type { Spacing } from '@styles/spacing';
interface FieldsetProps {
    legend: string;
    children?: React.ReactNode;
    spacing?: Spacing | Spacing[];
    hasBorder?: boolean;
}
declare const Fieldset: React.FC<FieldsetProps>;
export default Fieldset;
