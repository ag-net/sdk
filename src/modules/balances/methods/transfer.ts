import {
    Args,
    BaseTxInfo,
    defineMethod,
    OptionsWithMeta,
    UnsignedTransaction
} from '@substrate/txwrapper-core'

interface BalancesTransferArgs extends Args {
    /**
 * The recipient address, SS-58 encoded.
 */
    dest: string;
    /**
     * The amount to send.
     */
    value: number | string;
}

export function balancesTransfer(args: BalancesTransferArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction {
    return defineMethod({
        method: {
            args,
            name: 'transfer',
            pallet: 'balances'
        },
        ...info
    }, options)
}