import { IRpc } from "@/infra/protocols/rpc";
import { Block } from "@/models/block";
import { Runtime } from "@/models/runtime";
import { INode } from "../protocols/node";

export class Node implements INode {
    constructor (
        private readonly rpc: IRpc
    ) {}

    async block (): Promise<Block> {
        const lastBlock = await this.rpc.call({method: 'chain_getBlock'})
        const lastBlockHash = await this.rpc.call({method: 'chain_getBlockHash'}) as string
        const block: Block = {
            extrinsics: lastBlock.block.extrinsics,
            header: lastBlock.block.header,
            hash: lastBlockHash
        }
        return block
    }

    async genesis (): Promise<string> {
        const genesisBlock = await this.rpc.call({
            method: 'chain_getBlockHash',
            params: [0],
        }) as string
        return genesisBlock
    }

    async metadata (): Promise<`0x${string}`> {
        const metadata = await this.rpc.call({method: 'state_getMetadata'}) as `0x${string}`
        return metadata
    }

    async runtime (): Promise<Runtime> {
        const runtime = await this.rpc.call({
            method: 'state_getRuntimeVersion'
        })
        return runtime
    }

    async submitTx (tx: string): Promise<string> {
        const txhash = await this.rpc.call({
            method: 'author_submitExtrinsic',
            params: [tx]
        })
        return txhash
    }
}