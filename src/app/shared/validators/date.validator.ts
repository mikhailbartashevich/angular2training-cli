import { FormControl } from '@angular/forms';

export function validateDateFormat(c: FormControl, dateFormat: string) {
  const DATE_REGEXP = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  console.log(dateFormat);
  return DATE_REGEXP.test(c.value) ? null : {
    validateDateFormat: {
      valid: false
    }
  };
}
