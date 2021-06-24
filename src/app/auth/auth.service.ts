import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {map, tap} from "rxjs/operators";

interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
interface UserData{
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminId = 'SOz168kW93V2W2xZ7Bl322y9fi52';
  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isUserAuthenticated() {
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(
      map((user) => {
        if(user){
          return !!user.token;
        }else{
          return false;
        }
      })
    );
  }

  getString(): string{
    // eslint-disable-next-line no-underscore-dangle
    return this._user.value.id;
  }

  get userId(){
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(
      map((user) => {
        if(user){
          return user.id;
        }else{
          return null;
        }
      })
    );
  }

  register(user: UserData){
    // eslint-disable-next-line no-underscore-dangle
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email: user.email,password:user.password, returnSecureToken: true})
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const user=new User(userData.localId, userData.email, userData.idToken, expirationTime);
          // eslint-disable-next-line no-underscore-dangle
          this._user.next(user);
        })
      );
  }

  logIn(user: UserData) {
    // eslint-disable-next-line no-underscore-dangle
    this._isUserAuthenticated = true;
    // eslint-disable-next-line max-len
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {email: user.email, password: user.password, returnSecureToken: true})
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const user=new User(userData.localId, userData.email, userData.idToken, expirationTime);
          // eslint-disable-next-line no-underscore-dangle
          this._user.next(user);
        })
      );
  }

  logOut() {
    // eslint-disable-next-line no-underscore-dangle
    this._user.next(null);
  }

  isAdminLogged(): boolean{
    if(this.adminId === this.getString()){
      return true;
    }
    return false;
  }

}
