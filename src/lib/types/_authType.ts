/* -------------------------------------------------------
    ▽ 型定義 (Auth編) ▽
---------------------------------------------------------- */
// AuthProvider
export type TypeAuthContext = { isSignedIn: boolean; refreshAuthState: () => void };

// SignIn
export type TypeSignInValues = { email: string; password: string };
export type TypeSignInResult = {
  isSignedIn: boolean;
  nextStep?: { signInStep?: string; additionalInfo?: Record<string, unknown> };
};

// SignUp
export type TypeSignUpValues = { email: string; password: string };
export type TypeSignUpResult = {
  isSignUpComplete?: boolean;
  nextStep?: {
    signUpStep?: string;
    codeDeliveryDetails?: { attributeName?: string; deliveryMedium?: string; destination?: string };
  };
};

// Verification
export type TypeVerifyValues = { verificationCode: string; email: string };
