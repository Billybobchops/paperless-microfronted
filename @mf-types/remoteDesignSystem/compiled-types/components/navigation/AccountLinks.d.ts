import type { Spacing } from '@styles/spacing';
interface AccountLinksProps {
    links: {
        value: string;
    }[];
    spacing?: Spacing | Spacing[];
    heading?: string;
    selectedValue?: string;
    onSelectionChange?: (value: string) => void;
}
declare const AccountLinks: React.FC<AccountLinksProps>;
export default AccountLinks;
