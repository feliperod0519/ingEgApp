import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { transformPromiseToObservable } from '../tools/observables'
import { Usuario } from '../models/usuario.model';
import { Firestore, doc, getFirestore, addDoc, collection, setDoc  } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment.development'
import { set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;

  constructor(public auth: Auth, private firestore: Firestore) { 
    this.initAuthListener();
    
  }

  initAuthListener(){
    this.auth.onAuthStateChanged(user => {
      if (user?.uid){
        console.log(`token: ${this.auth.currentUser?.getIdToken()}`);
        this.auth.currentUser?.getIdToken().then(token => { 
          this.isAuthenticated = true;
          console.log(token);
        } ); 
      }
      else{      
        this.isAuthenticated = false;
        console.log('not logged in');
      }
    });
  }

  crearUsuario(newUser : {nombre:string, email:string, password:string}) {
    return createUserWithEmailAndPassword(this.auth,newUser.email,newUser.password).then(credenciales => {
      const newUserInner = new Usuario(credenciales.user?.uid || '', newUser.nombre, credenciales.user?.email || '', 'assets/img/default.gif');
      const app = initializeApp(environment.firebase);
      const db = getFirestore(app);
      const ref = doc(db, 'users', newUserInner.uid);
      return setDoc(ref, {...newUserInner});
    });
  }

  loginUser(userToBeLoggedIn : {email:string, password:string}): Observable<UserCredential>{
    return transformPromiseToObservable(signInWithEmailAndPassword(this.auth,userToBeLoggedIn.email,userToBeLoggedIn.password));
  }

  logout():Promise<void>{
    return signOut(this.auth);
  }
}
