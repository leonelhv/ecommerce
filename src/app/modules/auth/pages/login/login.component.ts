import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { regexEmail } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginEmailInvalid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(regexEmail)]],
    password: ['', Validators.required],
  });

  loginWithEmail() {
    this.authService.loginAuth(
      'email',
      this.form['correo'].value,
      this.form['password'].value
    );
    this.loginEmailInvalid = this.authService.loginEmailInvalid;
  }

  redirectToRegister() {
    this.router.navigateByUrl('/auth/register');
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  campoNoValido(campo: string) {
    return (
      this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched
    );
  }
}
