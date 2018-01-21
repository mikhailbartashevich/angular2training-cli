import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserName } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

interface ServerUserName {
  first: string;
  last: string;
}

interface ServerUseInfo {
  login: string;
  password: string;
  name: ServerUserName;
}

export interface YobitInfo {
  server_time: number;
  pairs: Object;
}

export interface YobitTicker {
  high: number;
  low: number;
  vol: number;
  last: number;
}

export interface YobitTrade {
  type: string; // "bid", "ask"
  price: number,
  amount: number;
  timestamp: number;
}

@Injectable()
export class AuthService {

  private userInfo = new ReplaySubject<User>();
  private baseUrl = 'http://localhost:3004';
  private baseUrlYobit = 'https://yobit.io/api/3';

  constructor(private http: HttpClient) {}

  public getYobitInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrlYobit}/info`)
      .pipe(
        map((info: any) => Object.keys(info.pairs))
      );
  }

  public getYobitTicker(pair: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlYobit}/ticker/${pair}?ignore_invalid=1`);
  }

  public getYobitTrades(pair: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlYobit}/trades/${pair}?ignore_invalid=1`);
  }

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
    localStorage.removeItem('auth_token');
    this.userInfo.next(null);
  }

  public setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public isAuthenticated(): boolean {
   return localStorage.getItem('auth_token') != null;
  }

  public fetchUserInfo(): void {
    if (this.isAuthenticated()) {
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
  }

  public getUserInfo(): ReplaySubject<User> {
    return this.userInfo;
  }

}
