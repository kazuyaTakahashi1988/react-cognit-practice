import { useState } from "react";

import { signInHelper, useAuth } from "../../../utils/authHelper";

import type { SignInValues } from "../../../lib/types";

const defaultErrorMessage = "Sign In に失敗したよ...";

export const useSignIn = (onAdditionalStep: () => void) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshAuthState } = useAuth();

  const resetMessage = () => setErrorMessage("");

  const submit = async (data: SignInValues) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await signInHelper(data);

      if (result.isSignedIn) {
        refreshAuthState();
        return;
      }

      onAdditionalStep();
      setErrorMessage("Sign In にはまだ追加手順（Verify）が必要だよ！");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : defaultErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { errorMessage, isSubmitting, resetMessage, submit };
};
