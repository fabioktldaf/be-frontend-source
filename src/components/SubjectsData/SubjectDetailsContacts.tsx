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
import { InputTextStyled, SelectStyled, SwitchStyled } from "../../style/Input";
import { ContactTypes, ContactUseCaseTypes } from "../../config/const";
import { Col, Row, RowSpacer } from "../../style/containers";
import { FormContentTab, FormRow } from "../../style/form";
import { TitleHr } from "../Layout/Titles";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";

const ContactStyled = styled.div`
  margin-bottom: 4em;
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
  const ButtonDeleteContact = styled(Button)`
    font-size: 0.9em;
    text-transform: uppercase;
  `;

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
        <div style={{ position: "relative", zIndex: "1" }}>
          <TitleHr text="Contatto" containerStyle={{ zIndex: "1" }} />
          <RowSpacer />
          <ButtonDelete
            text="Elimina"
            onClick={() => handleRemoveContact(index)}
            style={{ position: "absolute", right: "0", top: "1.2em", zIndex: "2" }}
          />
        </div>

        <FormRow>
          <SelectStyled
            label="Tipo Contatto"
            tooltip="Seleziona il tipo contatto"
            defaultValue="---"
            value={contact.type}
            onChange={(val) => app.updateCounterpartData(val, "insuranceCode")}
            options={ContactTypes}
          />
          <RowSpacer />
          <SelectStyled
            label="Tipo Utilizzo"
            tooltip="Seleziona il tipo utilizzo"
            defaultValue="---"
            value={contact.useCase}
            onChange={(val) => handleChangeContact(val, "useCase")}
            options={ContactUseCaseTypes}
          />
        </FormRow>
        <FormRow>
          {contact.type !== "" ? (
            <InputTextStyled
              label={valueLabel}
              tooltip="Inserisci il valore del campo"
              rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
              placeholder={`${valueLabel.toLowerCase()}...`}
              value={contact.value}
              onChange={(val) => handleChangeContact(val, "value")}
            />
          ) : (
            <div style={{ flex: 1 }}></div>
          )}
          <RowSpacer />
          <SwitchStyled
            label="Preferito"
            unCheckedChildren={"No"}
            checkedChildren={"Si"}
            onChange={(val) => handleChangeContact(val, "preferred")}
            checked={contact.preferred}
          />
        </FormRow>
        <FormRow>
          <InputTextStyled
            label="Descrizione"
            tooltip="Inserisci il valore del campo"
            rules={[{ required: true, message: "Questo valore è obbligatorio" }]}
            placeholder="descrizione contatto..."
            value={contact.description}
            onChange={(val) => handleChangeContact(val, "value")}
          />
        </FormRow>
      </>
    );
  };

  return (
    <FormContentTab>
      {contacts.map((contact, i) => {
        return <ContactStyled key={i}>{renderContact(contact, i)}</ContactStyled>;
      })}
      <FormRow style={{ justifyContent: "center" }}>
        <ButtonConfirm onClick={handleAddContact} text="Aggiungi contatto" />
      </FormRow>
    </FormContentTab>
  );
};

export default SubjectDetailsContacts;
