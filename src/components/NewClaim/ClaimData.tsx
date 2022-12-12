import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Switch, Collapse, Modal } from "antd";
import { RowSpacer } from "../../style/containers";
import { FormRow, FormInput, FormTextArea } from "../../style/form";
import CardData from "./CardData";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useApplication from "../../hooks/useApplication";
import { DatePickerStyled, InputTextStyled, TimePickerStyled } from "../../style/Input";
import { TabContentStyled } from ".";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import SubjectDetails from "../SubjectsData/SubjectDetails";

const CollapseStyled = styled(Collapse)``;

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
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);

  const app = useApplication();
  const navigate = useNavigate();

  const policyData = useSelector((state: RootState) => state.newClaim.policyData);
  const { owner, contractor } = policyData || {};
  const stepperData = useSelector((state: RootState) => state.newClaim.stepperData);
  const claimData = useSelector((state: RootState) => state.newClaim.claimData);

  const checkDataAccadimento = () => {
    if (!claimData?.occurrenceDate) return true;

    const startDate = moment(policyData?.effect_date, "DD/MM/YYYY");
    const endDate = moment(policyData?.expiration_date, "DD/MM/YYYY");
    const occurrenceDate = moment(claimData.occurrenceDate);
    const receiptDate = moment(claimData.receiptDate);

    if (!occurrenceDate.isBetween(startDate, endDate))
      return (
        <DateWarningMessage>
          La data di accadimento è fuori copertura
          <span style={{ fontSize: "0.9em", marginLeft: "1em" }}>
            (DAL {policyData?.effect_date}
            {` AL `}
            {policyData?.expiration_date})
          </span>
        </DateWarningMessage>
      );

    if (occurrenceDate.isAfter(receiptDate))
      return (
        <DateWarningMessage>La data di accadimento è successiva al pervenimento della denuncia</DateWarningMessage>
      );

    return <></>;
  };

  const handleEditSubject = (person: SubjectNaturalPersonData | SubjectGiuridicalPersonData) => {
    console.log(person);
    app.editSubject({ person: Object.assign({}, person) }, navigate);
    setIsOpenSubjectModal(true);
  };

  const renderDetailsGroupDataField = (field: any, i: number) => (
    <ReadonlyField key={i}>
      <LabelStyled>{field.label} :</LabelStyled>
      <ReadonlyValue>
        {field.link ? (
          <Link to={"#"} onClick={field.onClick}>
            {field.value}
          </Link>
        ) : (
          field.value
        )}
      </ReadonlyValue>
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
        onClick: () => handleEditSubject(person),
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
        onClick: () => handleEditSubject(person),
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
    <TabContentStyled>
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
      <FormRow>
        <FormInput label="Data Registrazione" name="data_registrazione">
          {moment().format("DD/MM/YYYY")}
        </FormInput>
        <RowSpacer />

        <DatePickerStyled
          label="Data Pervenimento Denuncia"
          tooltip="Seleziona la data di pervenimento della denuncia"
          rules={[{ required: true, message: "La data di pervenimento della denuncia è obbligatoria" }]}
          placeholder="data pervenimento denuncia ..."
          onChange={(val) => app.updateClaimData(val, "receiptDate")}
          value={claimData?.receiptDate}
          format={"DD/MM/YYYY"}
        />
      </FormRow>
      <FormRow>
        <DatePickerStyled
          label="Data Accadimento"
          tooltip="Seleziona la data di Accadimento"
          rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => app.updateClaimData(val, "occurrenceDate")}
          value={claimData?.occurrenceDate}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <TimePickerStyled
          label="Ora Accadimento"
          tooltip="Seleziona l'ora di accadimento..."
          rules={[{ required: true, message: "L'ora di accadimento è obbligatoria" }]}
          placeholder="ora di accadimento ..."
          format="HH:mm"
          onChange={(val: string) => app.updateClaimData(val, "occurrenceTime")}
          value={claimData?.occurrenceTime}
        />
      </FormRow>
      {checkDataAccadimento()}
      <FormRow>
        <InputTextStyled
          label="Luogo Accadimento Sinistro"
          tooltip="Inserisci il luogo di accadimento del sinistro"
          rules={[
            { required: stepperData?.tipoSinistro === "CARD", message: "Il luogo di accadimento è obbligatorio" },
          ]}
          placeholder="luogo del sinistro ..."
          onChange={(txt) => app.updateClaimData(txt, "occurrencePlace")}
          value={claimData?.occurrencePlace}
        />
      </FormRow>
      <FormRow>
        <FormInput
          label="Intervento Forze dell'Ordine"
          name="intervento_forze_ordine"
          tooltip="Sono intervenute le forze dell'ordine?"
        >
          <Switch
            checkedChildren={"Si"}
            unCheckedChildren={"No"}
            onChange={(val) => app.updateClaimData(val, "policeIntervention")}
            checked={claimData?.policeIntervention}
          />
        </FormInput>
        <RowSpacer />
        <FormInput label="Testimoni" name="testimoni_mittente" tooltip="Testimoni">
          <Switch
            checkedChildren={"Si"}
            unCheckedChildren={"No"}
            onChange={(val) => app.updateClaimData(val, "witnesses")}
            checked={claimData?.witnesses}
          />
        </FormInput>
      </FormRow>
      {stepperData?.tipoSinistro === "CARD" && (
        <>
          <FormRow>
            <InputTextStyled
              label="Nota Ania"
              tooltip="Inserisci una nota utente"
              placeholder="nota utente ..."
              maxLength={100}
              onChange={(val) => app.updateClaimData(val, "note")}
              value={claimData?.note}
            />
          </FormRow>
        </>
      )}
      <Modal open={isOpenSubjectModal} onCancel={() => setIsOpenSubjectModal(false)} width="1000px" footer={null}>
        <div style={{ padding: "3em 2em 2em 2em" }}>
          <SubjectDetails />
        </div>
      </Modal>
    </TabContentStyled>
  );
};

export default ClaimData;
