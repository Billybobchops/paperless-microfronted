import type { SxProps, Theme } from '@mui/material/styles';
interface MuiTableCellProps {
    children?: React.ReactNode;
    colSpan?: number;
    isActionsCell?: boolean;
    sx?: SxProps<Theme>;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
declare const MuiTableCell: React.FC<MuiTableCellProps>;
export default MuiTableCell;
