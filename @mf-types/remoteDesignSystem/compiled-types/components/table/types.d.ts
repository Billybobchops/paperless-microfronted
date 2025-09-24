import { BadgeVariant } from '@components/typography/types';
export type ColumnConfig<T> = {
    key: keyof T;
    header: string;
    width?: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};
export type NestedTableConfig<T, K extends Record<string, unknown>> = {
    key: keyof T;
    title?: string;
    columns: ColumnConfig<K>[];
    getNestedData: (row: T) => K[];
};
export interface BaseColumnConfig {
    cellType: 'text' | 'badge' | 'inlineLink' | 'imageText' | 'linkIconButton' | 'checkbox' | 'switch';
}
export interface TextColumnConfig extends BaseColumnConfig {
    cellType: 'text';
    textColor?: string | ((value: unknown, row: Record<string, unknown>) => string | undefined);
    fontWeight?: string | ((value: unknown, row: Record<string, unknown>) => string | undefined);
}
export interface BadgeColumnConfig extends BaseColumnConfig {
    cellType: 'badge';
    getVariant: (value: unknown, row: Record<string, unknown>) => BadgeVariant;
}
export interface InlineLinkColumnConfig extends BaseColumnConfig {
    cellType: 'inlineLink';
    getHref?: (value: unknown, row: Record<string, unknown>) => string;
    getOnClick?: (value: unknown, row: Record<string, unknown>) => (() => void) | undefined;
}
export interface ImageTextColumnConfig extends BaseColumnConfig {
    cellType: 'imageText';
    getImageUrl?: (value: unknown, row: Record<string, unknown>) => string;
    getIcon?: (value: unknown, row: Record<string, unknown>) => string | null;
    renderIcon?: (value: unknown, row: Record<string, unknown>) => React.ReactNode | null;
    getImageAlt?: (value: unknown, row: Record<string, unknown>) => string;
    getText: (value: unknown, row: Record<string, unknown>) => string;
}
export interface LinkIconButtonColumnConfig extends BaseColumnConfig {
    cellType: 'linkIconButton';
    getOnClick?: (value: unknown, row: Record<string, unknown>) => (() => void) | undefined;
}
export interface CheckboxColumnConfig extends BaseColumnConfig {
    cellType: 'checkbox';
    getChecked?: (value: unknown, row: Record<string, unknown>) => boolean;
    getDisabled?: (value: unknown, row: Record<string, unknown>) => boolean;
    getOnChange?: (value: unknown, row: Record<string, unknown>) => ((checked: boolean) => void) | undefined;
}
export interface SwitchColumnConfig extends BaseColumnConfig {
    cellType: 'switch';
    getIsOn?: (value: unknown, row: Record<string, unknown>) => boolean;
    getDisabled?: (value: unknown, row: Record<string, unknown>) => boolean;
    getOnChange?: (value: unknown, row: Record<string, unknown>) => ((isOn: boolean) => void) | undefined;
}
export type CellRenderConfig = TextColumnConfig | BadgeColumnConfig | InlineLinkColumnConfig | ImageTextColumnConfig | LinkIconButtonColumnConfig | CheckboxColumnConfig | SwitchColumnConfig;
export interface ColumnConfiguration {
    [columnKey: string]: CellRenderConfig;
}
