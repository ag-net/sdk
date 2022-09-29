enum AgStatus {
    NotSigned,
    Canceled,
    Signed,
    InReview,
    Complete,
}

export interface AgreementData {
    contractor: string
    hired: string
    value: string
    info: string
    status: AgStatus
}