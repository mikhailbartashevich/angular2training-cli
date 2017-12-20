import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoaderBlockService } from '../loader-block.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-shared-loader-block',
  templateUrl: './shared-loader-block.component.html',
  styleUrls: ['./shared-loader-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedLoaderBlockComponent implements OnInit {

  public visibleContent$: Subject<boolean>;

  constructor(private loaderBlockService: LoaderBlockService) {}

  public ngOnInit() {
    this.visibleContent$ = this.loaderBlockService.isVisible();
  }

}
