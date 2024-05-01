import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SongModel } from "../models/song-model";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { UserModel } from "../models/user-model";
import { appStore } from "../../redux/Store";

import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../models/CredentialsModel";
import { authActionCreators } from "../../redux/AuthSlice";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private timerId: any;

  public constructor(private http: HttpClient) {
    const token = sessionStorage.getItem("token");
    if (token) {
      const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
      appStore.dispatch(authActionCreators.login(loggedInUser));
    }
  }
  public async register(user: UserModel): Promise<void> {
    const observable = this.http.post<string>(appConfig.registerUrl, user);
    const token = await firstValueFrom(observable);
    const registeredUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActionCreators.register(registeredUser));
    sessionStorage.setItem("token", token);
    this.timerId = setTimeout(() => {
      alert("Session timed out");
      this.logout();
    }, 18000000);
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const observable = this.http.post<string>(appConfig.loginUrl, credentials);
    const token = await firstValueFrom(observable);
    const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActionCreators.login(loggedInUser));
    sessionStorage.setItem("token", token);

    this.timerId = setTimeout(() => {
      alert("Session timed out");
      this.logout();
    }, 18000000);
  }
  public logout(): void {
    appStore.dispatch(authActionCreators.logout());
    sessionStorage.removeItem("token");
    clearTimeout(this.timerId);
  }
}
