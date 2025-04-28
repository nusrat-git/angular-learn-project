import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Employee } from '../services/employee/employee.service';
import { Observable, catchError, debounceTime, of, switchMap } from 'rxjs';

export class CustomValidators {
  static uniqueName(existingNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentName = control.value?.trim().toLowerCase();
      const isDuplicate = existingNames?.find(
        (name) => name?.trim().toLowerCase() === currentName
      );
      return isDuplicate ? { nameNotUnique: true } : null;
    };
  }

  static minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length >= min) {
        return null;
      }
      return { minLengthArray: true };
    };
  }

  static checkPdfFile() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      console.log(value);

      if (!value) return null;

      if (
        typeof value === 'string' &&
        value.startsWith('data:application/pdf')
      ) {
        return null;
      }

      return { invalidPdf: true };
    };
  }
}
