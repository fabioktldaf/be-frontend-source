import React from "react";
import { Button, Tooltip, Upload } from "antd";
import styled from "styled-components";
import {
  SubjectData,
  SubjectDocumentData,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import { Col, Row, RowSpacer } from "../../style/containers";
import { DatePickerStyled, InputTextStyled, SelectStyled } from "../../style/Input";
import { DocumentTypes } from "../../config/const";
import { IconDelete, IconInbox } from "../../config/icons";
import { FormContentTab, FormRow } from "../../style/form";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";
import { TitleHr } from "../Layout/Titles";

export const UploadDocumentsAction = "localhost";

const DocumentStyled = styled.div`
  margin-bottom: 4em;
`;

const UploadContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  color: #777;

  svg {
    font-size: 1.8em;
    margin-right: 0.25em;
  }
`;

interface SubjectDetailsDocumentsProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsDocuments = (props: SubjectDetailsDocumentsProps) => {
  const { subject, readOnly, app, t } = props;
  const documents: SubjectDocumentData[] = subject?.documents || [];

  const handleAddDocument = () => {
    app.editingSubjectAddDocument();
  };

  const handleRemoveDocument = (index: number) => {
    app.editingSubjectRemoveDocument(index);
  };

  const renderDocument = (document: SubjectDocumentData, index: number) => {
    const handleChangeDocument = (value: any, field: string) => {
      //
    };

    return (
      <>
        <div style={{ position: "relative", zIndex: "1" }}>
          <TitleHr text="Documento" containerStyle={{ zIndex: "1" }} />
          <RowSpacer />
          <ButtonDelete
            text="Elimina"
            onClick={() => handleRemoveDocument(index)}
            style={{ position: "absolute", right: "0", top: "1.2em", zIndex: "2" }}
          />
        </div>
        <FormRow>
          <SelectStyled
            label="Tipo Documento"
            tooltip="Seleziona il tipo documento"
            defaultValue="---"
            value={document.type}
            onChange={(val) => handleChangeDocument(val, "type")}
            options={DocumentTypes}
          />
          <RowSpacer />
          <InputTextStyled
            label="Numero Documento"
            tooltip="Inserisci il numero del documento"
            rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
            placeholder="numero documento..."
            value={document.number}
            onChange={(val) => handleChangeDocument(val, "number")}
          />
        </FormRow>
        <FormRow>
          <Row style={{ flex: 1 }}>
            <DatePickerStyled
              label="Data Emissione"
              tooltip="Seleziona la data di Emissione"
              rules={[{ required: true, message: "La data di emissione è obbligatoria" }]}
              placeholder="data di emissione ..."
              onChange={(val) => handleChangeDocument(val, "issuingDate")}
              value={document.issuingDate}
              format={"DD/MM/YYYY"}
            />
            <RowSpacer />
            <DatePickerStyled
              label="Data Scadenza"
              tooltip="Seleziona la data di Scadenza"
              rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
              placeholder="data di accadimento ..."
              onChange={(val) => handleChangeDocument(val, "expirationDate")}
              value={document.expirationDate}
              format={"DD/MM/YYYY"}
            />
          </Row>
          <RowSpacer />
          <InputTextStyled
            label="Ente di Emissione"
            tooltip="Inserisci il nome dell'ente di emissione"
            rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
            placeholder="ente emissione..."
            value={document.issuingInstitution}
            onChange={(val) => handleChangeDocument(val, "issuingInstitution")}
          />
        </FormRow>
        <Col style={{ alignItems: "stretch" }}>
          <Upload.Dragger
            name="file"
            multiple={true}
            action={UploadDocumentsAction}
            onChange={() => {}}
            onDrop={() => {}}
          >
            <UploadContent>
              <IconInbox />
              Seleziona Allegati
            </UploadContent>
          </Upload.Dragger>
        </Col>
      </>
    );
  };
  return (
    <FormContentTab>
      {documents.map((document, i) => (
        <DocumentStyled key={i}>{renderDocument(document, i)}</DocumentStyled>
      ))}
      <FormRow style={{ justifyContent: "center" }}>
        <ButtonConfirm onClick={handleAddDocument} text="Aggiungi Documento" />
      </FormRow>
    </FormContentTab>
  );
};

export default SubjectDetailsDocuments;
