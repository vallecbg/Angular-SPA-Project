import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IUser } from "src/app/components/shared/models/User.model";
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/components/shared/models/toastr.config';
import { map } from 'rxjs/operators';
import { UserEditModel } from 'src/app/components/shared/models/user-edit.model';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();
  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isAuth() : boolean{
    return this._isAuth;
  }

  initializeAuthState() {
    this.dbAuth.authState.subscribe((userState) => {
      if (userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }

  signUp(email: string, password: string, name: string, mobile: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.pushUserData({email, name, mobile});
        this.toastr.success("Successfully registered!", "Success", ToastrConfig);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  signin(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        localStorage.setItem('email', data.user.email);
        this.toastr.success("Successfully logged in!", "Success", ToastrConfig);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  private pushUserData(user) {

    user.uid = this.getUserId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afDb.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      mobile: user.mobile
    };

    return userRef.set(data);
  }

  getUser(id: string): Observable<IUser> {
    const userDocuments = this.afDb.doc<IUser>('users/' + id);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          return {...data};
        }))
  }

  editUser(user: UserEditModel){
    this.afDb.doc("users/" + user.uid).update(user)
    .then(() => {
      this.toastr.success(
        "Successfully edited user!",
        "Success",
        ToastrConfig
      );
      this.router.navigate(['/user/details', user.uid]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }

  logout() {
    this.dbAuth.auth.signOut()
    .then(() => {
      localStorage.clear();
      this.toastr.success("Successfully logged out!", "Success", ToastrConfig);
      this.router.navigate(["/"]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }
}
