import { Component, OnInit } from "@angular/core";
import { appStore } from "../../../../redux/Store";
import { UserModel } from "../../../models/user-model";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { CredentialsModel } from "../../../models/CredentialsModel";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  public user: UserModel;
  public credentials = new CredentialsModel();

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (appStore.getState().user) this.user = appStore.getState().user;
  }
  public async send(): Promise<void> {
    try {
      await this.authService.login(this.credentials);
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      alert(err.error);
    }
  }
}
