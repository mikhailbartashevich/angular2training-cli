import { Component } from '@angular/core';
import { User } from '../../shared/user.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public user: User = {login: '', password: ''};

  constructor(private authService: AuthService) {}

  public onEnterButtonClick() {
    this.authService.login(this.user);
    location.href += '/courses';
  }

}
