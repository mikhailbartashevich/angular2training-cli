import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User, UserName } from '../../shared/user.model';
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
  public user: User = new User('', '', new UserName('', ''));

  constructor(
    private authService: AuthService,
    private loaderBlockService: LoaderBlockService,
    private router: Router
  ) {}

  public onEnterButtonClick() {
    this.loaderBlockService.show();
    this.authService.login(this.user)
    .subscribe(
      (data: any) => {
        this.loaderBlockService.hide();
        this.authService.setToken(data.token);
        this.authService.fetchUserInfo();
        this.router.navigate(['courses']);
      },
      (err: any) => {
        this.loaderBlockService.hide();
        console.log(err._body);
      }
    );
  }

}
