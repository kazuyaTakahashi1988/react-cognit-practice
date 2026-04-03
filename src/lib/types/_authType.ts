/* -------------------------------------------------------
    ▽ 型定義 (Auth編) ▽
---------------------------------------------------------- */
// AuthProvider
export type TypeAuthContext = { isSignedIn: boolean; refreshAuthState: () => void };

// SignIn
export type TypeSignInValues = { email: string; password: string };

// SignUp
export type TypeSignUpValues = { email: string; password: string };

// Verification
export type TypeVerifyValues = { verificationCode: string; email: string };
