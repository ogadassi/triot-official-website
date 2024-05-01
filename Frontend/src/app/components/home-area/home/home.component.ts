import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  public constructor(private title: Title) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.title.setTitle("TRIOT | Home");
    } catch (err: any) {
      alert(err.message);
    }
  }
}
