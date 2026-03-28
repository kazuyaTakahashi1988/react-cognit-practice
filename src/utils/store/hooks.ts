import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "./index";
import type { TypeStore } from "../../lib/types";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<TypeStore>();
