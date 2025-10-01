// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import PaperlessView from './PaperlessView';

// class InvoiceCloudPaperlessElement extends HTMLElement {
//     private reactRoot: ReturnType<typeof createRoot> | null = null;
//     private container!: HTMLDivElement;
//     private shadow!: ShadowRoot;

//     constructor() {
//         super();
        
//         // Create shadow root
//         this.shadow = this.attachShadow({ mode: 'closed' });
        
//         // Create container for React
//         this.container = document.createElement('div');
//         this.shadow.appendChild(this.container);
//     }

//     connectedCallback() {
//         // Initialize asynchronously so MF can fetch/init the remote container
//         this.init().catch(err => {
//             console.error('Paperless init failed:', err);
//             this.showError('Failed to initialize component');
//         });
//     }

//     disconnectedCallback() {
//         // Element is removed from the DOM
//         console.log('InvoiceCloud Paperless element disconnected from DOM');
//         this.reactRoot?.unmount();
//         this.reactRoot = null; // Clear reference
//     }

//     private async init() {
//         // Show loading state
//         this.showLoading();
        
//         try {
//             // 1) Dynamically import the remote styles and components to create async boundaries
//             const [
//                 { getDesignSystemStyleSheet, getDesignSystemCssText },
//                 { getComponentStylesStyleSheet, getComponentStylesCssText },
//                 { default: Alert },
//                 { default: Checkbox },
//                 { default: Divider },
//                 { default: Heading },
//                 { default: InlineLink },
//                 { default: Label },
//                 { default: Paragraph },
//                 { default: PrimaryButton },
//                 { default: DynamicTable },
//                 { ChevronRight },
//             ] = await Promise.all([
//                 import('remoteDesignSystem/DesignSystemShadowCss'),
//                 import('remoteDesignSystem/ComponentStylesCss'),
//                 import('remoteDesignSystem/Alert'),
//                 import('remoteDesignSystem/Checkbox'),
//                 import('remoteDesignSystem/Divider'),
//                 import('remoteDesignSystem/Heading'),
//                 import('remoteDesignSystem/InlineLink'),
//                 import('remoteDesignSystem/Label'),
//                 import('remoteDesignSystem/Paragraph'),
//                 import('remoteDesignSystem/PrimaryButton'),
//                 import('remoteDesignSystem/DynamicTable'),
//                 import('remoteDesignSystem/Icon'),
//             ]);

//             console.log('✅ All modules loaded successfully');

//             // 2) Adopt stylesheets (or fallbacks) after the remote is ready
//             this.setupStyles('Design System', getDesignSystemStyleSheet, getDesignSystemCssText);
//             this.setupStyles('Component', getComponentStylesStyleSheet, getComponentStylesCssText);

//             // 3) Create the design system object
//             const ds = {
//                 Alert,
//                 Checkbox,
//                 Divider,
//                 Heading,
//                 InlineLink,
//                 Label,
//                 Paragraph,
//                 PrimaryButton,
//                 DynamicTable,
//                 ChevronRight,
//             };

//             // 4) Render React with injected dependencies
//             this.reactRoot = createRoot(this.container);
//             this.reactRoot.render(React.createElement(PaperlessView, { ds }));
            
//             console.log('✅ React component rendered');
//         } catch (error) {
//             console.error('Failed to initialize InvoiceCloud Paperless element:', error);
//             this.showError('Failed to initialize component');
//         }
//     }

//     private setupStyles(styleType: string, getStyleSheet: () => CSSStyleSheet, getCssText: () => string) {
//         try {
//             console.log(`🎨 Setting up ${styleType} styles...`);
            
//             // Modern approach with adoptedStyleSheets
//             if (this.shadow.adoptedStyleSheets !== undefined) {
//                 console.log(`📋 Using adoptedStyleSheets for ${styleType}`);
//                 const sheet = getStyleSheet();
//                 console.log(`📄 ${styleType} stylesheet created:`, sheet);
                
//                 // Get current stylesheets
//                 const currentSheets = this.shadow.adoptedStyleSheets || [];
//                 console.log(`📚 Current stylesheets count: ${currentSheets.length}`);
                
//                 // Add new stylesheet
//                 this.shadow.adoptedStyleSheets = [...currentSheets, sheet];
//                 console.log(`✅ ${styleType} stylesheet adopted. Total: ${this.shadow.adoptedStyleSheets.length}`);
                
//                 // Debug: Log the CSS content
//                 const cssText = getCssText();
//                 console.log(`📝 ${styleType} CSS content length: ${cssText.length} characters`);
//                 console.log(`📝 ${styleType} CSS preview:`, cssText.substring(0, 200) + '...');
                
//             } else {
//                 console.log(`📋 Using <style> injection for ${styleType} (adoptedStyleSheets not supported)`);
//                 // Fallback approach with <style> injection
//                 const style = document.createElement('style');
//                 style.textContent = getCssText();
//                 this.shadow.appendChild(style);
//                 console.log(`✅ ${styleType} styles injected via <style> element`);
//             }
//         } catch (error) {
//             console.error(`❌ Failed to set up ${styleType} styles:`, error);
//             // Add a basic style as fallback
//             const fallbackStyle = document.createElement('style');
//             fallbackStyle.textContent = `
//                 :host {
//                     display: block;
//                     font-family: system-ui, -apple-system, sans-serif;
//                 }
//                 * {
//                     box-sizing: border-box;
//                 }
//             `;
//             this.shadow.appendChild(fallbackStyle);
//             console.log(`🔄 Added fallback styles for ${styleType}`);
//         }
//     }

//     private showLoading() {
//         this.container.innerHTML = `
//             <div style="
//                 padding: 2rem;
//                 text-align: center;
//                 font-family: system-ui, -apple-system, sans-serif;
//                 color: #666;
//             ">
//                 Loading Paperless Component...
//             </div>
//         `;
//     }

//     private showError(message: string) {
//         this.container.innerHTML = `
//             <div style="
//                 padding: 1rem;
//                 border: 1px solid #e74c3c;
//                 border-radius: 4px;
//                 background-color: #fdf2f2;
//                 color: #c53030;
//                 font-family: system-ui, -apple-system, sans-serif;
//             ">
//                 <strong>InvoiceCloud Paperless Error:</strong> ${message}
//             </div>
//         `;
//     }

//     // Handle attribute changes if needed in the future
//     static get observedAttributes() {
//         return []; // No attributes to observe for now
//     }

//     attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//         // Handle attribute changes if needed in the future
//         console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
//     }
// }

// export function registerInvoiceCloudPaperlessElement() {
//     if (!customElements.get('invoicecloud-paperless')) {
//         customElements.define('invoicecloud-paperless', InvoiceCloudPaperlessElement);
//         console.log('InvoiceCloud Paperless custom element registered');
//     } else {
//         console.warn('InvoiceCloud Paperless custom element already registered');
//     }
// }

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
                { default: useShadowDOM },
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
				{ getDesignSystemCssText, getComponentStylesCssText },
            ] = await Promise.all([
                import('remoteDesignSystem/useShadowDOM'), 
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
                    useShadowDOM, // Pass the hook
                    ShadowDOMProvider, // Pass the provider
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
        customElements.define(
            'invoicecloud-paperless',
            InvoiceCloudPaperlessElement
        );
        console.log('InvoiceCloud Paperless custom element registered');
    } else {
        console.warn(
            'InvoiceCloud Paperless custom element already registered'
        );
    }
}