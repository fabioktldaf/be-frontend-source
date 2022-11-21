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
import { FormContainer } from "../../style/form";

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
  numero_sinistro: Date.now().toString(),
  polizza: {
    numero_polizza: "AB-12345789",
    data_effetto: "01/01/2022",
    data_scadenza: "31/12/2022",
  },
  proprietario: {
    persona_fisica: {
      nome: "Mario",
      cognome: "Rossi",
      codice_fiscale: "RSSMRA73L09Z103F",
      provincia_residenza: "Milano",
      comune_residenza: "Rho",
    },
  },
  contraente: {
    persona_giuridica: {
      ragione_sociale: "Acme Inc.",
      partita_iva: "01960170684",
      provincia_sede_legale: "Bologna",
      comune_sede_legale: "Bologna",
    },
  },
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
