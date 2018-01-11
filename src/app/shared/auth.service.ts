import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserName } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

interface ServerUserName {
  first: string;
  last: string;
}

interface ServerUseInfo {
  login: string;
  password: string;
  name: ServerUserName;
}

@Injectable()
export class AuthService {

  private userInfo = new ReplaySubject<User>();
  private baseUrl = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<Object> {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      {
        login: user.login,
        password: user.password
      }
    );
  }

  public logout(): void {
    this.userInfo.next(null);
  }

  public setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public fetchUserInfo(): void {
    this.http.post(`${this.baseUrl}/auth/userinfo`, {})
      .subscribe((userInfo: ServerUseInfo) => { // TODO: use do action?
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
