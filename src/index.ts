import { ApiPromise, WsProvider } from "@polkadot/api"
import { Balances, Account } from "@/modules"
import { Rpc } from "./infra/rpc"
import { Node } from "./modules/node"
import { Registry } from "./modules/registry"
import { createMetadata } from "@substrate/txwrapper-core"
import { Transaction } from "./modules/transaction"
import { Agreement } from "./modules/agreement"
import { IAccount } from "./modules/protocols"
import { ITransaction } from "./modules/protocols/transaction"
import { IBalance } from "./modules/protocols/balance"
import { IAgreement } from "./modules/protocols/agreement"

export interface AgnetModules {
    account: IAccount,
    transaction: ITransaction,
    balances: IBalance,
    agreement: IAgreement
}

export default async ({node_ws, node_rpc}: {
    node_ws: string
    node_rpc: string
}): Promise<AgnetModules> => {
    const wsProvider = new WsProvider(node_ws)
    const api = await ApiPromise.create({ provider: wsProvider, throwOnConnect: true })
    if (!api.isConnected) throw new Error("Connection failed")
    const rpc = new Rpc(node_rpc)
    const node = new Node(rpc)

    const metadataRpc = await node.metadata()
    const runtime = await node.runtime()
    const registry = (new Registry()).getRegistry({
      chainName: 'testnet',
      metadataRpc,
      specName: runtime.specName as any,
      specVersion: runtime.specVersion,
      properties: undefined
    })
  
    registry.setMetadata(createMetadata(registry, metadataRpc))

    const account = new Account(registry, rpc)
    const transaction = new Transaction(metadataRpc, registry, node, account, runtime.specVersion, runtime.transactionVersion)
    const balances = new Balances(registry, metadataRpc, api, transaction)
    const agreement = new Agreement(transaction, registry, metadataRpc, api)

    return {
        account,
        transaction,
        balances,
        agreement
    }
}