import React from 'react';
import { ColumnConfiguration } from '@components/table/types';
interface MobileTableCardProps {
    row: Record<string, unknown>;
    columns: Array<{
        key: string;
        header: string;
        width: string;
    }>;
    isActive: boolean;
    onToggle: () => void;
    hasCheckboxes?: boolean;
    hasNestedData?: boolean;
    nestedTables?: Array<{
        key: string;
        title: string;
        columns: Array<{
            key: string;
            header: string;
            width?: string;
        }>;
    }>;
    actions?: {
        label: string;
        onClick: (rowData: Record<string, unknown>) => void;
    }[];
    columnConfig?: ColumnConfiguration;
}
declare const MobileTableCard: React.FC<MobileTableCardProps>;
export default MobileTableCard;
