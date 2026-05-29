import styled from "styled-components";

import Layout from "../../../components/layouts/layout";

import type React from "react";

/* -----------------------------------------------
 * 404 ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "404 Not Found",
  description: "お探しのページは見つかりませんでした。",
  sharePath: "/error/404",
  noindex: true, // SEO評価が無用なためnoindexを指定
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
};

const Error404: React.FC = () => {
  return (
    <Layout pageMeta={pageMeta} type="example">
      <Styled>
        <h1>404 Not Found</h1>
        <p className="mt-30">お探しのページは見つかりませんでした。</p>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  text-align: center;
  .mt-30 {
    margin-top: 30px;
  }
`;

export default Error404;
