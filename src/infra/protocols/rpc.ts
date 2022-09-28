export interface IRpc {
    call: ({
      method,
      params,
    }: {
      method: string,
      params?: any[],
    }) => Promise<any>
    dispatch: ({
      url,
      body
    }: {
      url: string
      body: {
        type: string
        data: any
      }
    }) => Promise<void>
  }