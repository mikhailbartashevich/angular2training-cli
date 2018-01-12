import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { validateNumber } from './number.validator';

@Directive({
  selector: '[appValidateNumber][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateNumberDirective),
      multi: true
    }
  ]
})
export class ValidateNumberDirective implements Validator {

  validate(c: FormControl) {
    return validateNumber(c);
  }

}
