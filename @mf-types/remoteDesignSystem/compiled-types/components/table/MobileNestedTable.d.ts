import React from 'react';
import type { ColumnConfig } from './types';
import { ColumnConfiguration } from '@components/table/types';
interface MobileNestedTableProps {
    nestedTables: Array<{
        key: string;
        title: string;
        columns: ColumnConfig<Record<string, unknown>>[];
    }>;
    row: Record<string, unknown>;
    columnConfig?: ColumnConfiguration;
}
declare const MobileNestedTable: React.FC<MobileNestedTableProps>;
export default MobileNestedTable;
