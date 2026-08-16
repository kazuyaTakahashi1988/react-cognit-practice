import { useState } from "react";

import { signUpHelper } from "../../../utils/authHelper";
import { useGlobalLoading } from "../../../utils/storeHelper";

import type { SignUpValues } from "../../../lib/types";

const defaultErrorMessage = "Sign Up に失敗したよ...";

export const useSignUp = (onSuccess: () => void) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { runWithGlobalLoading } = useGlobalLoading();

  const resetMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const submit = async (data: SignUpValues) => {
    resetMessages();
    setIsSubmitting(true);

    try {
      const result = await runWithGlobalLoading(() => signUpHelper(data));
      const message = result.isSignUpComplete
        ? "Sign Up 成功! Sign In しよう！"
        : "OK！ Verify用のコードをメールで送ったから確認してね！";

      onSuccess();
      setSuccessMessage(message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : defaultErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errorMessage,
    isSubmitting,
    resetMessages,
    submit,
    successMessage,
  };
};
