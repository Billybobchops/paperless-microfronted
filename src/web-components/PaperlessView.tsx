import React, { useId, useState } from 'react';
import { dummyPaperlessRowData, paperlessActionsFunction } from '@components/TableDummyData';

export type DS = {
    Alert: React.ComponentType<any>;
    Checkbox: React.ComponentType<any>;
    Divider: React.ComponentType<any>;
    Heading: React.ComponentType<any>;
    InlineLink: React.ComponentType<any>;
    Label: React.ComponentType<any>;
    Paragraph: React.ComponentType<any>;
    PrimaryButton: React.ComponentType<any>;
    DynamicTable: React.ComponentType<any>;
    ChevronRight: React.ComponentType<any>;
};

type Props = { ds: DS };

export default function PaperlessView({ ds }: Props) {
    const { Alert, Checkbox, Divider, Heading, InlineLink, Label, Paragraph, PrimaryButton, DynamicTable, ChevronRight } = ds;
    
    const termsConditionsId = useId();
    const [showAlert, setShowAlert] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [paperlessCheckboxStates, setPaperlessCheckboxStates] = useState<Record<string, boolean>>({});
    
    // Helper function to get the base paperless state from row status
    const getBasePaperlessState = (row: Record<string, unknown>) => {
        const status = String(row.status).toLowerCase();
        
        if (status === 'pending' || status === 'needs verification') {
            return false;
        }
        
        if (status === 'enrolled (required)') {
            return true;
        }
        
        return status === 'paperless';
    };
    
    // Helper function to get the current state of a paperless switch (includes user changes)
    const getCurrentPaperlessState = (row: Record<string, unknown>) => {
        const accountNumber = String(row.accountNumber);
        const baseState = getBasePaperlessState(row);
        
        // Use local state if it exists, otherwise use base state
        return accountNumber in paperlessCheckboxStates 
            ? paperlessCheckboxStates[accountNumber] 
            : baseState;
    };
    
    // Helper function to get the original state (before any user changes)
    const getOriginalPaperlessState = (row: Record<string, unknown>) => {
        return getBasePaperlessState(row);
    };
    
    // Generic function to check for specific types of changes
    const hasChangesOfType = (changeType: 'opt-in' | 'opt-out') => {
        return dummyPaperlessRowData.some(row => {
            const originalState = getOriginalPaperlessState(row);
            const currentState = getCurrentPaperlessState(row);
            
            if (changeType === 'opt-in') {
                return !originalState && currentState; // was off, now on
            } else {
                return originalState && !currentState; // was on, now off
            }
        });
    };
    
    // Check if there are opt-in changes (enabling paperless)
    const hasOptInChanges = () => hasChangesOfType('opt-in');
    
    // Check if there are opt-out changes (disabling paperless)
    const hasOptOutChanges = () => hasChangesOfType('opt-out');
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handlePaperlessCheckboxChange = (accountNumber: string, checked: boolean) => {
        setPaperlessCheckboxStates(prev => {
            const newState = {
                ...prev,
                [accountNumber]: checked
            };
            return newState;
        });
        
        console.log(`Paperless enrollment changed for account ${accountNumber}: ${checked ? 'enrolled' : 'unenrolled'}`);
    };

    const paperlessColumnConfig = {
        enrollInPaperless: {
            cellType: 'switch' as const,
            getIsOn: (value: unknown, row: Record<string, unknown>) => {
                return getCurrentPaperlessState(row);
            },
            getDisabled: (value: unknown, row: Record<string, unknown>) => {
                const status = String(row.status).toLowerCase();
                return status === 'pending' || status === 'needs verification' || status === 'enrolled (required)';
            },
            getOnChange: (value: unknown, row: Record<string, unknown>) => {
                return (isOn: boolean) => {
                    const accountNumber = String(row.accountNumber);
                    const status = String(row.status).toLowerCase();
                    
                    // Only allow changes if not disabled
                    if (status !== 'pending' && status !== 'needs verification' && status !== 'enrolled (required)') {
                        handlePaperlessCheckboxChange(accountNumber, isOn);
                    }
                };
            }
        },
        status: {
            cellType: 'badge' as const,
            getVariant: (value: unknown) => {
                const status = String(value).toLowerCase();
                if (status === 'paperless') return 'success';
                if (status === 'not paperless') return 'neutral';
                if (status === 'needs verification') return 'info';
                if (status === 'enrolled (required)') return 'success';

                return 'info';
            }
        }
    };

    const isButtonEnabled = hasOptOutChanges() || (hasOptInChanges() && isChecked);

    return (
        <>
            <Heading semanticLevel="h1">Paperless Web Component</Heading>
            <Divider isDark={true} />
            <Paragraph>
                Going Paperless saves time and money by eliminating the need for paper printing and mailing of invoices
                and payments.{' '}
                <InlineLink onClick={() => setShowAlert(!showAlert)} target="_self">
                    Need help with this feature?
                </InlineLink>
            </Paragraph>

            {showAlert && (
                <Alert isDismissable={false} variant="info">
                    You may elect to "Go Paperless" by checking the proper option. To finalize your enrollment in
                    paperless billing, you must click on the "Complete Registration" link included in your confirmation
                    email to verify. that you have received and read this notification.
                </Alert>
            )}

            <Alert isDismissable={false} variant="info">
                Accounts enrolled in AutoPay must remain on Paperless Billing. Changes to paperless settings will affect
                all users on the account.
            </Alert>

            <DynamicTable
                columnConfig={paperlessColumnConfig}
                data={dummyPaperlessRowData}
                actionConfig={paperlessActionsFunction}
                exportConfig={{ excludeKeys: ['enrollInPaperless'] }}
                isExportable={true}
                title="Paperless"
            />

            <Label inline={true} inputID={termsConditionsId} required={false} spacing="u-my-m">
                <Checkbox
                    checked={isChecked}
                    id={termsConditionsId}
                    onChange={handleCheckboxChange}
                    spacing="u-ml-none"
                />
                <span>
                    By enabling Paperless, I agree to the{' '}
                    <InlineLink href="https://invoicecloud.net/payer-terms-conditions" target="_blank">
                        Invoice Cloud Terms and Conditions
                    </InlineLink>
                </span>
            </Label>

            <PrimaryButton
                clickHandler={() => {}}
                disabled={!isButtonEnabled}
                icon={<ChevronRight />}
                iconPosition="end"
                text="Save my changes"
            />
        </>
    );
}

// import React, { useId, useState } from 'react';
// import { getDesignSystemCssText, getComponentStylesCssText } from 'remoteDesignSystem/ComponentStylesCss';
// import { dummyPaperlessRowData, paperlessActionsFunction } from '@components/TableDummyData';

// export type DS = {
//     Alert: React.ComponentType<any>;
//     Checkbox: React.ComponentType<any>;
//     Divider: React.ComponentType<any>;
//     Heading: React.ComponentType<any>;
//     InlineLink: React.ComponentType<any>;
//     Label: React.ComponentType<any>;
//     Paragraph: React.ComponentType<any>;
//     PrimaryButton: React.ComponentType<any>;
//     DynamicTable: React.ComponentType<any>;
//     ChevronRight: React.ComponentType<any>;
// };

// type Props = {
//     ds: DS;
//     shadowRoot?: ShadowRoot;
// 	useShadowDOM: any;
// 	ShadowDOMProvider: any;
// };

// export default function PaperlessView({ ds, shadowRoot, useShadowDOM, ShadowDOMProvider }: Props) {
//     const { Alert, Checkbox, Divider, Heading, InlineLink, Label, Paragraph, PrimaryButton, DynamicTable, ChevronRight } = ds;

//     // Use the hook for setup only (no rendering)
//     const { render } = useShadowDOM({
//         existingShadowRoot: shadowRoot!,
//         styles: [
//             getDesignSystemCssText(),
//             getComponentStylesCssText(),
//         ],
//     });

//     const termsConditionsId = useId();
//     const [showAlert, setShowAlert] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);
//     const [paperlessCheckboxStates, setPaperlessCheckboxStates] = useState<Record<string, boolean>>({});

//     // Helper function to get the base paperless state from row status
//     const getBasePaperlessState = (row: Record<string, unknown>) => {
//         const status = String(row.status).toLowerCase();

//         if (status === 'pending' || status === 'needs verification') {
//             return false;
//         }

//         if (status === 'enrolled (required)') {
//             return true;
//         }

//         return status === 'paperless';
//     };

//     // Helper function to get the current state of a paperless switch (includes user changes)
//     const getCurrentPaperlessState = (row: Record<string, unknown>) => {
//         const accountNumber = String(row.accountNumber);
//         const baseState = getBasePaperlessState(row);

//         // Use local state if it exists, otherwise use base state
//         return accountNumber in paperlessCheckboxStates
//             ? paperlessCheckboxStates[accountNumber]
//             : baseState;
//     };

//     // Helper function to get the original state (before any user changes)
//     const getOriginalPaperlessState = (row: Record<string, unknown>) => {
//         return getBasePaperlessState(row);
//     };

//     // Generic function to check for specific types of changes
//     const hasChangesOfType = (changeType: 'opt-in' | 'opt-out') => {
//         return dummyPaperlessRowData.some(row => {
//             const originalState = getOriginalPaperlessState(row);
//             const currentState = getCurrentPaperlessState(row);

//             if (changeType === 'opt-in') {
//                 return !originalState && currentState; // was off, now on
//             } else {
//                 return originalState && !currentState; // was on, now off
//             }
//         });
//     };

//     // Check if there are opt-in changes (enabling paperless)
//     const hasOptInChanges = () => hasChangesOfType('opt-in');

//     // Check if there are opt-out changes (disabling paperless)
//     const hasOptOutChanges = () => hasChangesOfType('opt-out');

//     const handleCheckboxChange = () => {
//         setIsChecked(!isChecked);
//     };

//     const handlePaperlessCheckboxChange = (accountNumber: string, checked: boolean) => {
//         setPaperlessCheckboxStates(prev => {
//             const newState = {
//                 ...prev,
//                 [accountNumber]: checked
//             };
//             return newState;
//         });

//         console.log(`Paperless enrollment changed for account ${accountNumber}: ${checked ? 'enrolled' : 'unenrolled'}`);
//     };

//     const paperlessColumnConfig = {
//         enrollInPaperless: {
//             cellType: 'switch' as const,
//             getIsOn: (value: unknown, row: Record<string, unknown>) => {
//                 return getCurrentPaperlessState(row);
//             },
//             getDisabled: (value: unknown, row: Record<string, unknown>) => {
//                 const status = String(row.status).toLowerCase();
//                 return status === 'pending' || status === 'needs verification' || status === 'enrolled (required)';
//             },
//             getOnChange: (value: unknown, row: Record<string, unknown>) => {
//                 return (isOn: boolean) => {
//                     const accountNumber = String(row.accountNumber);
//                     const status = String(row.status).toLowerCase();

//                     // Only allow changes if not disabled
//                     if (status !== 'pending' && status !== 'needs verification' && status !== 'enrolled (required)') {
//                         handlePaperlessCheckboxChange(accountNumber, isOn);
//                     }
//                 };
//             }
//         },
//         status: {
//             cellType: 'badge' as const,
//             getVariant: (value: unknown) => {
//                 const status = String(value).toLowerCase();
//                 if (status === 'paperless') return 'success';
//                 if (status === 'not paperless') return 'neutral';
//                 if (status === 'needs verification') return 'info';
//                 if (status === 'enrolled (required)') return 'success';

//                 return 'info';
//             }
//         }
//     };

//     const isButtonEnabled = hasOptOutChanges() || (hasOptInChanges() && isChecked);

//     // Create the content to render
//     const content = (
//         <ShadowDOMProvider shadowRoot={shadowRoot}>
//             <Heading semanticLevel="h1">Paperless Web Component</Heading>
//             <Divider isDark={true} />
//             <Paragraph>
//                 Going Paperless saves time and money by eliminating the need for paper printing and mailing of invoices
//                 and payments.{' '}
//                 <InlineLink onClick={() => setShowAlert(!showAlert)} target="_self">
//                     Need help with this feature?
//                 </InlineLink>
//             </Paragraph>

//             {showAlert && (
//                 <Alert isDismissable={false} variant="info">
//                     You may elect to "Go Paperless" by checking the proper option. To finalize your enrollment in
//                     paperless billing, you must click on the "Complete Registration" link included in your confirmation
//                     email to verify. that you have received and read this notification.
//                 </Alert>
//             )}

//             <Alert isDismissable={false} variant="info">
//                 Accounts enrolled in AutoPay must remain on Paperless Billing. Changes to paperless settings will affect
//                 all users on the account.
//             </Alert>

//             <DynamicTable
//                 columnConfig={paperlessColumnConfig}
//                 data={dummyPaperlessRowData}
//                 actionConfig={paperlessActionsFunction}
//                 exportConfig={{ excludeKeys: ['enrollInPaperless'] }}
//                 isExportable={true}
//                 title="Paperless"
//             />

//             <Label inline={true} inputID={termsConditionsId} required={false} spacing="u-my-m">
//                 <Checkbox
//                     checked={isChecked}
//                     id={termsConditionsId}
//                     onChange={handleCheckboxChange}
//                     spacing="u-ml-none"
//                 />
//                 <span>
//                     By enabling Paperless, I agree to the{' '}
//                     <InlineLink href="https://invoicecloud.net/payer-terms-conditions" target="_blank">
//                         Invoice Cloud Terms and Conditions
//                     </InlineLink>
//                 </span>
//             </Label>

//             <PrimaryButton
//                 clickHandler={() => {}}
//                 disabled={!isButtonEnabled}
//                 icon={<ChevronRight />}
//                 iconPosition="end"
//                 text="Save my changes"
//             />
//         </ShadowDOMProvider>
//     );

//     // Render to shadow DOM if available
//     if (shadowRoot) {
//         render(content);
//     }

//     return (
//     <>
//         {/* This component renders to shadow DOM */}
//     </>
// );
// }