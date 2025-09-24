import type { SxProps, Theme } from '@mui/material/styles';
interface MuiTableContainerProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    striped?: boolean;
    hasRowAction?: boolean;
}
declare const MuiTableContainer: React.FC<MuiTableContainerProps>;
export default MuiTableContainer;
