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

const getTodayDate = () => {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
};

export type ClaimDataPolicyType = {
  numero_polizza: string;
  data_effetto: string;
  data_scadenza: string;
};

export type ClaimDataSubjetcPersonType = {
  nome: string;
  cognome: string;
  codice_fiscale: string;
  provincia_residenza: string;
  comune_residenza: string;
};
export type ClaimDataSubjetcCompanyType = {
  ragione_sociale: string;
  partita_iva: string;
  provincia_sede_legale: string;
  comune_sede_legale: string;
};

export type ClaimDataSubjetcType = {
  persona_fisica?: ClaimDataSubjetcPersonType;
  persona_giuridica?: ClaimDataSubjetcCompanyType;
};

export type ClaimDataType = {
  numero_sinistro?: string;

  polizza: ClaimDataPolicyType;
  proprietario: ClaimDataSubjetcType;
  contraente?: ClaimDataSubjetcType;
};

type NewClaimProps = {
  claim: ClaimDataType;
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
  const [claim, setClaim] = useState<ClaimDataType>(props.claim);

  return (
    <FormContainer layout="vertical">
      <Header policy_number={claim.numero_sinistro!} />
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
