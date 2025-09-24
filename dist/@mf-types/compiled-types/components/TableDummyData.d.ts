export declare const paperlessActionsFunction: (row: Record<string, unknown>) => ({
    label: string;
    primaryAction: boolean;
    componentType: "primaryButton";
    onClick: (row: Record<string, unknown>) => void;
} | {
    label: string;
    primaryAction: boolean;
    componentType: "linkIconButton";
    onClick: (row: Record<string, unknown>) => void;
})[];
export declare const dummyPaperlessRowData: {
    accountNumber: string;
    type: string;
    status: string;
    enrollInPaperless: string;
}[];
