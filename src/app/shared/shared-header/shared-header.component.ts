import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css']
})
export class SharedHeaderComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  public onLogoffClick() {
    this.authService.logout();
    location.href = location.host;
  }

}
