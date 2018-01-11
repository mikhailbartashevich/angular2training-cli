import { FormControl } from '@angular/forms';

export function validateDateFormat(c: FormControl) {
  const DATE_REGEXP = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return DATE_REGEXP.test(c.value) ? null : {
    validateDateFormat: {
      valid: false
    }
  };
}
