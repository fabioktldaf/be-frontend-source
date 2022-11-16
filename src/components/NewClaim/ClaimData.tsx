import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select, Switch, Collapse, Button } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormSubTitle, FormTextArea, FormTimePicker } from "../../style/form";
import { ClaimDataType } from "./index";
import CardData, { StepperDataType } from "./CardData";

const ClaimDataStyled = styled.div``;

const CollapseStyled = styled(Collapse)`
  margin-bottom: 3em;
`;

const CollapsePanelContentStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReadonlyField = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em;
  border-bottom: dashed 1px #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const LabelStyled = styled.label`
  flex: 1;
  text-transorm: uppercase;
`;

const ReadonlyValue = styled.span``;

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
  const [presenceOfWitnesses, setPresenceOfWitnesses] = useState(false);
  const [stepperData, setStepperData] = useState<StepperDataType>();

  const operatingYear = props.claim.data_registrazione.slice(-4);

  const handleClaimTypeChanged = (_stepperData: StepperDataType) => {
    console.log("stepperData ", _stepperData);
    setStepperData(_stepperData);
  };

  return (
    <ClaimDataStyled>
      <CollapseStyled>
        <Collapse.Panel header={"DETTAGLIO DATI SINISTRO"} key="1">
          <CollapsePanelContentStyled>
            <ReadonlyField>
              <LabelStyled>Codice Compagnia :</LabelStyled>
              <ReadonlyValue>{props.claim.codice_compagnia}</ReadonlyValue>
            </ReadonlyField>
            <ReadonlyField>
              <LabelStyled>Codice Ramo :</LabelStyled>
              <ReadonlyValue>{props.claim.codice_ramo}</ReadonlyValue>
            </ReadonlyField>
            <ReadonlyField>
              <LabelStyled>Codice Ramo Sinistro :</LabelStyled>
              <ReadonlyValue>{props.claim.codice_ramo_sinistro}</ReadonlyValue>
            </ReadonlyField>
            <ReadonlyField>
              <LabelStyled>Data Registrazione :</LabelStyled>
              <ReadonlyValue>{props.claim.data_registrazione}</ReadonlyValue>
            </ReadonlyField>
            <ReadonlyField>
              <LabelStyled>Anno di esercizio :</LabelStyled>
              <ReadonlyValue>{operatingYear}</ReadonlyValue>
            </ReadonlyField>
          </CollapsePanelContentStyled>
        </Collapse.Panel>
      </CollapseStyled>

      <CardData onClaimTypeChanged={handleClaimTypeChanged} />

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
          label="Data Accadimento"
          name="data_accadimento"
          tooltip="Seleziona la data di accadimento..."
          rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
        >
          <FormDatePicker placeholder="data di accadimento ..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Ora Accadimento"
          name="ora_accadimento"
          tooltip="Seleziona l'ora di accadimento..."
          rules={[{ required: true, message: "L'ora di accadimento è obbligatoria" }]}
        >
          <FormTimePicker placeholder="ora di accadimento ..." format="HH:mm" />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Luogo Accadimento Sinistro"
          name="logo_accadimento_sinistro"
          tooltip="Inserisci il luogo di accadimento del sinistro"
          rules={[
            { required: stepperData?.tipoSinistro === "CARD", message: "Il luogo di accadimento è obbligatorio" },
          ]}
        >
          <Input placeholder="luogo del sinistro ..." />
        </FormInput>
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
          <Switch checkedChildren={"Si"} unCheckedChildren={"No"} onChange={(val) => setPresenceOfWitnesses(val)} />
          {presenceOfWitnesses && (
            <Button type="primary" size="small" style={{ marginLeft: "3em" }}>
              Inserisci
            </Button>
          )}
        </FormInput>
      </Row>
      {stepperData?.tipoSinistro === "CARD" && (
        <Row>
          <FormInput label="Nota Ania" name="nota_ania" tooltip="Inserisci una nota utente">
            <FormTextArea placeholder="nota utente ..." rows={1} maxLength={100} />
          </FormInput>
        </Row>
      )}
    </ClaimDataStyled>
  );
};

export default ClaimData;
