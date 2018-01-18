import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, UrlSegment, NavigationEnd, Event } from '@angular/router';
import { filter/*,*map*/ } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
// import { CoursesService } from '../../courses/courses.service';
// import { CourseDetails } from '../../courses/course-details.model';

interface Breadcrumb {
  path: string;
  name: string;
}

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css'],
})
export class SharedHeaderComponent implements OnInit {

  public user$: Observable<User>;
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
    private authService: AuthService,
    // private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        for (const child of this.activatedRoute.root.children) {
          this.breadcrumbs = child.snapshot.url
            .map((url: UrlSegment, index: number, urls: UrlSegment[]) => ({
                path: urls.length > 1 ? urls.slice(0, index + 1).map(segment => segment.path).join('/') : url.path,
                name: url.path
              })
            );
        }
      });
  }

  computeRouteName(name: string): Observable<string> {
    if (name && Number.isInteger(+name)) {
      return of(`Course ${name}`);
      // this.coursesService.getCourseById(name)
      //   .pipe(
      //     map((course: CourseDetails) => course.title)
      //   );
    }
    return of(name);
  }

  public ngOnInit() {
    this.user$ = this.authService.getUserInfo();
  }

  public onLogoffClick() {
    this.authService.logout();
  }
}
