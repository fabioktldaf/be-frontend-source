import React, { useState } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import SideMenu from "./SideMenu";

import styled from "styled-components";

const SiderStyled = styled(Layout.Sider)`
  background-color: white;
  box-shadow: 0 0 5px #aaa;
  z-index: 1;
`;

const CollapseStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 1em 1.6em;
  cursor: pointer;
`;

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SiderStyled trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <CollapseStyled onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </CollapseStyled>
      <SideMenu />
    </SiderStyled>
  );
};

export default Sider;
