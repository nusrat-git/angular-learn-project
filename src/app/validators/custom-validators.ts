import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static uniqueName(
    existingNames: string[],
    editMode: boolean | null = null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(editMode);
      if (editMode) return null;
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
}
