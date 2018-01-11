import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token') || '';
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(authReq);
  }
}
