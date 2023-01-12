import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSignOut, authStateChange, updateUserProfile } from "./authSlice";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });

      const { uid, displayName } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOutUser = () => async (dispatch, setState) => {
  signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, setState) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
