import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"; //auth state에 대한 변경점을 감지
import { useRouter } from "next/router";
import {
  IUserInfo,
  selectUserInfoState,
  setLoggedIn,
} from "./slices/userSlice";
import { AppThunkDispatch } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "utils/firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const { isLoggedIn } = useSelector(selectUserInfoState);
  const dispatch = useDispatch<AppThunkDispatch>();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbUser: any = await getDoc(doc(db, "User", user.uid));
        if (!dbUser.data()) {
          /* 새 사용자 */
          const docData = {
            uid: user.uid,
            nickname: "",
          };
          //사용자 추가
          await setDoc(doc(db, "User", user.uid), docData);
          dispatch(setLoggedIn({ uid: user.uid, nickname: "" }));
          // 닉네임 설정
          router.push("/setInfo");
        } else {
          dispatch(
            setLoggedIn({ uid: user.uid, nickname: dbUser.data().nickname })
          );
          if (!dbUser.data().nickname) {
            router.push("/setInfo");
          }
        }
        // const idToken = await user.getIdToken();
        setUser(user);
        if (router.pathname === "/") {
          router.push("/main");
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = await res.user.getIdToken();
      return { res, isAuth: true, accessToken };
    } catch (e) {
      const error = e as any;
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "유효하지 않은 이메일입니다.";
          break;
        case "auth/user-disabled":
          errorMessage = "사용이 중지된 유저입니다.";
          break;
        case "auth/user-not-found":
          errorMessage = "유저를 찾을 수 없습니다.";
          break;
        case "auth/wrong-password":
          errorMessage = "비밀번호가 틀렸습니다.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      return { isAuth: false, errorMessage };
    }
  };

  const logout = async () => {
    setUser(null);
    signOut(auth).then(async () => {
      router.push("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signInGoogle, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
