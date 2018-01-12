import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

interface TargetValue {
  value: string;
}

interface AppEvent {
  target: TargetValue;
}

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateControlComponent),
    multi: true
  }]
})
export class DateControlComponent implements OnInit, ControlValueAccessor {

  public dateString = '';
  @Input() public dateMs = 0;

  public isDisabled: boolean;
  public currentValue: any;
  private onChange = (value: any) => {};

  constructor() {}

  ngOnInit() {}

  setValue(item: AppEvent) {
    this.dateString = item.target.value;
    this.onChange(new Date(item.target.value).getTime());
  }

  writeValue(value: any): void {
    if (value) {
      this.dateString = this.formattedDate_(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private formattedDate_(d = new Date): string {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return `${month}/${day}/${year}`;
  }

}
