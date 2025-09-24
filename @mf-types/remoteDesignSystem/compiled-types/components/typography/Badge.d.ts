import { BadgeVariant } from './types';
interface BadgeProps {
    content: string;
    hasMargin?: boolean;
    variant: BadgeVariant;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
