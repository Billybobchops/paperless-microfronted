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
        this.shadow = this.attachShadow({ mode: 'open' });
        
        // Create container for React
        this.container = document.createElement('div');
        this.shadow.appendChild(this.container);
    }

    connectedCallback() {
        // Initialize asynchronously so MF can fetch/init the remote container
        this.init().catch(err => {
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
            // 1) Dynamically import the remote styles and components to create async boundaries
            const [
                { getDesignSystemStyleSheet, getDesignSystemCssText },
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
            ] = await Promise.all([
                import('remoteDesignSystem/DesignSystemShadowCss'),
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
            ]);

            // 2) Adopt stylesheet (or fallback) after the remote is ready
            this.setupStyles(getDesignSystemStyleSheet, getDesignSystemCssText);

            // 3) Create the design system object
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

            // 4) Render React with injected dependencies
            this.reactRoot = createRoot(this.container);
            this.reactRoot.render(React.createElement(PaperlessView, { ds }));
        } catch (error) {
            console.error('Failed to initialize InvoiceCloud Paperless element:', error);
            this.showError('Failed to initialize component');
        }
    }

    private setupStyles(getDesignSystemStyleSheet: () => CSSStyleSheet, getDesignSystemCssText: () => string) {
        try {
            // Modern approach with adoptedStyleSheets
            if (this.shadow.adoptedStyleSheets !== undefined) {
                const sheet = getDesignSystemStyleSheet();
                this.shadow.adoptedStyleSheets = [...this.shadow.adoptedStyleSheets, sheet];
            } else {
                // Fallback approach with <style> injection
                const style = document.createElement('style');
                style.textContent = getDesignSystemCssText();
                this.shadow.appendChild(style);
            }
        } catch (error) {
            console.error('Failed to set up design system styles:', error);
            // Add a basic style as fallback
            const fallbackStyle = document.createElement('style');
            fallbackStyle.textContent = `
                :host {
                    display: block;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `;
            this.shadow.appendChild(fallbackStyle);
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
                border: 1px solid #e74c3c;
                border-radius: 4px;
                background-color: #fdf2f2;
                color: #c53030;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                <strong>InvoiceCloud Paperless Error:</strong> ${message}
            </div>
        `;
    }

    // Handle attribute changes if needed in the future
    static get observedAttributes() {
        return []; // No attributes to observe for now
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // Handle attribute changes if needed in the future
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
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