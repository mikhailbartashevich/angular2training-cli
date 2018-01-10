import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { User, UserName } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from './authorized.http.service';

@Injectable()
export class AuthService {

  private userInfo = new ReplaySubject<User>();
  private baseUrl = 'http://localhost:3004';

  constructor(private http: AuthorizedHttp) {}

  public login(user: User): Observable<Response> {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      {
        login: user.login,
        password: user.password
      }
    )
    .pipe (
      map((response: Response) => response.json())
    );
  }

  public logout(): void {
    this.userInfo.next(null);
  }

  public setToken(token: string): void {
    this.http.setToken(token);
  }

  public fetchUserInfo(): void {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.baseUrl}/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;
    const request = new Request(requestOptions);
    this.http.request(request)
    .pipe (
      map((response: Response) => response.json()),
    )
    .subscribe((userInfo: any) => { // TODO: use do action?
      const user = new User(
        userInfo.login,
        userInfo.password,
        new UserName(userInfo.name.first, userInfo.name.last)
      );
      this.userInfo.next(user);
    });
  }

  public getUserInfo(): ReplaySubject<User> {
    return this.userInfo;
  }

}
