import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { appStore } from "../../../../redux/Store";
import { UserModel } from "../../../models/user-model";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent implements OnInit {
  public windowScrolled = false;
  public user: UserModel;
  private appStoreSubscription: any;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    window.addEventListener("scroll", () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });

    if (appStore.getState().user) this.user = appStore.getState().user;

    this.appStoreSubscription = appStore.subscribe(() => {
      if (appStore.getState().user) this.user = appStore.getState().user;
    });
  }

  ngOnDestroy(): void {
    this.appStoreSubscription.unsubscribe();
  }

  public logMeOut(): void {
    alert(`Bye bye ${this.user.firstName}...`);
    this.authService.logout();
    this.router.navigateByUrl("/home");
    this.user = null;
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
