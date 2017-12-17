import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderBlockService {

  private visible: Subject<boolean> = new Subject();

  public show() {
    this.visible.next(true);
  }

  public hide() {
    this.visible.next(false);
  }

  public isVisible(): Subject<boolean> {
    return this.visible;
  }

}
