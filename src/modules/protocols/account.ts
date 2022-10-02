import { UnsignedTransaction } from "@substrate/txwrapper-core"

export interface IAccount {
    createMnemonic: () => string

    setMnemonic: (phrase: string) => void
  
    setSeed: (seed: string) => void
  
    mnemonicToSeed: () => string
  
    enableAccountByMnemonic: () => void
  
    enableAccountBySeed: () => void
  
    disableAccount: () => void
  
    publicKey: () => string
  
    getNonce: () => Promise<number>
  
    sign: (tx: string) => `0x${string}`

    simpleSign(payload: string): `0x${string}`

    simpleVerify(publicKey: string, payload: string, signature: string): boolean
}