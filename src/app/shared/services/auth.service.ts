import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import { from, map, Observable, of } from 'rxjs';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { userData, userInfo } from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginEmailInvalid: boolean = false;
  infoUser: userInfo | null = null;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  /* datosUsuario() {
    const auth = getAuth();
    const user = auth.currentUser;
    const userInfo: userInfo = {
      displayName: user!.displayName,
      email: user!.email,
      photoURL: user!.photoURL,
    };
    return userInfo;
  } */
  datosUsuario(): Observable<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    const userInfo = {
      // displayName: user!.displayName,
      // email: user!.email,
      // photoURL: user!.photoURL,
    };
    /* if (userInfo) {
      return of(userInfo);
    }
    return of(null); */
    return of(user);
  }

  registerUser(newUser: userData) {
    const { email, password, displayName } = newUser;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        userCred.user?.updateProfile({
          displayName,
          photoURL: 'assets/img/default-user.png',
        });
      })
      .then(() => {
        this.loginAuth('email', email, password);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  options: any = {
    google: () =>
      this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()),
    facebook: () =>
      this.auth.signInWithRedirect(
        new firebase.auth.FacebookAuthProvider().setCustomParameters({
          auth_type: 'rerequest',
        })
      ),
    email: (email: string, password: string) =>
      this.loginWithEmail(email, password),
  };

  loginAuth(provider: string, email?: string, password?: string) {
    const option = this.options[provider];
    if (option) {
      option(email, password);
    } else {
      console.log('Otro servicio');
    }
  }

  loginWithEmail(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loginEmailInvalid = false;
        this.router.navigate(['']);
      })
      .catch(() => (this.loginEmailInvalid = true));
  }

  verificarEmailInFirebase(email: string): Observable<boolean> {
    const auth = getAuth();
    return from(fetchSignInMethodsForEmail(auth, email)).pipe(
      map((signInMethods) => signInMethods.length > 0)
    );
  }
}
