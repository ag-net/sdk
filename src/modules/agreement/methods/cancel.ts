import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction
} from '@substrate/txwrapper-core'

interface CancelAgrementArgs extends Args {
        /**
         * The agreement id.
         */
        aggId: string
         
}

export function cancelAgreement(args: CancelAgrementArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'cancel',
            pallet: 'agreements'
        },
        ...info
    }, options)
}