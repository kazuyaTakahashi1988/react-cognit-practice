import { useState } from "react";

import { signOutHelper, useAuth } from "../../../utils/authHelper";

const defaultErrorMessage = "Sign Out に失敗したよ...";

export const useSignOut = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshAuthState } = useAuth();

  const submit = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signOutHelper();
      refreshAuthState();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : defaultErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { errorMessage, isSubmitting, submit };
};
