import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

  private userInfo: ReplaySubject<User> = new ReplaySubject();

  public login(user: User) {
    this.userInfo.next(user);
  }

  public logout() {
    this.userInfo.next(null);
  }

  public getUserInfo(): ReplaySubject<User> {
    return this.userInfo;
  }

}
