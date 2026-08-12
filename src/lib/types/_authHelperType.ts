export type AuthInitializationError = {
  message: string;
  name: string;
};

export type AuthState =
  | { status: "anonymous" }
  | { error: AuthInitializationError; status: "error" }
  | { status: "authenticated" }
  | { status: "checking" };

export type AuthContextValue = {
  authState: AuthState;
  /** @deprecated Prefer authState.status. */
  isChecking: boolean;
  /** @deprecated Prefer authState.status. */
  isSignedIn: boolean;
  refreshAuthState: () => void;
};

export type SignInValues = { email: string; password: string };
export type SignInResult = {
  isSignedIn: boolean;
  nextStep?: { signInStep?: string; additionalInfo?: Record<string, unknown> };
};
export type SignUpValues = { email: string; password: string };
export type SignUpResult = {
  isSignUpComplete?: boolean;
  nextStep?: {
    signUpStep?: string;
    codeDeliveryDetails?: {
      attributeName?: string;
      deliveryMedium?: string;
      destination?: string;
    };
  };
};
export type VerifyValues = { verificationCode: string; email: string };
