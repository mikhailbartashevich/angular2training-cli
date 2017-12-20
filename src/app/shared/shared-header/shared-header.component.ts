import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedHeaderComponent implements OnInit, OnDestroy {

  public user: User;
  public subject: Subject<User> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.authService.getUserInfo()
        .pipe(
          takeUntil(this.subject)
        )
        .subscribe((userInfo: User) => {
          this.user = userInfo;
          this.changeDetector.markForCheck();
          if (!this.user) {
            this.router.navigate(['login']);
          }
        });
  }

  public onLogoffClick() {
    this.authService.logout();
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
