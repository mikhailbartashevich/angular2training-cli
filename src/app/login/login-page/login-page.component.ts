import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { User, UserName } from '../../shared/user.model';
import { AuthService, YobitTicker } from '../../shared/auth.service';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
// import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy, OnInit {
  public user: User = new User('', '', new UserName('', ''));
  public subject: Subject<any> = new Subject();

  constructor(
    private authService: AuthService,
    private loaderBlockService: LoaderBlockService,
    private router: Router
  ) {}

       // .pipe(
      //   map(
      //     (info: YobitInfo) => Object.keys(info.pairs)
      //       .filter((pair: string) => pair.indexOf('_btc') > -1)
      //       .slice(0, 20)
      //       .join('-')
      //     ),
      //   switchMap((pairs: string) => this.authService.getYobitTicker(pairs)),
      // )
  public ngOnInit() {
    const pairs = this.authService.getYobitInfo();
    for (let i = 0; i < pairs.length; i += 50) {
      setTimeout(() => {
        const index = i + 50;
        const chunk = pairs.slice(i, index >= pairs.length ? pairs.length - 1 : index);
        this.authService.getYobitTicker(chunk.join('-'))
          .subscribe((tickers: any) => {
            for (const pair of pairs) {
              const ticker: YobitTicker = tickers[pair];
              if (ticker) {
                if (ticker.low / ticker.high > 0.1 && ticker.vol > 2) {
                  console.log(pair);
                }
              }
            }
          });
      }, 20000);
    }
  }

  public onFormSubmit() {
    this.loaderBlockService.show();
    this.authService.login(this.user)
    .pipe (
      takeUntil(this.subject)
    )
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

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
