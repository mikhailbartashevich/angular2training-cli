import { FormControl } from '@angular/forms';

export function validateNumber(c: FormControl) {
  return Number.isInteger(c.value) ? null : {
    validateNumber: {
      valid: false
    }
  };
}
