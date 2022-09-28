export interface FrameAccount {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: {
      free: string
      reserved: string
      miscFrozen: string
      feeFrozen: string
    }
  }