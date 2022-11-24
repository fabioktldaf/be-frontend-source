import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, Select, Switch, Collapse, Button } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormSubTitle, FormTextArea, FormTimePicker } from "../../style/form";
import CardData from "./CardData";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { StepperDataType } from "../../types/new-claim.types";
import useApplication from "../../hooks/useApplication";

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

const ClaimData = () => {
  const app = useApplication();
  const policyData = useSelector((state: RootState) => state.newClaim.policyData);
  const { owner, contractor } = policyData || {};
  const stepperData = useSelector((state: RootState) => state.newClaim.stepperData);
  const claimData = useSelector((state: RootState) => state.newClaim.clamiData);

  //const [presenceOfWitnesses, setPresenceOfWitnesses] = useState(false);
  //const [stepperData, setStepperData] = useState<StepperDataType>();
  //const [dataAccadimento, setDataAccadimento] = useState<moment.Moment | null>();

  // const handleClaimTypeChanged = (_stepperData: StepperDataType) => {
  //   console.log("stepperData ", _stepperData);
  //   setStepperData(_stepperData);
  // };

  const checkDataAccadimento = () => {
    if (!claimData?.occurrenceDate) return true;

    const startDate = moment(policyData?.effect_date, "DD/MM/YYYY");
    const endDate = moment(policyData?.expiration_date, "DD/MM/YYYY");

    return moment(claimData.occurrenceDate).isBetween(startDate, endDate);
  };

  const renderDetailsGroupDataField = (field: any, i: number) => (
    <ReadonlyField key={i}>
      <LabelStyled>{field.label} :</LabelStyled>
      <ReadonlyValue>{field.link ? <Link to={"#"}>{field.value}</Link> : field.value}</ReadonlyValue>
    </ReadonlyField>
  );

  const renderDetailsGroupData = (title: string, fields: any[]) => (
    <DetailsGroupData>
      <DetailsGroupDataTitle>{title}</DetailsGroupDataTitle>
      <DetailsGroupDataValues>{fields.map((f, i) => renderDetailsGroupDataField(f, i))}</DetailsGroupDataValues>
    </DetailsGroupData>
  );

  const renderNaturalPerson = (title: string, person: any) =>
    renderDetailsGroupData(title, [
      {
        label: "Nome",
        value: person.lastname + " " + person.name,
        link: "#",
      },
      {
        label: "Codice Fiscale",
        value: person.fiscal_code,
      },
      {
        label: "Provincia di residenza",
        value: person.province_of_residence,
      },
      {
        label: "Comune di residenza",
        value: person.city_of_residence,
      },
    ]);

  const renderGiuridicalPerson = (title: string, person: any) =>
    renderDetailsGroupData(title, [
      {
        label: "Ragione Sociale",
        value: person.business_name,
        link: "#",
      },
      {
        label: "Partita IVA",
        value: person.iva,
      },
      {
        label: "Provincia di sede",
        value: person.registered_office_province,
      },
      {
        label: "Comune di sede",
        value: person.registered_office_city,
      },
    ]);

  const ownerId = owner?.giuridical_person?.id || owner?.natural_person?.id;
  const contractorId = contractor?.giuridical_person?.id || contractor?.natural_person?.id;

  return (
    <ClaimDataStyled>
      <CollapseStyled>
        <Collapse.Panel header={"DETTAGLIO DATI POLIZZA"} key="1">
          <CollapsePanelContentStyled>
            {renderDetailsGroupData("POLIZZA", [
              {
                label: "Numero Polizza",
                value: policyData?.policy_number,
                link: "#",
              },
              {
                label: "Data Effetto",
                value: policyData?.effect_date,
              },
              {
                label: "Data Scadenza",
                value: policyData?.expiration_date,
              },
            ])}

            {owner?.natural_person && renderNaturalPerson("PROPRIETARIO", owner.natural_person)}
            {owner?.giuridical_person && renderGiuridicalPerson("PROPRIETARIO", owner.giuridical_person)}

            {contractor && contractorId !== ownerId && (
              <>
                {contractor.natural_person && renderNaturalPerson("CONTRAENTE", contractor.natural_person)}
                {contractor.giuridical_person && renderGiuridicalPerson("CONTRAENTE", contractor.giuridical_person)}
              </>
            )}
          </CollapsePanelContentStyled>
        </Collapse.Panel>
      </CollapseStyled>

      <CardData />

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
          <FormDatePicker
            placeholder="data di pervenimento della denuncia ..."
            onChange={(val) => app.updateClaimData(val?.toString(), "receipt-date")}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Data Accadimento"
          name="data_accadimento"
          tooltip="Seleziona la data di accadimento..."
          rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
        >
          <FormDatePicker
            placeholder="data di accadimento ..."
            onChange={(val) => app.updateClaimData(val?.toString(), "occurrence-date")}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Ora Accadimento"
          name="ora_accadimento"
          tooltip="Seleziona l'ora di accadimento..."
          rules={[{ required: true, message: "L'ora di accadimento è obbligatoria" }]}
        >
          <FormTimePicker
            placeholder="ora di accadimento ..."
            format="HH:mm"
            onChange={(val) => app.updateClaimData(val?.toString(), "occurrence-time")}
          />
        </FormInput>
      </Row>

      {!checkDataAccadimento() && (
        <DateWarningMessage>
          La data di accadimento è fuori copertura
          <span style={{ fontSize: "0.9em", marginLeft: "1em" }}>
            (DAL {policyData?.effect_date}
            {` AL `}
            {policyData?.expiration_date})
          </span>
        </DateWarningMessage>
      )}

      <Row>
        <FormInput
          label="Luogo Accadimento Sinistro"
          name="luogo_accadimento_sinistro"
          tooltip="Inserisci il luogo di accadimento del sinistro"
          rules={[
            { required: stepperData?.tipoSinistro === "CARD", message: "Il luogo di accadimento è obbligatorio" },
          ]}
        >
          <Input
            placeholder="luogo del sinistro ..."
            onChange={(val) => app.updateClaimData(val.currentTarget.value, "occurrence-place")}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Intervento Forze dell'Ordine"
          name="intervento_forze_ordine"
          tooltip="Sono intervenute le forze dell'ordine?"
        >
          <Switch
            checkedChildren={"Si"}
            unCheckedChildren={"No"}
            onChange={(val) => app.updateClaimData(val, "police-intervention")}
          />
        </FormInput>
        <RowSpacer />
        <FormInput label="Testimoni" name="testimoni_mittente" tooltip="Testimoni">
          <Switch
            checkedChildren={"Si"}
            unCheckedChildren={"No"}
            onChange={(val) => app.updateClaimData(val, "witnesses")}
          />
        </FormInput>
      </Row>
      {stepperData?.tipoSinistro === "CARD" && (
        <Row>
          <FormInput label="Nota Ania" name="nota_ania" tooltip="Inserisci una nota utente">
            <FormTextArea
              placeholder="nota utente ..."
              rows={1}
              maxLength={100}
              onChange={(val) => app.updateClaimData(val, "note")}
            />
          </FormInput>
        </Row>
      )}
    </ClaimDataStyled>
  );
};

export default ClaimData;
