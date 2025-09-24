import React from 'react';
import { ColumnConfiguration } from './types';
/**
 * Renders a cell based on the column configuration
 * @param value - The cell value to render
 * @param columnKey - The column key for configuration lookup
 * @param columnConfig - The column configuration object
 * @param row - The entire row data object
 * @returns React.ReactNode - The rendered cell content
 */
export declare const renderCell: (value: unknown, columnKey: string, columnConfig?: ColumnConfiguration, row?: Record<string, unknown>) => React.ReactNode;
