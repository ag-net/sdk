import { IAccount } from "../protocols";
import { Keyring } from '@polkadot/api'
import { mnemonicGenerate, mnemonicValidate, mnemonicToMiniSecret } from '@polkadot/util-crypto'
import { KeyringPair, deriveAddress, TypeRegistry } from '@substrate/txwrapper-core'
import { u8aToHex, hexToU8a } from '@polkadot/util'
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic'
import { IRpc } from "@/infra/protocols/rpc";

export class Account implements IAccount {
    private readonly keyring = new Keyring({ type: 'sr25519' })
    private mnemonic?: string
    private seed?: Uint8Array
    private account?: KeyringPair

    constructor (
        private readonly registry: TypeRegistry,
        private readonly rpc: IRpc
    ) {}

    createMnemonic () {
        this.mnemonic = mnemonicGenerate()
        return this.mnemonic
    }

    setMnemonic (phrase: string) {
        // if (!mnemonicValidate(phrase)) {
        //   throw new Error('Invalid mnemonic')
        // }
        this.mnemonic = phrase
    }


  setSeed (seed: string) {
    if (seed.substring(0,2) !== '0x' || seed.length !== 66) throw new Error('Invalid seed')
    this.seed = hexToU8a(seed)
  }

  mnemonicToSeed () {
    if (!this.mnemonic || this.mnemonic.length < 10) {
      throw new Error('Mnemonic not instantiate')
    }
    this.seed = mnemonicToMiniSecret(this.mnemonic)
    return u8aToHex(this.seed)
  }

  enableAccountByMnemonic () {
    // if (!this.mnemonic || this.mnemonic.length < 10) {
    //   throw new Error('Mnemonic not instantiate')
    // }
    this.account = this.keyring.addFromUri(this.mnemonic ?? "")
  }

  enableAccountBySeed () {
    if (!this.seed) throw new Error('Seed not instantiate')
    this.account = this.keyring.addFromSeed(this.seed)
  }

  disableAccount () {
    if (!this.account) throw new Error('Account not instantiate')
    this.account = undefined
  }

  publicKey () {
    if (!this.account) throw new Error('Account not instantiate')
    return deriveAddress(this.account.publicKey, this.registry.chainSS58 ?? 42)
  }

  async getNonce (): Promise<number> {
    if (!this.account) throw new Error('Account not instantiate')
    const nonce = await this.rpc.call({
      method: 'system_accountNextIndex',
      params: [this.publicKey()]
    })
    return nonce
  }

  sign (tx: string) {
    if (!this.account) throw new Error('Account not instantiate')
    const { signature } = this.registry.createType('ExtrinsicPayload', tx, {
      version: EXTRINSIC_VERSION
    }).sign(this.account)
    return signature as `0x${string}`
  }
}