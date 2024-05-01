import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MusicService } from "../../../services/data.service";
import { MemberModel } from "../../../models/member-model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-members",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./members.component.html",
  styleUrl: "./members.component.css",
})
export class MembersComponent implements OnInit {
  public constructor(private musicService: MusicService,private title: Title) {}
  public members: MemberModel[];

  public async ngOnInit(): Promise<void> {
    this.members = await this.musicService.getAllMembers();
    this.title.setTitle("TRIOT | Members");
  }
}
