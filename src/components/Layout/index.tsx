import React, { ReactComponentElement, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullSearch from "../SearchPolicy/FullSearch";
import SearchByFields from "../SearchPolicy/SearchByFields";
import SearchResults from "../SearchPolicy/SearchResults";
import PolicyManualInsert from "../PolicyManualInsert";
import NewClaim from "../NewClaim";

import { Layout } from "antd";
import { Urls } from "../../config/const";

import Sider from "./Sider";
import Header from "./Header";
import styled from "styled-components";

import "antd/dist/antd.css";

const LayoutStyled = styled(Layout)`
  height: 100vh;
  z-index: 1;
`;

const ContentStyled = styled(Layout.Content)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2em 5em;
  overflow: auto;
`;

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const defaultClaimData = {
  company_code: "abc-123_ighriguhreh",
  codice_ramo: "87cgdbcd",
  codice_ramo_sinistro: "ijfapid89",
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
          <ContentStyled>
            <Routes>
              <Route path={Urls.home} element={<div>home...</div>} />
              <Route
                path={Urls.policy_searchFulltext}
                element={
                  <>
                    <FullSearch />
                    <SearchResults />
                  </>
                }
              />
              <Route
                path={Urls.policy_searchByfields}
                element={
                  <>
                    <SearchByFields />
                    <SearchResults />
                  </>
                }
              />
              <Route path={Urls.policy_manualInsert} element={<PolicyManualInsert />} />
              <Route path={Urls.new_claim} element={<NewClaim claim={defaultClaimData} />} />
            </Routes>

            {children}
          </ContentStyled>
        </Layout>
      </BrowserRouter>
    </LayoutStyled>
  );
};

export default AppLayout;
