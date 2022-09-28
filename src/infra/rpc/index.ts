import { IRpc } from "../protocols/rpc";
import agent from 'superagent'

export class Rpc implements IRpc {

  constructor(private readonly url: string) { }

  async call({
    method,
    params = []
  }: {
    method: string,
    params?: any[],
  }) {
    return new Promise((resolve, reject) => {

      agent
        .post(this.url)
        .set({ Headers: { 'Content-Type': 'application/json' } })
        .send(
          {
            id: 1,
            jsonrpc: '2.0',
            method,
            params
          }
        )
        .end((error, res) => {
          if (error) {
            return reject(error)
          }
          let ret = res.body
          try {
            ret = JSON.parse(res.body)
          } catch {
            ret = res.body
          }
          if (ret.error) return reject(ret.error)
          resolve(ret.result)
        })
    })
  }
  
  async dispatch({ url, body }: {
    url: string
    body: {
      type: string
      data: any
    }
  }) {

    try {
      const resp = await agent
        .post(url)
        .set({ Headers: { 'Content-Type': 'application/json' } })
        .send(body)
      if (resp.statusCode !== 200) {
        // TODO: Handle missing transactions
      }
    } catch (error) {
      // console.log('Error', error)
      // TODO: Handle connection refused 
    }
  }
}