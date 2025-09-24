import { ColumnConfiguration } from '@components/table/types';
interface MuiDynamicTableProps {
    data: unknown[];
    getRowId?: (row: Record<string, unknown>) => string;
    title?: string;
    hasCheckboxes?: boolean;
    actions?: {
        label: string;
        onClick: (rowData: Record<string, unknown>) => void;
    }[];
    striped?: boolean;
    onSelectionChange?: (selectedRows: Record<string, unknown>[]) => void;
    columnConfig?: ColumnConfiguration;
}
export interface MuiDynamicTableRef {
    getSelectedRows: () => Record<string, unknown>[];
    getActiveRows: () => Record<string, boolean>;
}
declare const MuiDynamicTable: import("react").ForwardRefExoticComponent<MuiDynamicTableProps & import("react").RefAttributes<MuiDynamicTableRef>>;
export default MuiDynamicTable;
