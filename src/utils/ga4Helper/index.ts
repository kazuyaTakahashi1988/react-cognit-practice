import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

/* -----------------------------------------------
 * Google Analytics（GA4）関連の処理
 * ----------------------------------------------- */

// GA4 計測ID
export const GA_MEASUREMENT_ID = import.meta.env.VITE_APP_GA_MEASUREMENT_ID ?? "";

/*
 * GA4 初期化処理（アプリ起動時に呼ぶ）
 */
export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

/*
 * GA4 PV計測処理（ルーティング設定で呼ぶ）
 */
export const usePageTracking = () => {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current || !GA_MEASUREMENT_ID) {
      isFirst.current = false;
      return;
    }
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
};
