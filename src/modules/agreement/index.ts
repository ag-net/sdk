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
            agg_id: id
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
            agg_id: id
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
            agg_id: id
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
            agg_id: id
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
            agg_id: id
        }, transactionIfo,
        {
            metadataRpc: this.metadataRpc,
            registry: this.registry
        })
        return utx
    }
}