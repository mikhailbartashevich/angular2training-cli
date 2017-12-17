import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-shared-footer',
  templateUrl: './shared-footer.component.html',
  styleUrls: ['./shared-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
