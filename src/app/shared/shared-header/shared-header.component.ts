import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedHeaderComponent implements OnInit {

  public user$: Observable<User>;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.user$ = this.authService.getUserInfo();
  }

  public onLogoffClick() {
    this.authService.logout();
  }

}
