import { createGlobalStyle } from "styled-components";

import { media, params } from "./_mixin";

export const GlobalStyle = createGlobalStyle`
  /*=================================
    Global & Initialization of style
  ===================================*/
  html,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 200%;
    text-align: left;
    font-family: "Noto Sans JP", serif; // webフォントは"index.html"にてimport 
    height: 100%;
    width: 100%;
    letter-spacing: 1px;
    word-break: break-all;
    line-break: strict;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow: hidden;
    color: ${params.black};
    background: ${params.white};
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: ${params.black};
  }

  a:hover,
  a:active {
    text-decoration: none;
    opacity: 0.7;
    color: ${params.black};
  }

  figure,
  figcaption,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  form {
    margin: 0;
    padding: 0;
  }

  img,
  a img {
    border: none;
    vertical-align: bottom;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* List_group */
  ul,
  ol,
  li {
    list-style: none;
  }

  /* inline-style */
  address {
    font-style: normal;
    font-size: 12px;
    color: ${params.black};
  }

  address a,
  address a:link,
  address a:visited {
    text-decoration: none;
    color: ${params.black};
  }

  address a:hover,
  address a:active {
    text-decoration: underline;
    color: ${params.black};
  }

  /* table */
  table {
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
  }

  tr,
  th,
  td {
    border: 1px solid;
  }

  *,
  *:before,
  *:after {
    outline: none !important;
    box-sizing: border-box;
  }
  
  input,
  textarea,
  select {
    font-size: 16px;
    background: none;
    font-family: "Noto Sans JP", serif; // webフォントは"index.html"にてimport 
    letter-spacing: 1px;
  }

  ${media.sp} {
    .pc-only {
      display: none!important;
    }
  }

  ${media.pc} {
    .sp-only {
      display: none!important;
    }
  }
`;
