import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';

import { from, map, Observable, of } from 'rxjs';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { userData, userInfo } from 'src/app/interfaces/auth.interface';
import { collection } from '@firebase/firestore';
import {
  addDoc,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginEmailInvalid: boolean = false;
  infoUser: userInfo | null = null;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: Firestore
  ) {}

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
        const objUser = {
          email,
          rol: 'user',
        };
        const userRef = collection(this.firestore, 'users');

        addDoc(userRef, objUser).then(() => {
          this.loginWithEmail(email, password);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
    });
  }

  getRolUser(email: string) {
    const productRef = collection(this.firestore, 'users');
    const colQuery = query(productRef, where('email', '==', email));
    return collectionData(colQuery);
  }

  loginWithEmail(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.loginEmailInvalid = false;
        const { displayName, email, photoURL } = res.user as any;
        const user = {
          displayName,
          email,
          photoURL,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.getRolUser(email).subscribe((res: any) => {
          if (res[0].rol === 'user') {
            this.router.navigate(['/']);
          } else if (res[0].rol === 'admin') {
            this.router.navigate(['dashboard/products']);
          }
        });
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
