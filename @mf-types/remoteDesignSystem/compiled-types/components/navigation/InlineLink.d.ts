interface LinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    variant?: 'base' | 'default';
}
declare const InlineLink: React.FC<LinkProps>;
export default InlineLink;
