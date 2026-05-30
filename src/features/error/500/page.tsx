import styled from "styled-components";

import Layout from "../../../components/layouts/layout";

import type React from "react";

/* -----------------------------------------------
 * 500 ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "500 Internal Server Error",
  description: "サーバー内部エラーが発生しました。",
  sharePath: "/error/500",
  noindex: true, // SEO評価が無用なため noindex を指定
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
};

const Error500: React.FC = () => {
  return (
    <Layout pageMeta={pageMeta} type="example">
      <Styled>
        <h1>500 Internal Server Error</h1>
        <p className="mt-30">サーバー内部エラーが発生しました。</p>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  text-align: center;
  > .mt-30 {
    margin-top: 30px;
  }
`;

export default Error500;
