import React from 'react';
import { createRoot } from 'react-dom/client';
import { getDesignSystemStyleSheet, getDesignSystemCssText } from 'remoteDesignSystem/DesignSystemShadowCss';
import Paperless from '../components/Paperless';

class InvoiceCloudPaperlessElement extends HTMLElement {
    private shadowRoot: ShadowRoot;
    private reactRoot: any;
    private container: HTMLDivElement;

    constructor() {
        super();
        
        // Create shadow root
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        
        // Create container for React
        this.container = document.createElement('div');
        this.shadowRoot.appendChild(this.container);
        
        // Set up styles
        this.setupStyles();
        
        // Initialize React
        this.initializeReact();
    }

    private setupStyles() {
        try {
            // Modern approach with adoptedStyleSheets
            if (this.shadowRoot.adoptedStyleSheets !== undefined) {
                const sheet = getDesignSystemStyleSheet();
                this.shadowRoot.adoptedStyleSheets = [sheet];
            } else {
                // Fallback approach with <style> injection
                const style = document.createElement('style');
                style.textContent = getDesignSystemCssText();
                this.shadowRoot.appendChild(style);
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
            this.shadowRoot.appendChild(fallbackStyle);
        }
    }

    private initializeReact() {
        try {
            this.reactRoot = createRoot(this.container);
            this.reactRoot.render(React.createElement(Paperless));
        } catch (error) {
            console.error('Failed to initialize React in InvoiceCloud Paperless element:', error);
            this.showError('Failed to initialize component');
        }
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

    connectedCallback() {
        // Element is added to the DOM
        console.log('InvoiceCloud Paperless element connected to DOM');
    }

    disconnectedCallback() {
        // Element is removed from the DOM
        console.log('InvoiceCloud Paperless element disconnected from DOM');
        if (this.reactRoot) {
            this.reactRoot.unmount();
        }
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
