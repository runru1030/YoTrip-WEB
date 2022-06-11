import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "utils/firebase/app";

export const getUser = async (uid: string) => {
  try {
    const ref = await getDoc(doc(db, "User", uid));
    return ref as DocumentSnapshot<DocumentData>;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (uid: string) => {
  try {
    const res = await setDoc(doc(db, "User", uid), {
      uid,
      nickname: "",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async ({
  uid,
  updateInfo,
}: {
  uid: string;
  updateInfo: any;
}) => {
  try {
    const ref = doc(db, "User", uid);
    await updateDoc(ref, {
      ...updateInfo,
    });
    return ref as DocumentReference<DocumentData>;
  } catch (error) {
    console.error(error);
  }
};
