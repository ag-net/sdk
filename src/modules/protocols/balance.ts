import { UnsignedTransaction } from '@substrate/txwrapper-core'

export interface IBalance {
  get: (accountId: string) => Promise<string | null>
  transfer: (amount: string, to: string, era: number) => Promise<UnsignedTransaction>
}
