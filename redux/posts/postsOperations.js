import { createAsyncThunk } from "@reduxjs/toolkit";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const getPosts = async () => {
        const posts = [];
        const q = query(
          collection(db, "posts"),
          where("userId", "==", "Ww6C1ZtflHeE0SNqXrb5LmnzHIf1")
        );

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

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, thunkAPI) => {
    try {
      console.log(post);
      //   const resp = await axios.post("/contacts", contact);
      //   return resp.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
