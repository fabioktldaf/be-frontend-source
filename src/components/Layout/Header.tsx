import React, { useState } from "react";
import { Layout } from "antd";
import LanguageSelect from "./LaguageSelect";

import styled from "styled-components";
import { ButtonConfirm } from "./Buttons";
import AzureAD from "../Authentication/AzureAD";

const HeaderStyled = styled(Layout.Header)`
  background-color: #fff;
  position: relative;
  z-index: 2;
  padding: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 3em;
  border-left: 1px solid #eee;
`;

const Shadow = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 5px 0 5px #aaa;
  z-index: 1;
  background-color: #fff;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <Content>
        <AzureAD />
      </Content>
      <Shadow />
    </HeaderStyled>
  );
};

export default Header;
