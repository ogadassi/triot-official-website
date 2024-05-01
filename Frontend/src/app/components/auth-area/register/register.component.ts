import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "../../../models/user-model";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  public user = new UserModel();

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public async send(): Promise<void> {
    try {
      console.log(this.user);
      await this.authService.register(this.user);
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      alert(err.error);
    }
  }
}
