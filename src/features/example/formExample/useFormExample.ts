import { useNavigate } from "react-router-dom";

import { testPostApi } from "../../../utils/apiHelper";
import { useGlobalLoading } from "../../../utils/storeHelper";

import type { FormExampleValues } from "./type";

export const useFormExample = () => {
  const navigate = useNavigate();
  const { runWithGlobalLoading } = useGlobalLoading();

  const submit = async (data: FormExampleValues) => {
    const result = await runWithGlobalLoading(() => testPostApi(data));

    if (!result.ok || result.response.status !== 200) {
      navigate("/error/500", { replace: true });
    }
  };

  return { submit };
};
