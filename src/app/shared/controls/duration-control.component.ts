import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { validateNumber } from '../validators/number.validator';

interface TargetValue {
  value: string;
}

interface AppEvent {
  target: TargetValue;
}

@Component({
  selector: 'app-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationControlComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DurationControlComponent),
    multi: true
  }]
})
export class DurationControlComponent implements OnInit, ControlValueAccessor, Validator {

  public durationMinutes = 0;
  @Input() public durationMs = 0;

  public isDisabled: boolean;
  private onChange = (value: any) => {};

  constructor() {}

  ngOnInit() {}

  validate(c: FormControl) {
    const minutesFC = new FormControl();
    minutesFC.setValue(this.durationMinutes);
    return validateNumber(minutesFC);
  }

  setValue(item: AppEvent) {
    this.durationMinutes = Number.isInteger(+item.target.value) ? +item.target.value : this.durationMinutes;
    this.onChange(Number(item.target.value) * 60 * 1000 );
  }

  writeValue(value: any): void {
    if (value) {
      this.durationMinutes = +value / 1000 / 60;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
