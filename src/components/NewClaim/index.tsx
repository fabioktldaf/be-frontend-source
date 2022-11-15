import React, { useState } from "react";
import { Button, Row, Tabs } from "antd";
import { HiOutlineSave } from "react-icons/hi";
import { FormContainer, FormTitle, FormContent, FormActions, FormActionButton, FormSendButton } from "../../style/form";
import { CenteredRow } from "../../style/containers";
import Barem from "./Barem";
import CardData from "./CardData";
import Responsability from "./Responsability";
import ClaimData from "./ClaimData";
import AffectedThing from "./AffectedThing";
import AffectedVehicle from "./AffectedVehicle";
import DamagedPart from "./DamagedPart";
import NotDamagedPart from "./NotDamagedPart";
import styled from "styled-components";

const SaveIconStyled = styled(HiOutlineSave)`
  font-size: 1.2em;
  color: #555;
  margin: -3px 0.25em 0 0;
`;

const getNewClaimNumber = () => Date.now().toString();

const getTodayDate = () => {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
};

export type ClaimDataType = {
  codice_compagnia: string;
  codice_ramo: string;
  codice_ramo_sinistro: string;
  numero_sinistro: string;
  data_registrazione: string;
};

type NewClaimProps = {
  claim: {
    company_code: string;
    codice_ramo: string;
    codice_ramo_sinistro: string;
  };
};

const NewClaim = (props: NewClaimProps) => {
  const [claim, setClaim] = useState<ClaimDataType>({
    codice_compagnia: props.claim.company_code,
    codice_ramo: props.claim.codice_ramo,
    codice_ramo_sinistro: props.claim.codice_ramo_sinistro,
    numero_sinistro: getNewClaimNumber(),
    data_registrazione: getTodayDate(),
  });

  return (
    <FormContainer layout="vertical">
      <FormTitle>
        Apertura Sinistro
        <FormActions>
          <FormActionButton icon={<SaveIconStyled />} size="small">
            Salva
          </FormActionButton>
        </FormActions>
      </FormTitle>
      <FormContent>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <Tabs.TabPane tab="Dati Sinistro" key="1">
            <ClaimData claim={claim} />
            <CardData />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Responsabilità" key="2">
            <Barem />
            <Responsability />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Partite" key="3">
            <DamagedPart />
            <NotDamagedPart />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Colpiti" key="4">
            <AffectedVehicle />
            <AffectedThing />
          </Tabs.TabPane>
        </Tabs>
      </FormContent>
      <CenteredRow>
        <FormSendButton type="primary" size="large">
          Invia
        </FormSendButton>
      </CenteredRow>
    </FormContainer>
  );
};

export default NewClaim;
