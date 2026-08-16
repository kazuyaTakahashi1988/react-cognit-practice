import { useState } from "react";

import { verifyHelper } from "../../../utils/authHelper";

import type { VerifyValues } from "../../../lib/types";

const defaultErrorMessage = "Verify に失敗したよ...";

export const useVerification = (onSuccess: () => void) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const resetMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const submit = async (data: VerifyValues) => {
    resetMessages();
    setIsSubmitting(true);

    try {
      await verifyHelper(data);
      onSuccess();
      setSuccessMessage("Verify 完了、Sign In できるよ！");
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
