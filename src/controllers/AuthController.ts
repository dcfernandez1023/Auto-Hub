import firebase from "firebase";
import { json } from "../custom_types/json";
const firebaseApp = require('../dal/firebaseapp.ts');
const AUTH = firebaseApp.app.auth();

class AuthController {
    public static googleSignIn(callback: Function, onError: Function): void {
        var provider: any = new firebase.auth.GoogleAuthProvider();
        AUTH.signInWithPopup(provider).then((result: json) => {
            callback();
        }).catch((error: any) => {
            onError(error);
        });
    }

    public static standardRegister(email: string, password: string, callback: Function, onError: Function): void {
        AUTH.createUserWithEmailAndPassword(email, password)
		.then((user: json) => {
			return;
		}).catch((error: any) => {
			alert(error.message);
		});
    }

    public static standardLogin(email: string, password: string, callback: Function, onError: Function): void {
        AUTH.signInWithEmailAndPassword(email, password)
		.then((user: json) => {
			return;
		}).catch((error: any) => {
			alert(error.message);
		});
    }

    public static signout(): void {
        AUTH.signOut().then((result: json) => {
            window.location.pathname = "/";
        }).catch((error: any) => {
            alert(error.message);
        });
    }

    public static isUserSignedIn(callback: Function): void {
        AUTH.onAuthStateChanged((user: any) =>  {
            callback(user);
        });
    }
}

export { AuthController };