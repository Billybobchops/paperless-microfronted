import React from 'react';
interface MobileSortDropdownProps {
    columns: Array<{
        key: string;
        header: string;
    }>;
    sortState: {
        columnKey: string | null;
        direction: 'asc' | 'desc';
    };
    onSort: (columnKey: string, direction: 'asc' | 'desc') => void;
}
declare const MobileSortDropdown: React.FC<MobileSortDropdownProps>;
export default MobileSortDropdown;
