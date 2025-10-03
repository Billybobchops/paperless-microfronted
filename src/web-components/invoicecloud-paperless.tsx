import React from 'react';
import { createRoot } from 'react-dom/client';
import PaperlessView from './PaperlessView';

class InvoiceCloudPaperlessElement extends HTMLElement {
    private reactRoot: ReturnType<typeof createRoot> | null = null;
    private container!: HTMLDivElement;
    private shadow!: ShadowRoot;

    constructor() {
        super();

        // Create shadow root
        this.shadow = this.attachShadow({ mode: 'closed' });

        // Create container for React
        this.container = document.createElement('div');
        this.shadow.appendChild(this.container);
    }

    connectedCallback() {
        // Initialize asynchronously so MF can fetch/init the remote container
        this.init().catch((err) => {
            console.error('Paperless init failed:', err);
            this.showError('Failed to initialize component');
        });
    }

    disconnectedCallback() {
        // Element is removed from the DOM
        console.log('InvoiceCloud Paperless element disconnected from DOM');
        this.reactRoot?.unmount();
        this.reactRoot = null; // Clear reference
    }

    private async init() {
        // Show loading state
        this.showLoading();

        try {
            const [
				{ default: ShadowDOMProvider },
                { default: Alert },
                { default: Checkbox },
                { default: Divider },
                { default: Heading },
                { default: InlineLink },
                { default: Label },
                { default: Paragraph },
                { default: PrimaryButton },
                { default: DynamicTable },
                { ChevronRight },
				dsCssMod,
				compCssMod,
            ] = await Promise.all([
                import('remoteDesignSystem/ShadowDOMProvider'), 
                import('remoteDesignSystem/Alert'),
                import('remoteDesignSystem/Checkbox'),
                import('remoteDesignSystem/Divider'),
                import('remoteDesignSystem/Heading'),
                import('remoteDesignSystem/InlineLink'),
                import('remoteDesignSystem/Label'),
                import('remoteDesignSystem/Paragraph'),
                import('remoteDesignSystem/PrimaryButton'),
                import('remoteDesignSystem/DynamicTable'),
                import('remoteDesignSystem/Icon'),
                import('remoteDesignSystem/DesignSystemShadowCss'),
                import('remoteDesignSystem/ComponentStylesCss'),
            ]);

			// Be resilient to named vs default exports
			const getDesignSystemCssText =
				(dsCssMod as any).getDesignSystemCssText ?? (dsCssMod as any).default;
			const getComponentStylesCssText =
				(compCssMod as any).getComponentStylesCssText ?? (compCssMod as any).default;

			const ensureStyle = (id: string, css: string) => {
                if (
                    !this.shadow.querySelector<HTMLStyleElement>(
                        `style[data-id="${id}"]`
                    )
                ) {
                    const s = document.createElement('style');
                    s.setAttribute('data-id', id);
                    s.textContent = css;
                    this.shadow.appendChild(s);
                }
            };
            ensureStyle('ic-ds-root', getDesignSystemCssText());
            ensureStyle('ic-ds-components', getComponentStylesCssText());

            console.log('✅ All modules loaded successfully');

            // 2) Create the design system object
            const ds = {
                Alert,
                Checkbox,
                Divider,
                Heading,
                InlineLink,
                Label,
                Paragraph,
                PrimaryButton,
                DynamicTable,
                ChevronRight,
            };

            // 3) Render React with both ds and shadowRoot
            this.reactRoot = createRoot(this.container);
            this.reactRoot.render(
                React.createElement(PaperlessView, {
                    ds,
                    shadowRoot: this.shadow,
                    ShadowDOMProvider,
                })
            );

            console.log(
                '✅ React component rendered with shadow DOM integration'
            );
        } catch (error) {
            console.error(
                'Failed to initialize InvoiceCloud Paperless element:',
                error
            );
            this.showError('Failed to initialize component');
        }
    }

    private showLoading() {
        this.container.innerHTML = `
            <div style="
                padding: 2rem;
                text-align: center;
                font-family: system-ui, -apple-system, sans-serif;
                color: #666;
            ">
                Loading Paperless Component...
            </div>
        `;
    }

    private showError(message: string) {
        this.container.innerHTML = `
            <div style="
                padding: 1rem;
                border: 1px solid red;
                border-radius: 4px;
                background-color: #FDF2F2;
                color: #000;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                <strong>InvoiceCloud Paperless Error:</strong> ${message}
            </div>
        `;
    }
}

export function registerInvoiceCloudPaperlessElement() {
    if (!customElements.get('invoicecloud-paperless')) {
        customElements.define('invoicecloud-paperless', InvoiceCloudPaperlessElement);
        console.log('InvoiceCloud Paperless custom element registered');
    } else {
        console.warn('InvoiceCloud Paperless custom element already registered');
    }
}
