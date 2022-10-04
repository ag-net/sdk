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
         aggId: string
         
}

export function setReviewAgreement(args: AgrementArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'setReview',
            pallet: 'agreements'
        },
        ...info
    }, options)
}