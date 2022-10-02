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

    simpleSign(payload: string): { signature: `0x${string}`; hexPk: `0x${string}`; }

    simpleVerify(publicKey: `0x${string}`, payload: string, signature: `0x${string}`): boolean

    deriveHexPk(publicKey: `0x${string}`): string
}