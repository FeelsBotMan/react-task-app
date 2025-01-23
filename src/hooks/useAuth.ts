import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useTypedDispatch, useTypedSelector } from "./redux";
import { clearUser, setUser } from "../store/slices/userSlice";

interface AuthHook {
    isAuth: boolean;
    id: string | null;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
    handleSignIn: () => Promise<void>;
    handleSignOut: () => Promise<void>;
}

export function useAuth(auth = getAuth(app), provider = new GoogleAuthProvider()): AuthHook {
    const dispatch = useTypedDispatch();
    const { id, email, displayName, photoURL } = useTypedSelector((state) => state.user);

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);
            dispatch(setUser({
                email: userCredential.user.email,
                id: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL
            }));
        } catch (error) {
            console.error("로그인 오류:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSignOut = async () => {
        if (window.confirm("정말로 로그아웃하시겠습니까?")) {
            try {
                await signOut(auth);
                dispatch(clearUser());
            } catch (error) {
                console.error("로그아웃 오류:", error);
            }
        }
    };

    return {
        isAuth: !!email && !!id,
        id,
        email,
        displayName,
        photoURL,
        handleSignIn,
        handleSignOut,
    };
}
