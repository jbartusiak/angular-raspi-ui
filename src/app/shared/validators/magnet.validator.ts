import { AbstractControl, ValidationErrors } from "@angular/forms";

export const magnetValidator = (control: AbstractControl): ValidationErrors => {
  const {value} = control;

  const regex = new RegExp('magnet:\\?xt=urn:btih:[a-zA-Z0-9]*');
  if (!regex.test(value))
    return {magnet: true};
}
