export type AuthContextValue = {
  isChecking: boolean;
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
