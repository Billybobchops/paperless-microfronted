interface FilterProps {
    filterHeading?: string;
    title: string;
    title2?: string;
    title3?: string;
    links1: {
        value: string;
    }[];
    links2?: {
        value: string;
    }[];
    links3?: {
        value: string;
    }[];
    onChange?: (selections: {
        filter1: string;
        filter2?: string;
        filter3?: string;
    }) => void;
}
declare const Filter: React.FC<FilterProps>;
export default Filter;
