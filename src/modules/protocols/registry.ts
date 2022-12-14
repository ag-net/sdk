import {
  GetRegistryOptsCore,
  TypeRegistry
} from '@substrate/txwrapper-core'

// As a convenience to users we can provide them with hardcoded chain properties
// as these rarely change.
/**
 * `ChainProperties` for networks that txwrapper-foo supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
export const KNOWN_CHAIN_PROPERTIES = {
  testnet: {
    ss58Format: 42,
    tokenDecimals: 18,
    tokenSymbol: 'TAG'
  }
}

// We override the `specName` property of `GetRegistryOptsCore` in order to get narrower type specificity,
// hopefully creating a better experience for users.
/**
 * Options for the `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
  specName: keyof typeof KNOWN_CHAIN_PROPERTIES
}

export interface IRegistry {
  getRegistry: ({
    specName,
    chainName,
    specVersion,
    metadataRpc,
    properties
  }: GetRegistryOpts) => TypeRegistry
}
