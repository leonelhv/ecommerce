import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';

import { from, map, Observable, of } from 'rxjs';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { userData, userInfo } from 'src/app/interfaces/auth.interface';
import { collection } from '@firebase/firestore';
import { addDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';

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

  datosUsuario(): Observable<userInfo> {
    const auth = getAuth();
    const user = auth.currentUser;
    const userInfo: userInfo = {
      displayName: user!.displayName,
      email: user!.email,
      photoURL: user!.photoURL,
    };
    return of(userInfo);
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
        const objUser = {
          email,
          rol: 'user',
        };
        const userRef = collection(this.firestore, 'users');

        addDoc(userRef, objUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  async isRolUser(email: string) {
    // const userRef = collection(this.firestore, 'users');

    const docRef = doc(this.firestore, 'users', `${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
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
        this.router.navigate(['/']);
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
