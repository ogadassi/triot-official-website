import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { CommentModel } from "../3-models/comment-model";
import { UserModel } from "../3-models/user-model";

class CommentsService {
  public async getAllUsers(): Promise<UserModel[]> {
    const sql = `select * from users`;
    const users = await dal.execute(sql);
    return users;
  }
  public async getCommentsByUserId(userId: number): Promise<CommentModel[]> {
    const sql = `select * from comments where userId = ?`;
    const comments = await dal.execute(sql, [userId]);
    return comments;
  }
  public async getCommentsBySongId(songId: number): Promise<CommentModel[]> {
    const sql = `select * from comments where songId = ?`;
    const comments = await dal.execute(sql, [songId]);
    return comments;
  }

  public async addComment(comment: CommentModel): Promise<CommentModel> {
    comment.validateInsert();
    const sql = `insert into comments(message,userId,songId) values(?,?,?)`;
    const info: OkPacketParams = await dal.execute(sql, [
      comment.message,
      comment.userId,
      comment.songId,
    ]);
    comment.id = info.insertId;
    return comment;
  }

  public async deleteComment(id: number): Promise<void> {
    const sql = `DELETE FROM comments WHERE id = ${id}`;
    const info: OkPacketParams = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

export const commentsService = new CommentsService();
