import { Injectable } from '@angular/core'
import * as firebase from 'firebase';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    signUp(email: string, password: string){
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }

    signin(email: string, password: string){
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }
}