import { AgreementData } from "@/models/agreement";
import { UnsignedTransaction } from "@substrate/txwrapper-core";

export interface IAgreement {
    create(hired: string, value: string, info: `0x${string}`, era: number): Promise<UnsignedTransaction>
    cancel(id: `0x${string}`, era: number): Promise<UnsignedTransaction>
    unsign(id: `0x${string}`, era: number): Promise<UnsignedTransaction>
    sign(id: `0x${string}`, era: number): Promise<UnsignedTransaction>
    setReview(id: `0x${string}`, era: number): Promise<UnsignedTransaction>
    accept(id: `0x${string}`, era: number): Promise<UnsignedTransaction>
    get(id: `0x${string}`): Promise<AgreementData | null>
    userAgreements(userId: string): Promise<Array<`0x${string}`>>
}