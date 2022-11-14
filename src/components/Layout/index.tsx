import React, { ReactComponentElement, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullSearch from "../SearchPolicy/FullSearch";
import SearchByFields from "../SearchPolicy/SearchByFields";
import SearchResults from "../SearchPolicy/SearchResults";
import PolicyManualInsert from "../PolicyManualInsert";
import NewClaim from "../NewClaim";

import { Layout } from "antd";
import { urls } from "../../config/const";

import Sider from "./Sider";
import Header from "./Header";
import styled from "styled-components";

import "antd/dist/antd.css";

const { Content } = Layout;

const LayoutStyled = styled(Layout)`
  height: 100vh;
  z-index: 1;
`;

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const AppLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  return (
    <LayoutStyled>
      <BrowserRouter>
        <Sider />
        <Layout>
          <Header />
          <Content>
            <Routes>
              <Route path={urls.home} element={<div>home...</div>} />
              <Route
                path={urls.policy_searchFulltext}
                element={
                  <>
                    <FullSearch />
                    <SearchResults />
                  </>
                }
              />
              <Route
                path={urls.policy_searchByfields}
                element={
                  <>
                    <SearchByFields />
                    <SearchResults />
                  </>
                }
              />
              <Route path={urls.policy_manualInsert} element={<PolicyManualInsert />} />
              <Route path={urls.new_claim} element={<NewClaim />} />
            </Routes>

            {children}
          </Content>
        </Layout>
      </BrowserRouter>
    </LayoutStyled>
  );
};

export default AppLayout;
