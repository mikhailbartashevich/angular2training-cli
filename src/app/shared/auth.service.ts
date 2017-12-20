import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

  private userInfo = new ReplaySubject<User>();

  public login(user: User) {
    this.userInfo.next(user);
  }

  public logout(): void {
    this.userInfo.next(null);
  }

  public getUserInfo(): ReplaySubject<User> {
    return this.userInfo;
  }

}
