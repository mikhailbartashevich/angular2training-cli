import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { User, UserName } from '../../shared/user.model';
import { AuthService, YobitTicker, YobitTrade } from '../../shared/auth.service';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { filter } from 'rxjs/operators/filter';
import { toArray } from 'rxjs/operators/toArray';
import { map } from 'rxjs/operators/map';
import { concatAll } from 'rxjs/operators/concatAll';
import { concatMap } from 'rxjs/operators/concatMap';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';
import { switchMap } from 'rxjs/operators/switchMap';
import { Observable } from 'rxjs/Observable';

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

  public ngOnInit() {
    const adminPairsDraft$: Observable<string[]> = this.getDraftPairs();
    adminPairsDraft$
      .pipe(
        concatAll(),
        concatMap((pair: string[]) => of(pair.toString()).pipe(delay(10000))),
        switchMap((pair: string) => this.authService.getYobitTrades(pair)),
        map((pairTrade: any) => {
          const pair = Object.keys(pairTrade)[0];
          const trades: YobitTrade[] = pairTrade[pair];
          const buyNumber = trades.reduce<number>(
            (sum: number, trade: YobitTrade) => sum + (trade.type === 'bid' ? 1 : 0), 0
          );
          const stats = {pair: pair, buyRatio: buyNumber / trades.length};
          return stats;
        })
      )
      .subscribe((stats: any) => {
        if (stats.buyRatio > 0.6) {
          console.log(stats);
          const display = stats.pair.toUpperCase().split('_').join('/');
          console.log(`https://yobit.io/en/trade/${display}`);
        }
      });
  }

 private getDraftPairs(): Observable<string[]> {
  return this.authService.getYobitInfo()
    .pipe(
      concatAll(),
      filter((pair: string) => pair.indexOf('_btc') > -1),
      toArray(),
      map((filteredPairs: string[]) => {
        const chunkSize = 25;
        const result = [];
        for (let i = 0, index = chunkSize; i < filteredPairs.length; i += chunkSize, index = i + chunkSize) {
          const endIndex = index >= filteredPairs.length ? filteredPairs.length - 1: index;
          const chunk = filteredPairs.slice(i, endIndex);
          result.push(chunk.join('-'));
        }
        return result;
      }),
      concatAll(),
      concatMap((chunk: string[]) => of(chunk.toString()).pipe(delay(5000))),
      switchMap((chunk: string) => this.authService.getYobitTicker(chunk)),
      map((tickersObject: any) => {
        const adminPairs: string[] = [];
        const pairs = Object.keys(tickersObject);
        for(const pair of pairs) {
          const ticker: YobitTicker = tickersObject[pair];
          if (ticker) {
            const ratio = ticker.low / ticker.high;
            if (ratio > 0.2 && ratio < 0.4 && ticker.vol > 0.5 && ticker.vol < 7) {
              adminPairs.push(pair);
              console.log('selected: ' + adminPairs.sort());
              const display = pair.toUpperCase().split('_').join('/');
              console.log(`https://yobit.io/en/trade/${display}`);
            }
          }
        }
        return adminPairs;
      })
    );
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
