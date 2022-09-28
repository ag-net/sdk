import { Block } from '@/models/block'
import { Runtime } from '@/models/runtime'

export interface NodeHandler {
  block: () => Promise<Block>
  genesis: () => Promise<string>
  metadata: () => Promise<string>
  runtime: () => Promise<Runtime>
  submitTx: (tx: string) => Promise<string>
}
