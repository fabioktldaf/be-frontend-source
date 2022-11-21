import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, Select, Switch, Collapse, Button } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormSubTitle, FormTextArea, FormTimePicker } from "../../style/form";
import { ClaimDataType } from "./index";
import CardData, { StepperDataType } from "./CardData";
import moment from "moment";

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
  font-weight: 100;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DetailsGroupData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  margin-bottom: 2em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailsGroupDataTitle = styled.div`
  text-transform: uppercase;
  font-size: 0.9em;
`;

const DetailsGroupDataValues = styled.div`
  margin-left: 2em;
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

const DateWarningMessage = styled.div`
  color: red;
  background-color: lightyellow;
  margin: -1em 1em 2em 0;
  text-align: center;
  padding: 0.25em;
`;

const IsOwnerContractor = styled.div`
  display: flex;
  margin-top: 2em;
`;

const IsOwnerContractorMessage = styled.div`
  margin-right: 2em;
`;
type ClaimDataProps = {
  claim: ClaimDataType;
};

const ClaimData = (props: ClaimDataProps) => {
  const [presenceOfWitnesses, setPresenceOfWitnesses] = useState(false);
  const [stepperData, setStepperData] = useState<StepperDataType>();
  const [dataAccadimento, setDataAccadimento] = useState<moment.Moment | null>();

  const handleClaimTypeChanged = (_stepperData: StepperDataType) => {
    console.log("stepperData ", _stepperData);
    setStepperData(_stepperData);
  };

  const checkDataAccadimento = () => {
    if (!dataAccadimento) return true;

    const startDate = moment(props.claim.polizza.data_effetto, "DD/MM/YYYY");
    const endDate = moment(props.claim.polizza.data_scadenza, "DD/MM/YYYY");

    return dataAccadimento?.isBetween(startDate, endDate);
  };

  return (
    <ClaimDataStyled>
      <CollapseStyled>
        <Collapse.Panel header={"DETTAGLIO DATI POLIZZA"} key="1">
          <CollapsePanelContentStyled>
            <DetailsGroupData>
              <DetailsGroupDataTitle>POLIZZA</DetailsGroupDataTitle>
              <DetailsGroupDataValues>
                <ReadonlyField>
                  <LabelStyled>Numero Polizza :</LabelStyled>
                  <ReadonlyValue>
                    <Link to={"#"}>{props.claim.polizza.numero_polizza}</Link>
                  </ReadonlyValue>
                </ReadonlyField>
                <ReadonlyField>
                  <LabelStyled>Data Effetto :</LabelStyled>
                  <ReadonlyValue>{props.claim.polizza.data_effetto}</ReadonlyValue>
                </ReadonlyField>
                <ReadonlyField>
                  <LabelStyled>Data Scadenza :</LabelStyled>
                  <ReadonlyValue>{props.claim.polizza.data_scadenza}</ReadonlyValue>
                </ReadonlyField>
              </DetailsGroupDataValues>
            </DetailsGroupData>
            <DetailsGroupData>
              <DetailsGroupDataTitle>PROPRIETARIO</DetailsGroupDataTitle>
              {props.claim.proprietario.persona_fisica && (
                <DetailsGroupDataValues>
                  <ReadonlyField>
                    <LabelStyled>Nome :</LabelStyled>
                    <ReadonlyValue>
                      <Link to={"#"}>
                        {props.claim.proprietario.persona_fisica.cognome} {props.claim.proprietario.persona_fisica.nome}
                      </Link>
                    </ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Codice Fiscale :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_fisica.codice_fiscale}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Provincia di residenza :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_fisica.provincia_residenza}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Comune di residenza :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_fisica.comune_residenza}</ReadonlyValue>
                  </ReadonlyField>
                </DetailsGroupDataValues>
              )}
              {props.claim.proprietario.persona_giuridica && (
                <DetailsGroupDataValues>
                  <ReadonlyField>
                    <LabelStyled>Nome :</LabelStyled>
                    <Link to={"#"}>{props.claim.proprietario.persona_giuridica.ragione_sociale}</Link>
                    <ReadonlyValue></ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Partita IVA :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_giuridica.partita_iva}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Provincia sede legale :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_giuridica.provincia_sede_legale}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Comune sede legale :</LabelStyled>
                    <ReadonlyValue>{props.claim.proprietario.persona_giuridica.comune_sede_legale}</ReadonlyValue>
                  </ReadonlyField>
                </DetailsGroupDataValues>
              )}
            </DetailsGroupData>

            <DetailsGroupData>
              <DetailsGroupDataTitle>CONTRAENTE</DetailsGroupDataTitle>
              {props.claim.contraente?.persona_fisica && (
                <DetailsGroupDataValues>
                  <ReadonlyField>
                    <LabelStyled>Nome :</LabelStyled>
                    <ReadonlyValue>
                      <Link to={"#"}>
                        {props.claim.contraente.persona_fisica.cognome} {props.claim.contraente.persona_fisica.nome}
                      </Link>
                    </ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Codice Fiscale :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_fisica.codice_fiscale}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Provincia di residenza :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_fisica.provincia_residenza}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Comune di residenza :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_fisica.comune_residenza}</ReadonlyValue>
                  </ReadonlyField>
                </DetailsGroupDataValues>
              )}
              {props.claim.contraente?.persona_giuridica && (
                <DetailsGroupDataValues>
                  <ReadonlyField>
                    <LabelStyled>Nome :</LabelStyled>
                    <Link to={"#"}>{props.claim.contraente.persona_giuridica.ragione_sociale}</Link>
                    <ReadonlyValue></ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Partita IVA :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_giuridica.partita_iva}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Provincia sede legale :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_giuridica.provincia_sede_legale}</ReadonlyValue>
                  </ReadonlyField>
                  <ReadonlyField>
                    <LabelStyled>Comune sede legale :</LabelStyled>
                    <ReadonlyValue>{props.claim.contraente.persona_giuridica.comune_sede_legale}</ReadonlyValue>
                  </ReadonlyField>
                </DetailsGroupDataValues>
              )}
            </DetailsGroupData>
          </CollapsePanelContentStyled>
        </Collapse.Panel>
      </CollapseStyled>

      <CardData onClaimTypeChanged={handleClaimTypeChanged} />

      <HrStyled />

      <Row>
        <FormInput label="Data Registrazione" name="data_registrazione">
          {moment().format("DD/MM/YYYY")}
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Data Pervenimento Denuncia"
          name="data_pervenimento_denuncia"
          tooltip="Seleziona la data di pervenimento della denuncia"
          rules={[{ required: true, message: "La data di pervenimento della denuncia è obbligatoria" }]}
        >
          <FormDatePicker placeholder="data di pervenimento della denuncia ..." />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Data Accadimento"
          name="data_accadimento"
          tooltip="Seleziona la data di accadimento..."
          rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
        >
          <FormDatePicker placeholder="data di accadimento ..." onChange={(val) => setDataAccadimento(val)} />
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

      {!checkDataAccadimento() && (
        <DateWarningMessage>
          La data di accadimento è fuori copertura
          <span style={{ fontSize: "0.9em", marginLeft: "1em" }}>
            (DAL {props.claim.polizza.data_effetto}
            {` AL `}
            {props.claim.polizza.data_scadenza})
          </span>
        </DateWarningMessage>
      )}

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
