import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullSearch from "../SearchPolicy/FullSearch";
import SearchByFields from "../SearchPolicy/SearchByFields";
import SearchResults from "../SearchPolicy/SearchResults";
import PolicyManualInsert from "../PolicyManualInsert";
import { Layout } from "antd";
import { Urls } from "../../config/const";
import Sider from "./Sider";
import Header from "./Header";
import styled from "styled-components";
import { FormContainer } from "../../style/form";
import NewClaimPage from "../../pages/new-claim";

import "antd/dist/antd.css";
import SubjectsData from "../../pages/subjects-data";
import SubjectDetails from "../SubjectsData/SubjectDetails";

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

const AppLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;

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
                  <FormContainer layout="vertical" style={{ padding: "1em 3em" }}>
                    <FullSearch />
                    <SearchResults />
                  </FormContainer>
                }
              />
              <Route
                path={Urls.policy_searchByfields}
                element={
                  <FormContainer layout="vertical" style={{ padding: "1em 3em" }}>
                    <SearchByFields />
                    <SearchResults />
                  </FormContainer>
                }
              />
              <Route path={Urls.policy_manualInsert} element={<PolicyManualInsert />} />
              <Route path={Urls.new_claim} element={<NewClaimPage />} />
              <Route path={Urls.subjects_data} element={<SubjectsData />} />
              <Route path={Urls.subject_details} element={<SubjectDetails />} />
            </Routes>

            {children}
          </ContentStyled>
        </Layout>
      </BrowserRouter>
    </LayoutStyled>
  );
};

export default AppLayout;
