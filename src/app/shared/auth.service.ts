import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private userInfo: Subject<User> = new Subject();
  private user: User;

  public login(user: User) {
    this.user = user;
    this.userInfo.next(user);
  }

  public logout() {
    this.userInfo.next(null);
  }

  public getUser() {
    this.userInfo.next(this.user);
  }

  public getUserInfo(): Subject<User> {
    return this.userInfo;
  }

}
