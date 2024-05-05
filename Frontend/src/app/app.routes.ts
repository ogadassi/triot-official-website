import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home-area/home/home.component";
import { DataListComponent } from "./components/data-area/data-list/data-list.component";

import { MembersComponent } from "./components/data-area/members/members.component";
import { SongDetailsComponent } from "./components/data-area/song-details/song-details.component";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { RegisterComponent } from "./components/auth-area/register/register.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "songs", component: DataListComponent },
  { path: "songs/details/:id", component: SongDetailsComponent },
  { path: "members", component: MembersComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];
