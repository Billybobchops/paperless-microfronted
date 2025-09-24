interface KebabProps {
    actions: {
        label: string;
        onClick: () => void;
    }[];
}
declare const KebabMenu: React.FC<KebabProps>;
export default KebabMenu;
