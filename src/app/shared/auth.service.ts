import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { User, UserName } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private userInfo = new ReplaySubject<User>();
  private token: string;
  private baseUrl = 'http://localhost:3004';

  constructor(private http: Http) {}

  public login(user: User): Observable<Response> {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      {
        login: user.login,
        password: user.password
      }
    )
    .pipe (
      map((response: Response) => response.json()),
    );
  }

  public logout(): void {
    this.userInfo.next(null);
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public fetchUserInfo(): void {
    const requestOptions = new RequestOptions();
    requestOptions.url = `${this.baseUrl}/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers = new Headers(
      {'Authorization': this.token}
    );
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
