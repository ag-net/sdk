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

export function signAgreement(args: AgrementArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'sign',
            pallet: 'agreements'
        },
        ...info
    }, options)
}