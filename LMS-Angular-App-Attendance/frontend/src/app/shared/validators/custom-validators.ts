import { AbstractControl, ValidatorFn } from "@angular/forms";
import { isNil, isEmpty } from "ramda";
import { validateIdNumber } from "../global/helper";

export class CustomValidators {

  static IdNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.pristine) {
      return null;
    }

    const idNumber = control.value.toString();
    if (isNil(idNumber)) {
      return null;
    }
    return validateIdNumber(idNumber);
  }

  static phone(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.pristine) {
      return null;
    }
    const phone = control.value;
    return phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      ? null
      : { invalidPhone: true };
  }

  static email(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.pristine) {
      return null;
    }
    const email = control.value;
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|\s$/;
    return emailExpression.test(email) ? null : { invalidEmail: true };
  }

  static names(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.pristine) {
      return null;
    }
    const name = control.value;
    return name.match(/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/) ? null : { invalidName: true };
  }

    /**
   * Custom Validator for Upload File extensions
   * @param allowedExtensions any
   */
     static fileUploadValidator(allowedExtensions: any): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        // Enter to validation only if has value or it's not undefined
        if (control.value !== undefined && isNaN(control.value)) {
          const file = control.value;
          // Get extension from file name
          const ext = file.substring(file.lastIndexOf('.') + 1);
          // Find extension file inside allowed extensions array
          if (allowedExtensions.includes(ext.toLowerCase())) {
          } else {
            return { extensionFile: true };
          }
        }
        return null;
      };
    }
}
