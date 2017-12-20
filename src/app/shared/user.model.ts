export class UserName {
  first: string;
  last: string;

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }

}

export class User {
  login: string;
  password: string;
  name: UserName;

  constructor(login: string, password: string, name: UserName) {
    this.login = login;
    this.password = password;
    this.name = name;
  }
}
