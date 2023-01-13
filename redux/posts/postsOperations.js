import { createAsyncThunk } from "@reduxjs/toolkit";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (uid, thunkAPI) => {
    try {
      const getPosts = async () => {
        const posts = [];
        const q = query(collection(db, "posts"), where("userId", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        return posts;
      };
      const posts = await getPosts();
      return posts;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, thunkAPI) => {
    try {
      const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        return posts;
      };
      const posts = await getPosts();
      console.log(posts);
      return posts;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, thunkAPI) => {
    try {
      return post;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
