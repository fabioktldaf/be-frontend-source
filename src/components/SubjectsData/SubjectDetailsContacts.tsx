import React from "react";
import { Button, Switch, Tooltip } from "antd";
import styled from "styled-components";
import {
  SubjectContactData,
  SubjectData,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import { IconDelete } from "../../config/icons";
import { InputTextStyled, SelectStyled } from "../../style/Input";
import { ContactTypes, ContactUseCaseTypes } from "../../config/const";
import { Row, RowSpacer } from "../../style/containers";

const ContactStyled = styled.div`
  display: flex;
  padding-bottom: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid #eee;
`;

const ButtonDeleteContact = styled.div`
  cursor: pointer;
`;

interface SubjectDetailsContactsProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsContacts = (props: SubjectDetailsContactsProps) => {
  const { subject, readOnly, app, t } = props;
  const contacts: SubjectContactData[] = subject?.contacts || [];

  const handleAddContact = () => {
    app.editingSubjectAddContact();
  };

  const handleRemoveContact = (index: number) => {
    console.log("removing contact ", index);
    app.editingSubjectRemoveContact(index);
  };

  const renderContact = (contact: SubjectContactData, index: number) => {
    const handleChangeContact = (value: any, field: string) => {
      //
    };

    const valueLabel =
      contact.type === "pec"
        ? "Indirizzo"
        : contact.type === "email"
        ? "Indirizzo"
        : contact.type === "phone"
        ? "Numero"
        : contact.type === "mobile"
        ? "Indirizzo"
        : "";

    return (
      <>
        <div>
          <Row>
            <SelectStyled
              label="Tipo Contatto"
              tooltip="Seleziona il tipo contatto"
              defaultValue="---"
              value={contact.type}
              onChange={(val) => app.updateCounterpartData(val, "insuranceCode")}
              options={ContactTypes}
            />
            <RowSpacer />
            {contact.type !== "" && (
              <InputTextStyled
                label={valueLabel}
                tooltip="Inserisci il valore del campo"
                rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
                placeholder={`${valueLabel.toLowerCase()}...`}
                value={contact.value}
                onChange={(val) => handleChangeContact(val, "value")}
              />
            )}
          </Row>
          <InputTextStyled
            label="Descrizione"
            tooltip="Inserisci il valore del campo"
            rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
            placeholder="descrizione contatto..."
            value={contact.description}
            onChange={(val) => handleChangeContact(val, "value")}
          />
          <Row>
            <SelectStyled
              label="Tipo Utilizzo"
              tooltip="Seleziona il tipo utilizzo"
              defaultValue="---"
              value={contact.useCase}
              onChange={(val) => handleChangeContact(val, "useCase")}
              options={ContactUseCaseTypes}
            />
            <RowSpacer />
            <Switch
              unCheckedChildren={"No"}
              checkedChildren={"Si"}
              onChange={(val) => handleChangeContact(val, "preferred")}
              checked={contact.preferred}
            />
          </Row>
        </div>
        <ButtonDeleteContact onClick={() => handleRemoveContact(index)}>
          <IconDelete />
        </ButtonDeleteContact>
      </>
    );
  };

  return (
    <>
      {contacts.map((contact, i) => {
        return <ContactStyled key={i}>{renderContact(contact, i)}</ContactStyled>;
      })}
      <Button onClick={handleAddContact}>Aggiungi Contatto</Button>
    </>
  );
};

export default SubjectDetailsContacts;
