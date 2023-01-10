import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
