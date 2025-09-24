// Paperless actions function
export const paperlessActionsFunction = (row: Record<string, unknown>) => {
    const status = String(row.status).toLowerCase();
    
    if (status === 'pending') {
        return [
            {
                label: 'Resend',
                primaryAction: true,
                componentType: 'primaryButton' as const,
                onClick: (row: Record<string, unknown>) => {
                    console.log('Resending paperless enrollment for account:', row.accountNumber);
                    alert(`Resending paperless enrollment email for account ${row.accountNumber}...`);
                }
            },
            {
                label: 'Cancel Pending Registration',
                primaryAction: true,
                componentType: 'linkIconButton' as const,
                onClick: (row: Record<string, unknown>) => {
                    console.log('Canceling pending paperless registration for account:', row.accountNumber);
                    alert(`Canceling pending paperless registration for account ${row.accountNumber}...`);
                }
            }
        ];
    }
    
    // Return empty array for non-pending statuses
    return [];
};

// Paperless
export const dummyPaperlessRowData = [
    {
        accountNumber: 'XSD38513336',
        type: 'Utility',
        status: 'Paperless',
        enrollInPaperless: 'Enroll'
    },
    {
        accountNumber: 'BSD32113337',
        type: 'Water',
        status: 'Not Paperless',
        enrollInPaperless: 'Enroll'
    },
    {
        accountNumber: 'CSD32119986',
        type: 'Electricity',
        status: 'Pending',
        enrollInPaperless: 'Enroll'
    },
    {
        accountNumber: 'CSD32344986',
        type: 'Gas',
        status: 'Enrolled (Required)',
        enrollInPaperless: 'Enroll'
    },
    {
        accountNumber: 'DSD44444986',
        type: 'Internet',
        status: 'Needs Verification',
        enrollInPaperless: 'Enroll'
    }
];
