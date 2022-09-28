import { IBalance } from '../protocols/balance'
import { UnsignedTransaction, TypeRegistry } from '@substrate/txwrapper-core'
import { ApiPromise } from "@polkadot/api";
import BN from 'bignumber.js'
import { FrameAccount } from '@/models/frame-account';
import { ITransaction } from '../protocols/transaction';
import { balancesTransfer } from './methods/transfer';

export class Balances implements IBalance {
  constructor (
    private readonly registry: TypeRegistry,
    private readonly metadataRpc: `0x${string}`,
    private readonly api: ApiPromise,
    private readonly transaction: ITransaction
  ) {}

  async get (accountId: string): Promise<string | null> {
    try {
      const account = await this.api.query.system.account(accountId)
      if (!account) return null
      const parsed = account.toJSON() as unknown as FrameAccount
      return (new BN(parsed.data.free.toString())).toFixed(0)
    } catch (error) {
      return null
    }
  }

  async transfer (amount: string, to: string, era: number): Promise<UnsignedTransaction> {
      const transactionInfo = await this.transaction.constructInfo(era)
      const utx = balancesTransfer({
        dest: to,
        value: amount
      },
      transactionInfo,
      {
        metadataRpc: this.metadataRpc,
        registry: this.registry
      })
      return utx
  }
}
