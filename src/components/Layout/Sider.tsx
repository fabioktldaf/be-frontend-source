import React, { useState } from "react";
import { Layout } from "antd";

import Logo from "./Logo";
import SideMenu from "./SideMenu";

import styled from "styled-components";

const SiderStyled = styled(Layout.Sider)`
  background-color: white;
  box-shadow: 0 0 5px #aaa;
  z-index: 1;
`;

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Sider: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SiderStyled>
      <Logo />
      <SideMenu />
    </SiderStyled>
  );
};

export default Sider;
