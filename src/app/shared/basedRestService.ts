import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface IRestServiceOptions {
  headers?: HttpHeaders
  observe?: 'body'
  params?: HttpParams
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
}

export abstract class BaseRestService {
  private isOffline: boolean

  constructor(protected httpClient: HttpClient) {
  }

  protected get<T>(url: string, options?: IRestServiceOptions): Observable<T> {
    if (this.isOffline) {
      return new Observable<T>()
    }
    const mergedOptions = this.createOptions(options)
    return this.httpClient.get<T>(url, mergedOptions)
  }

  private createOptions(userOptions: IRestServiceOptions): IRestServiceOptions {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    if (userOptions && userOptions.headers) {
      const allUserHeaders = userOptions.headers.keys()
      allUserHeaders.forEach(header => {
        headers = headers.set(header, userOptions.headers.get(header))
      })
    }
    return { ...userOptions, headers: headers }
  }
}
