import { ITransaction } from "../protocols/transaction";
import { decode, TypeRegistry, construct, UnsignedTransaction } from '@substrate/txwrapper-core'
import { IAccount } from "../protocols";
import { INode } from "../protocols/node";
import { TransactionInfo } from "@/models/transaction";

export class Transaction implements ITransaction {
    constructor (
        private readonly metadataRpc: `0x${string}`,
        private readonly registry: TypeRegistry,
        private readonly node: INode,
        private readonly account: IAccount,
        private readonly specVersion: number,
        private readonly transactionVersion: number
      ) {}

      async constructInfo (era: number) {
        const block = await this.node.block()
        const publicKey = this.account.publicKey()
        const nonce = await this.account.getNonce()
        const genesisHash = await this.node.genesis()
    
        const transactionInfo: TransactionInfo = {
          address: publicKey,
          blockHash: block.hash,
          blockNumber: block.header.number as any,
          eraPeriod: era,
          genesisHash: genesisHash,
          metadataRpc: this.metadataRpc,
          nonce,
          specVersion: this.specVersion,
          transactionVersion: this.transactionVersion,
          tip: 0
        }
        return transactionInfo
      }
    
      decodeTx (tx: UnsignedTransaction) {
        return decode(tx, {
          metadataRpc: this.metadataRpc,
          registry: this.registry
        })
      }
    
      signPayload (tx: UnsignedTransaction) {
        return construct.signingPayload(tx, {
          registry: this.registry
        })
      }
    
      constructSignedTx (tx: UnsignedTransaction, signature: `0x${string}`) {
        return construct.signedTx(tx, signature, {
          metadataRpc: this.metadataRpc,
          registry: this.registry
        })
      }
    
      calculateTxHash (tx: string) {
        return construct.txHash(tx)
      }
    
    
      async signAndSendTransaction (tx: UnsignedTransaction): Promise<string> {
        const signPayload = this.signPayload(tx)
        const signature = this.account.sign(signPayload)
        const transaction = this.constructSignedTx(tx, signature)
        const hash = await this.node.submitTx(transaction)
        return hash
      }
}