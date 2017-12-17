import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../shared/user.model';
import { AuthService } from '../../shared/auth.service';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public user: User = {login: '', password: ''};

  constructor(
    private authService: AuthService,
    private loaderBlockService: LoaderBlockService,
    private router: Router
  ) {}

  public onEnterButtonClick() {
    this.authService.login(this.user);
    this.loaderBlockService.show();
    setTimeout(() => {
      this.loaderBlockService.hide();
      this.router.navigate(['courses']);
    }, 1500);
    
  }

}
