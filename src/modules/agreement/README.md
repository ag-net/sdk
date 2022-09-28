# Agreement module

Here you will find all the features realated to agreements

## Create

Creates a new agreement
``` typescript
    create(
            hired: string, // Who will be hired
            value: string, // The contract value
            info: `0x${string}`, // Checksum of document in agreement
            era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>
```

## Cancel
Cancel an agreement that not be signed yet
``` typescript
    cancel(
        id: `0x${string}`, // Agreement id
        era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>
```

## Sign
Sign an agreement
``` typescript
        sign(
            id: `0x${string}`, // Agreement id
            era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>

```
## Unsing
Unsign an agreement
``` typescript
        unsign(
            id: `0x${string}`, // Agreement id
            era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>

```
## Set Review
Mark an agreement as in done by hired
``` typescript
        setReview(
            id: `0x${string}`, // Agreement id
            era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>

```
## Accept
Complete an agreement mark as in review by hired
``` typescript
        accept(
            id: `0x${string}`, // Agreement id
            era: number // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
        ): Promise<UnsignedTransaction>

```