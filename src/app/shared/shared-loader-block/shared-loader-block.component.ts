import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoaderBlockService } from '../loader-block.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shared-loader-block',
  templateUrl: './shared-loader-block.component.html',
  styleUrls: ['./shared-loader-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedLoaderBlockComponent implements OnInit, OnDestroy {

  public visibleContent: boolean;
  public subject: Subject<boolean> = new Subject();

  constructor(
    private loaderBlockService: LoaderBlockService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.loaderBlockService.isVisible()
      .pipe(
        takeUntil(this.subject)
      )
      .subscribe((visible: boolean) => {
        this.visibleContent = visible;
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
