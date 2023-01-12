import { fetchPosts, addPost } from "./postsOperations";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
    .addCase(addPost.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    })
    .addCase(addPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const postsReduser = postsSlice.reducer;
