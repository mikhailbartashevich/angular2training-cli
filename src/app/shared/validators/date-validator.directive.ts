import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { validateDateFormat } from './date.validator';

@Directive({
  selector: '[appValidateDateFormat][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateDateFormatDirective),
      multi: true
    }
  ]
})
export class ValidateDateFormatDirective implements Validator {

  validate(c: FormControl) {
    return validateDateFormat(c);
  }

}
