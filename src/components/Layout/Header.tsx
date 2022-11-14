import React, { useState } from "react";
import { Layout } from "antd";
import LanguageSelect from "./LaguageSelect";

import styled from "styled-components";

const HeaderStyled = styled(Layout.Header)`
  background-color: #333;
  color: #eee;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <LanguageSelect />
    </HeaderStyled>
  );
};

export default Header;
