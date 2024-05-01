import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { MemberModel } from "../3-models/member-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class MembersService {
  public async getAllMembers(): Promise<MemberModel[]> {
    const sql = `SELECT *,CONCAT(?, imageName) as imageUrl FROM members`;
    const members = await dal.execute(sql, [appConfig.baseImageUrl]);
    return members;
  }

  public async getOneMember(id: number): Promise<MemberModel> {
    const sql = `select *,CONCAT(?, imageName) as imageUrl from members where id = ?`;
    const members = await dal.execute(sql, [appConfig.baseImageUrl, id]);
    if (!members[0]) throw new ResourceNotFoundError(id);
    return members[0];
  }

  public async addMember(member: MemberModel): Promise<MemberModel> {
    member.validateInsert();
    const imageName = await fileSaver.add(member.image);
    const sql = `insert into members(firstName, lastName, bio, part, imageName)
    values(?,?,?,?,?)`;
    const info: OkPacketParams = await dal.execute(sql, [
      member.firstName,
      member.lastName,
      member.bio,
      member.part,
      imageName,
    ]);
    member = await this.getOneMember(info.insertId);

    return member;
  }

  public async deleteMember(id: number): Promise<void> {
    const sql = `DELETE FROM members WHERE id = ${id}`;
    const info: OkPacketParams = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

export const membersService = new MembersService();
