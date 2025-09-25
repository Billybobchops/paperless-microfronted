import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import mfConfig from './module-federation.config';

export default defineConfig({
    plugins: [pluginReact(), pluginModuleFederation(mfConfig)],
    server: {
        cors: {
            origin: '*',
            credentials: true,
        },
    },
    html: {
        template: './src/index.html',
    },
    source: {
        entry: {
            index: './src/index.tsx',
            'invoicecloud-paperless': './src/web-components/entry-paperless.ts',
        },
    },
    output: {
        distPath: {
            root: 'dist',
        },
        filename: {
            js: (pathData) => {
                // Use consistent filename for the paperless element
                if (pathData.chunk?.name === 'invoicecloud-paperless') {
                    return 'invoicecloud-paperless.js';
                }
                // Use default hashed filenames for other entries
                return '[name].[contenthash:8].js';
            },
        },
    },
    tools: {
        rspack: {
            optimization: {
                splitChunks: false,
				runtimeChunk: false,
            },
        },
    },
});
