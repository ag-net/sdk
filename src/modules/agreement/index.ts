import { AgreementData } from '@/models/agreement';
import { ApiPromise } from '@polkadot/api';
import { UnsignedTransaction, TypeRegistry } from '@substrate/txwrapper-core'
import { IAgreement } from "../protocols/agreement";
import { ITransaction } from "../protocols/transaction";
import { acceptAgreement } from './methods/accept';
import { cancelAgreement } from './methods/cancel';
import { createAgreement } from "./methods/create";
import { setReviewAgreement } from './methods/set-review';
import { signAgreement } from './methods/sign';
import { unsignAgreement } from './methods/unsing';

export class Agreement implements IAgreement {
    constructor(
        private readonly transaction: ITransaction,
        private readonly registry: TypeRegistry,
        private readonly metadataRpc: `0x${string}`,
        private readonly api: ApiPromise
    ) {}

    async create(hired: string, value: string, info: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = createAgreement({
            hired,
            value,
            info
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async cancel(id: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = cancelAgreement({
            aggId: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async unsign(id: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = unsignAgreement({
            aggId: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async sign(id: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = signAgreement({
            aggId: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async setReview(id: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = setReviewAgreement({
            aggId: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async accept(id: `0x${string}`, era: number): Promise<UnsignedTransaction> {
        const transactionIfo = await this.transaction.constructInfo(era)
        const utx = acceptAgreement({
            aggId: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }

    async get(id: `0x${string}`): Promise<AgreementData | null> {
        const agg = await this.api.query.agreements.agreements(id)
        if (!agg || agg.isEmpty) return null
        return agg.toJSON() as unknown as AgreementData
    }

    async userAgreements(userId: string): Promise<Array<`0x${string}`>> {
        const uagg = await this.api.query.agreements.userAgreements(userId)
        if (uagg.isEmpty) return []
        return uagg.toJSON() as unknown as Array<`0x${string}`>
    }
}