import { IRegistry, KNOWN_CHAIN_PROPERTIES, GetRegistryOpts } from "../protocols/registry";
import {
    getRegistryBase,
    getSpecTypes,
    TypeRegistry
  } from '@substrate/txwrapper-core'

export class Registry implements IRegistry {
    getRegistry ({ specName, chainName, specVersion, metadataRpc, properties }: GetRegistryOpts): TypeRegistry {
        const registry = new TypeRegistry()
        return getRegistryBase({
            chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
            specTypes: getSpecTypes(registry as any, chainName, specName, specVersion) as any,
            metadataRpc
        })
    }
}