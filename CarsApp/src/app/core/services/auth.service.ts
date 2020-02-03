import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isAuth: boolean;
  token: string;

  isAuthChanged = new Subject<boolean>();
  constructor(private dbAuth: AngularFireAuth, private router: Router) {}

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

  signUp(email: string, password: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigate(["/auth/signin"]);
        console.log(data);
      })
      .catch(err => console.error(err));
  }

  signin(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.dbAuth.auth
        .currentUser
        .getIdToken()
        .then((token: string) => {
          this.token = token;
          sessionStorage.setItem('authtoken', this.token);
        })
        this.router.navigate(["/"]);
        console.log(data);
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.dbAuth.auth.signOut();
    this.router.navigate(["/"]);
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }

  getToken() {
    this.token = sessionStorage.getItem('authtoken');
    return this.token;
  }
  
  isAuth(): boolean{
    return this.token != null;
  }
}
