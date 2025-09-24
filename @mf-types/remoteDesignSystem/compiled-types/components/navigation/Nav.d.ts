import type { NavigationLink } from './types';
type NavigationProps = {
    links: NavigationLink[];
    isMobileNavOpen: boolean;
};
declare const Nav: ({ links, isMobileNavOpen }: NavigationProps) => import("react/jsx-runtime").JSX.Element;
export default Nav;
