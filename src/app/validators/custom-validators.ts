import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static uniqueName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpace = (control.value || '').includes(' ');
      return hasSpace ? { noSpacesAllowed: true } : null;
    };
  }
}
