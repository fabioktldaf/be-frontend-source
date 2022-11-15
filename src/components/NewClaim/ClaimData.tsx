import React from "react";
import styled from "styled-components";
import { Input, Select, Switch } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormSubTitle } from "../../style/form";
import { ClaimDataType } from "./index";

const ClaimDataStyled = styled.div``;

export const HrStyled = styled.div`
  height: 1px;
  border-top: 1px solid #eee;
  width: 100%;
  margin-bottom: 2em;
`;

type ClaimDataProps = {
  claim: ClaimDataType;
};

const ClaimData = (props: ClaimDataProps) => {
  return (
    <ClaimDataStyled>
      <FormSubTitle>Dati Sinistro</FormSubTitle>
      <Row>
        <FormInput label="Codice Compagnia" name="codice_compagnia" tooltip="Codice della compagnia">
          {props.claim.codice_compagnia}
        </FormInput>
        <RowSpacer />

        <FormInput label="Codice Ramo" name="codice_ramo" tooltip="Codice ramo">
          {props.claim.codice_ramo}
        </FormInput>
      </Row>
      <Row>
        <FormInput label="Codice Ramo Sinistro" name="codice_ramo_sinistro" tooltip="Codice ramo sinistro">
          {props.claim.codice_ramo_sinistro}
        </FormInput>
        <RowSpacer />
        <FormInput label="Numero Sinistro" name="numero_sinistro" tooltip="Numero del sinistro...">
          {props.claim.numero_sinistro}
        </FormInput>
      </Row>
      <Row>
        <FormInput label="Data Registrazione" name="data_registrazione" tooltip="Data di registrazione">
          {props.claim.data_registrazione}
        </FormInput>
        <RowSpacer />
      </Row>
      <HrStyled />
      <Row>
        <FormInput
          label="Data Pervenimento Denuncia"
          name="data_pervenimento_denuncia"
          tooltip="Seleziona la data di pervenimento della denuncia"
          rules={[{ required: true, message: "La data di pervenimento della denuncia è obbligatoria" }]}
        >
          <FormDatePicker placeholder="data di pervenimento della denuncia ..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Data e Ora Accadimento"
          name="data_ora_accadimento"
          tooltip="Seleziona la data e ora di accadimento..."
          rules={[{ required: true, message: "La data e ora di accadimento sono obbligatori" }]}
        >
          <FormDatePicker placeholder="data e ora di accadimento ..." showTime={true} />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Luogo Accadimento Sinistro"
          name="logo_accadimento_sinistro"
          tooltip="Inserisci il luogo di accadimento del sinistro"
        >
          <Input placeholder="luogo del sinistro ..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Anno Esercizio"
          name="anno_esercizio"
          tooltip="Seleziona l'anno di esercizio"
          rules={[{ required: true, message: "L'anno di esercizio è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
              { value: "2020", label: "2023" },
            ]}
          />
        </FormInput>

        <RowSpacer />
      </Row>
      <Row>
        <FormInput
          label="Intervento Forze dell'Ordine"
          name="intervento_forze_ordine"
          tooltip="Sono intervenute le forze dell'ordine?"
        >
          <Switch checkedChildren={"Si"} unCheckedChildren={"No"} />
        </FormInput>
        <RowSpacer />
        <FormInput label="Testimoni" name="testimoni_mittente" tooltip="Testimoni">
          <Switch checkedChildren={"Si"} unCheckedChildren={"No"} />
        </FormInput>
      </Row>
    </ClaimDataStyled>
  );
};

export default ClaimData;
