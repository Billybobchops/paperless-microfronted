import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
    name: 'paperless',
    exposes: {
        './Paperless': './src/components/Paperless.tsx',
    },
    remotes: {
        remoteDesignSystem:
            'remoteDesignSystem@https://uidesignsystem.netlify.app/remoteEntry.js',
    },
    filename: 'remoteEntry.js',
    shared: {
        react: { singleton: true, requiredVersion: '^18.0.0', eager: true },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0', eager: true },
        'react-router-dom': { singleton: true, requiredVersion: '^6.0.0', eager: true },
        clsx: { singleton: true, requiredVersion: '^2.0.0' },
        'react-hook-form': { singleton: true, requiredVersion: '^7.0.0' },
    },
});
