import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Subject, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "src/app/components/shared/models/User.model";
import { switchMap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/components/shared/models/toastr.config';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isAuth: boolean;
  token: string;
  user: Observable<User>;

  isAuthChanged = new Subject<boolean>();
  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user = this.dbAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afDb.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  initializeAuthState() {
    this.dbAuth.authState.subscribe(userdata => {
      if (userdata) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }

  signUp(email: string, password: string, birthDate: Date, name: string, mobile: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.pushUserData({email, birthDate, name, mobile});
        this.toastr.success("Successfully registered!", "Success", ToastrConfig);
        this.router.navigate(["/login"]);
        console.log(data);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  signin(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.dbAuth.auth.currentUser.getIdToken().then((token: string) => {
          this.token = token;
          sessionStorage.setItem("authtoken", this.token);
        });
        this.toastr.success("Successfully logged in!", "Success", ToastrConfig);
        this.router.navigate(["/"]);
        console.log(data);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  private pushUserData(user) {

    user.uid = this.getUserId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afDb.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      mobile: user.mobile
    };

    return userRef.set(data, { merge: true });
  }

  logout() {
    this.dbAuth.auth.signOut().then(() => {
      this.clearToken();
      this.toastr.success("Successfully logged out!", "Success", ToastrConfig);
      this.router.navigate(["/"]);
    });
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }

  getToken() {
    this.token = sessionStorage.getItem("authtoken");
    return this.token;
  }

  clearToken(){
    this.token = null;
    sessionStorage.clear();
  }

  isAuth(): boolean {
    return this.token != null;
  }
}
