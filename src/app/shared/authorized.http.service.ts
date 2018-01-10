import { Http, Response, Request, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class AuthorizedHttp extends Http {

  private token = '';

  public setToken(token: string): void {
    this.token = token;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (!options) {
      options = { headers: new Headers() };
    }
    options.headers.set('Authorization', this.token);
    return super.request(url, options);
  }

}
