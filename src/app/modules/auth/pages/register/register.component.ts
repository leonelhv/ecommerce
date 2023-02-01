import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { userData } from 'src/app/interfaces/auth.interface';
import { EmailValidator } from 'src/app/shared/customValidators/Email.validator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { regexEmail } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  registerForm = this.fb.group({
    correo: [
      '',
      [Validators.required, Validators.pattern(regexEmail)],
      [EmailValidator.existEmail(this.authService)],
    ],
    correo2: ['', [Validators.required, EmailValidator.equalsEmail('correo')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', [Validators.required]],
  });
  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  registerUser() {
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    const newUser: userData = {
      displayName: this.form['name'].value,
      email: this.form['correo'].value,
      password: this.form['password'].value,
    };
    this.authService.registerUser(newUser);
  }
  campoNoValido(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }
}
