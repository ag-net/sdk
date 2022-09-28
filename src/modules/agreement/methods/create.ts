import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction
} from '@substrate/txwrapper-core'

interface CreateAgrementArgs extends Args {
        /**
         * The recipient address, SS-58 encoded.
         */
         hired: string;
         /**
          * The amount to send.
          */
         value: number | string;
        /**
          * The hash of terms.
          */
         info: string
}

export function createAgreement(args: CreateAgrementArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'create',
            pallet: 'agreements'
        },
        ...info
    }, options)
}