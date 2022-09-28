import { TxInfo, UnsignedTransaction } from '@substrate/txwrapper-core'
import { TransactionInfo } from '@/models/transaction'

export interface ITransaction {
  constructInfo: (era: number) => Promise<TransactionInfo>
  decodeTx: (tx: UnsignedTransaction) => TxInfo
  signPayload: (tx: UnsignedTransaction) => string
  signAndSendTransaction: (tx: UnsignedTransaction) => Promise<string>
  constructSignedTx: (tx: UnsignedTransaction, signature: `0x${string}`) => string
  calculateTxHash: (tx: string) => string
}
