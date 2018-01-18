import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';

interface TargetValue {
  checked: boolean;
  value: string;
}

interface AppEvent {
  target: TargetValue;
}

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsControlComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AuthorsControlComponent),
    multi: true
  }]
})
export class AuthorsControlComponent implements OnInit, ControlValueAccessor, Validator {

  @Input('availableAuthors') public availableAuthors: string[];
  @Input() public selectedAuthors: string[];

  public isDisabled: boolean;
  private onChange = (value: any) => {};

  constructor() {}

  ngOnInit() {}

  onCheckChange(event: AppEvent) {
    this.selectedAuthors = this.selectedAuthors || [];
    if (event.target.checked) {
      this.selectedAuthors.push(event.target.value);
    } else {
      const index = this.selectedAuthors.indexOf(event.target.value);
      this.selectedAuthors.splice(index, 1);
    }
    this.onChange(this.selectedAuthors);
  }

  isChecked(choice: string): boolean {
    return this.selectedAuthors && this.selectedAuthors.indexOf(choice) > -1;
  }

  validate(c: FormControl) {
    return this.selectedAuthors && this.selectedAuthors.length ? null : {
      validateAuthors: {
        valid: false
      }
    };
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedAuthors = value;
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
