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
import {
  EditingSubjectState,
  SubjectData,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import SubjectDetails from "../SubjectsData/SubjectDetails";
import { IconCheck, IconNoSafe, IconSafe } from "../../config/icons";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";

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
  const [editingSubject, setEditingSubject] = useState<EditingSubjectState | undefined>();

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

    console.log("occurrenceDate ", occurrenceDate.format("DD/MM/YYYY"));
    console.log("startDate ", startDate.format("DD/MM/YYYY"));
    console.log("endDate ", endDate.format("DD/MM/YYYY"));

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

  const handleEditSubject = (subjectId: string, type: string) => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.id = subjectId;
    updatedEditingSubject.type = type;
    updatedEditingSubject.modalOpen = true;
    setEditingSubject(updatedEditingSubject);
  };

  const handleCloseEditingSubject = () => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.modalOpen = false;
    setEditingSubject(updatedEditingSubject);
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

  const renderNaturalPerson = (title: string, person: SubjectNaturalPersonData) =>
    renderDetailsGroupData(title, [
      {
        label: "Nome",
        value: person.lastname + " " + person.name,
        link: "#",
        onClick: () => handleEditSubject(person.id, "natural-person"),
      },
      {
        label: "Codice Fiscale",
        value: person.fiscalCode,
      },
    ]);

  const renderGiuridicalPerson = (title: string, person: SubjectGiuridicalPersonData) =>
    renderDetailsGroupData(title, [
      {
        label: "Ragione Sociale",
        value: person.business_name,
        link: "#",
        onClick: () => handleEditSubject(person.id, "giuridical-person"),
      },
      {
        label: "Partita IVA",
        value: person.pIva,
      },
    ]);

  const policyDetailsHeader = (
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>DETTAGLIO DATI POLIZZA</span>
      <div style={{ display: "flex", alignItems: "center", fontSize: "0.9em" }}>
        {claimData?.___isPolicyCard ? (
          <IconSafe style={{ color: "green", fontSize: "1.4em", margin: "0 0.25em 2px 0" }} />
        ) : (
          <IconNoSafe style={{ color: "red", fontSize: "1.4em", margin: "0 0.25em 2px 0" }} />
        )}
      </div>
    </div>
  );

  const ownerNaturalPerson = owner as SubjectNaturalPersonData;
  const ownerGiuridicalPerson = owner as SubjectGiuridicalPersonData;
  const isOwnerNaturalPerson = !!ownerNaturalPerson?.fiscalCode;
  const isOwnerGiuridicalPerosn = !!ownerGiuridicalPerson?.pIva;

  const contractorNaturalPerson = contractor as SubjectNaturalPersonData;
  const contractorGiuridicalPerson = contractor as SubjectGiuridicalPersonData;
  const isContractorNaturalPerson = !!contractorNaturalPerson?.fiscalCode;
  const isContractorGiuridicalPerosn = !!contractorGiuridicalPerson?.pIva;

  const ownerId = isOwnerNaturalPerson ? ownerNaturalPerson?.id : ownerGiuridicalPerson?.id;
  const contractorId = isContractorNaturalPerson ? contractorNaturalPerson?.id : contractorGiuridicalPerson?.id;

  return (
    <TabContentStyled>
      <CollapseStyled>
        <Collapse.Panel header={policyDetailsHeader} key="1">
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

            {isOwnerNaturalPerson && renderNaturalPerson("PROPRIETARIO", ownerNaturalPerson)}
            {isOwnerGiuridicalPerosn && renderGiuridicalPerson("PROPRIETARIO", ownerGiuridicalPerson)}

            {!!contractorId && contractorId !== ownerId && (
              <>
                {isContractorNaturalPerson && renderNaturalPerson("CONTRAENTE", contractorNaturalPerson)}
                {isContractorGiuridicalPerosn && renderGiuridicalPerson("CONTRAENTE", contractorGiuridicalPerson)}
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
          label="Data Denuncia"
          tooltip="Seleziona la data di denuncia"
          rules={[{ required: true, message: "La data della denuncia è obbligatoria" }]}
          placeholder="data  denuncia ..."
          onChange={(val) => app.updateClaimData(val, "receiptDate")}
          value={claimData?.receiptDate}
          format={"DD/MM/YYYY"}
        />
      </FormRow>
      <FormRow>
        <DatePickerStyled
          label="Data Pervenimento in Compagnia"
          tooltip="Seleziona la data di pervenimento in compagnia"
          rules={[{ required: true, message: "La data di pervenimento in compagnia è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => app.updateClaimData(val, "dateOfReceiptCompany")}
          value={claimData?.dateOfReceiptCompany}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <DatePickerStyled
          label="Data Pervenimento in Dekra"
          tooltip="Seleziona la data di pervenimento in Dekra"
          rules={[{ required: true, message: "La data di pervenimento in Dekra è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => app.updateClaimData(val, "dateOfReceiptDekra")}
          value={claimData?.dateOfReceiptDekra}
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
      {/* <Modal open={isOpenSubjectModal} onCancel={() => setIsOpenSubjectModal(false)} width="1000px" footer={null}>
        <div style={{ padding: "3em 2em 2em 2em" }}>
          <SubjectDetails />
        </div>
      </Modal> */}
      <SubjectEditModal
        isOpen={editingSubject?.modalOpen}
        id={editingSubject?.id}
        onOk={() => {}}
        onCancel={() => handleCloseEditingSubject()}
      />
    </TabContentStyled>
  );
};

export default ClaimData;
