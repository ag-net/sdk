import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction
} from '@substrate/txwrapper-core'

interface AgrementArgs extends Args {
        /**
         * The agreement id.
         */
        agg_id: string
         
}

export function setReviewAgreement(args: AgrementArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'set_review',
            pallet: 'agreements'
        },
        ...info
    }, options)
}