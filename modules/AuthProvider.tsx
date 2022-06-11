import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth"; //auth state에 대한 변경점을 감지
import { createUser, getUser } from "lib/apis/user";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "utils/firebase/app";
import { selectUserInfoState, setLoggedIn } from "./slices/userSlice";
import { AppThunkDispatch } from "./store";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch<AppThunkDispatch>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await axios.post("/api/auth/login", { idToken });

        const dbUser: any = await getUser(user.uid);
        dispatch(
          setLoggedIn({ uid: user.uid, nickname: dbUser.data()?.nickname })
        );

        if (!dbUser.data()) {
          /* 새 사용자 */
          // 닉네임 설정
          await createUser(user.uid);
        }
        if (!dbUser.data() || !dbUser.data().nickname) {
          router.push("/setInfo");
        }
        setUser(user);

        // if (router.pathname === "/") {
        //   router.push("/");
        // }
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
