import React from 'react';
interface SortableColumnHeaderProps {
    columnKey: string;
    header: string;
    sortState: {
        columnKey: string | null;
        direction: 'asc' | 'desc';
    };
    onSort: (columnKey: string) => void;
}
declare const SortableColumnHeader: React.FC<SortableColumnHeaderProps>;
export default SortableColumnHeader;
