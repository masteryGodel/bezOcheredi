import { FormControl } from '@angular/forms';

export class EmailValidator {
  static emailValidator(control: FormControl): { [key: string]: boolean} {
    // tslint:disable-next-line: max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const result = emailRegex.test(control.value);

    if (result) {

      return null;
    }
    return {emailValidator: true};
  }
}
