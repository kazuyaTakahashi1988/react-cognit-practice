/* -------------------------------------------------------
    ▽ 型定義 (Auth編) ▽
---------------------------------------------------------- */
// AuthProvider
export type TypeAuthContext = { isSignedIn: boolean; refreshAuthState: () => void };

// SignIn
export type TypeSignIn = { email: string; password: string };

// SignUp
export type TypeSignUp = { email: string; password: string };

// Verification
export type TypeVerify = { verificationCode: string; email: string };
