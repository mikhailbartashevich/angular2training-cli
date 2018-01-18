import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedHeaderComponent implements OnInit, OnDestroy {

  public user$: Observable<User>;
  public subject: Subject<any> = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.user$ = this.authService.getUserInfo();
    this.user$
      .pipe (
        takeUntil(this.subject)
      )
      .subscribe((user: User) => {
        if (!user) {
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
