// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { CommentModel } from "../app/models/comment-model";

// function initAll(
//   currentState: CommentModel[],
//   action: PayloadAction<CommentModel[]>
// ): CommentModel[] {
//   const newState = action.payload;
//   return newState;
// }

// function addComment(
//   currentState: CommentModel[],
//   action: PayloadAction<CommentModel>
// ): CommentModel[] {
//   const newState = [...currentState, action.payload];
//   return newState;
// }

// const commentSlice = createSlice({
//   name: "comment",
//   initialState: null,
//   reducers: { initAll, addComment },
// });

// export const commentActionCreators = commentSlice.actions;
// export const commentReducersContainer = commentSlice.reducer;
