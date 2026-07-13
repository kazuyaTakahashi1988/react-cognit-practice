import { useSelector } from "react-redux";
import styled from "styled-components";

import Input from "../../../components/form/input";
import SwitchButton from "../../../components/form/switchButton";
import Layout from "../../../components/layouts/layout";
import { color, media } from "../../../lib/style";
import { exampleFlagSet, exampleStringSet, store } from "../../../utils/storeHelper";

import type { TypeSelectorState } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * StoreExample ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Store Example",
  description: "ストアの更新と取得・表示の操作を確認できるサンプルページです。",
  sharePath: "/example/store_example",
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
  // noindex: boolean,
};

const StoreExample: React.FC = () => {
  // ストアの値を取得
  const currentExampleString = useSelector((state: TypeSelectorState) => state.exampleString);
  const currentExampleFlag = useSelector((state: TypeSelectorState) => state.exampleFlag);

  return (
    <Layout pageMeta={pageMeta} type="example">
      <Styled>
        <h1>
          <span>
            StoreExample
            <br />
            <small>：redux-toolkit</small>
          </span>
        </h1>

        {/* --------------------------------------
         * ストア - exampleString のテスト
         * --------------------------------------- */}
        <div className="mt-30 clm">
          <h4>ストア - exampleString の更新</h4>

          {/* インプット項目 */}
          <Input
            className="mt-30"
            onChange={(e) => {
              // ストアの値を更新
              store.dispatch(exampleStringSet(e.target.value));
            }}
            placeholder="入力をお願いします。"
          />

          <p className="mt-30">
            <b>値を表示：</b>[{currentExampleString}]
          </p>
        </div>

        {/* --------------------------------------
         * ストア - exampleFlag のテスト
         * --------------------------------------- */}
        <div className="mt-30 clm">
          <h4>ストア - exampleFlag の更新</h4>

          {/* スイッチボタン項目 */}
          <SwitchButton
            className="mt-30"
            onChange={(e) => {
              // ストアの値を更新
              store.dispatch(exampleFlagSet(e.target.checked));
            }}
            options={[{ value: "", label: "noActive", labelActived: "Active" }]}
          />

          <p className="mt-30">
            <b>値を表示：</b>[{!currentExampleFlag ? "false" : "true"}]
          </p>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
    margin-top: 30px;
  }
  .clm {
    padding: 40px;
    border-radius: 12px;
    border: 1px solid ${color.gray200};
  }

  /* ---------------------------------------------- 
    "lib/style/_variable" 試し書き
  ---------------------------------------------- */
  color: ${color.black};

  // @media (min-width: 769px){ ・・・ } の内容が記述できるよ
  ${media.pc} {
  }

  // @media (max-width: 1080px){ ・・・ } の内容が記述できるよ
  ${media.tab} {
  }

  // @media (max-width: 768px){ ・・・ } の内容が記述できるよ
  ${media.sp} {
  }
`;

export default StoreExample;
