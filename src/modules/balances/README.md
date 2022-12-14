# Balances Module

Here you will find all the features related to balances

## Transfer

Used to send your money to another account

``` typescript
  transfer (
    amount: string, // The amount you want to transfer 
    to: string, // Who will receive
    era = 100 // Era period means that this transaction has to be propagated in a maximum of 100 blocks after its creation
    ) => Promise<UnsignedTransaction>
```

Returns an unsigned transaction that can be used to propagate your transfer to network

## Get balance

Used to see balance of any account

```typescript
  get (
    accountId: string // the account
  ) => Promise<string>
```

Returns a string that represent balance
