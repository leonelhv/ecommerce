import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export class EmailValidator {
  static existEmail(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService
        .verificarEmailInFirebase(control.value)
        .pipe(
          map((result: boolean) =>
            result ? { emailAlreadyExists: true } : null
          )
        );
    };
  }

  static equalsEmail(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = control.value;
      const otherValue = control.parent.get(otherControlName)?.value;
      if (thisValue === otherValue) {
        return null;
      }

      return {
        equals: true,
      };
    };
  }
}
