import React, { useState } from "react";
import { Button, Row, Tabs, Tooltip } from "antd";
import { HiOutlineSave } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { FormContainer, FormTitle, FormContent, FormActions, FormActionButton, FormSendButton } from "../../style/form";
import { CenteredRow } from "../../style/containers";
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

const PolicyNumberStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1em;
`;

const PolicyNumberCopyStyled = styled(MdContentCopy)`
  margin-left: 0.5em;
  cursor: pointer;
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
  numero_polizza: string;
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

type HeaderProps = {
  policy_number: string;
};

const Header = (props: HeaderProps) => {
  return (
    <FormTitle>
      Apertura Sinistro
      <PolicyNumberStyled>
        N° {props.policy_number}{" "}
        <Tooltip title={"Clicca per copiare il numero di polizza"}>
          <PolicyNumberCopyStyled onClick={() => navigator.clipboard.writeText(props.policy_number)} />
        </Tooltip>
      </PolicyNumberStyled>
      <FormActions>
        <FormActionButton icon={<SaveIconStyled />} size="small">
          Salva
        </FormActionButton>
      </FormActions>
    </FormTitle>
  );
};

const NewClaim = (props: NewClaimProps) => {
  const [claim, setClaim] = useState<ClaimDataType>({
    numero_polizza: "AB-12345789",
    codice_compagnia: props.claim.company_code,
    codice_ramo: props.claim.codice_ramo,
    codice_ramo_sinistro: props.claim.codice_ramo_sinistro,
    numero_sinistro: getNewClaimNumber(),
    data_registrazione: getTodayDate(),
  });

  return (
    <FormContainer layout="vertical">
      <Header policy_number={claim.numero_sinistro} />
      <FormContent>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <Tabs.TabPane tab="Dati Sinistro" key="1">
            <ClaimData claim={claim} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Responsabilità" key="2">
            <Responsability isCard={true} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Partite" key="3">
            <DamagedPart />
            <NotDamagedPart />
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
