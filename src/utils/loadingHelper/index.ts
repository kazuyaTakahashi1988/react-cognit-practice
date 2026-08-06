import { loadingFlagDown, loadingFlagUp, store } from "../storeHelper";

/* -----------------------------------------------
 * グローバルローディング制御
 *
 * 画面全体の操作を止める必要がある処理だけで使用する。
 * API クライアントは表示方法を決めず、呼び出し側が明示的に選択する。
 * ----------------------------------------------- */

const createLoadingScope = () => {
  store.dispatch(loadingFlagUp());

  let isClosed = false;
  return () => {
    if (isClosed) return;

    isClosed = true;
    store.dispatch(loadingFlagDown());
  };
};

/*
 * 非同期処理の開始・終了を1セットで保証する
 */
export const withGlobalLoading = async <T>(
  task: () => Promise<T>,
): Promise<T> => {
  const closeLoading = createLoadingScope();

  try {
    return await task();
  } finally {
    closeLoading();
  }
};
