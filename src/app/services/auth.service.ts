import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';

import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth, private afsAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onReggister(user:User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      )
    } catch (error) {
      console.log("error on register", error)
    }
  }

  async onLogin(user:User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    } catch (error){
      console.log("error en login",error)
    }
  }

  logInGitUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GithubAuthProvider() );
  }

  logInGoogleUser(){
    return this.afsAuth.auth.sigInWithPopup(new auth.GoogleAuthProvider() );
  }
}
