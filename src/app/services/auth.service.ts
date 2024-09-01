import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { transformPromiseToObservable } from '../tools/observables'
import { Usuario } from '../models/usuario.model';
import { doc, getFirestore, setDoc  } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment.development'
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { setUser, resetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  public isAuthenticated = false;
  private subscription: Subscription = new Subscription();

  constructor(public auth: Auth, private store: Store<AppState>) { 
    this.store.select('user').subscribe(user => { console.log(user); });  
    this.initAuthListener();    
  }

  ngOnInit(): void {
  }

  initAuthListener(){
    this.auth.onAuthStateChanged(user => {
      if (user?.uid){
        //console.log(`token: ${this.auth.currentUser?.getIdToken()}`);
        this.auth.currentUser?.getIdToken().then(token => { 
          this.isAuthenticated = true;
          console.log(this.auth.currentUser);
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
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.store.dispatch(setUser({ user: userToBeLoggedIn.email||'dee_znuts@only-joking.com'}));
    }
    return transformPromiseToObservable(signInWithEmailAndPassword(this.auth,userToBeLoggedIn.email,userToBeLoggedIn.password));
  }

  logout():Promise<void>{
    this.store.dispatch(resetUser());
    return signOut(this.auth);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
