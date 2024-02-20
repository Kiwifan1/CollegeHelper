import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}
