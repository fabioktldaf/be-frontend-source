import React from "react";
import { Tooltip } from "antd";
import styled from "styled-components";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import {
  DatePickerStyled,
  FiscalCodeStyled,
  InputAddress,
  InputTextStyled,
  SegmentedStyled,
  SelectStyled,
} from "../../style/Input";
import { Row, RowSpacer } from "../../style/containers";
import { GenderTypes, GiuridicalPersonTypes, GiuridicalPersonTypeSpa } from "../../config/const";
import { IconEdit } from "../../config/icons";
import { BiEditAlt } from "react-icons/bi";
import { FormContentTab, FormRow } from "../../style/form";
import { TitleHr } from "../Layout/Titles";

const ProprietorshipTitle = styled.div`
  font-size: 1.2em;
  margin: 1em 0;
  border-top: 1px solid #eee;
  text-align: center;
`;

type subectType = undefined | "natural" | "business" | "proprietorship";

interface SubjectDetailsSubjectProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsSubject = (props: SubjectDetailsSubjectProps) => {
  const { subject, readOnly, app, t, onChange } = props;

  const naturalPerson = subject?.person as SubjectNaturalPersonData;
  const giuridicalPerson = subject?.person as SubjectGiuridicalPersonData;

  let subjectType: subectType = "natural";
  if (giuridicalPerson?.business_name?.length > 0) subjectType = "business";

  const renderNaturalPerson = () => {
    return (
      <FormContentTab>
        <FormRow>
          <SegmentedStyled
            label="Tipo Soggetto"
            tooltip="Seleziona il tipo di soggetto"
            options={["natural", "business"]}
            value={subjectType}
            onChange={(val) => onChange(val, "subjectType")}
          />
        </FormRow>

        <FormRow>
          <InputTextStyled
            label="Nome"
            tooltip="Inserisci il nome"
            rules={[{ required: true, message: "Il nome è obbligatorio" }]}
            placeholder="nome del soggetto..."
            onChange={(txt) => onChange(txt, "name")}
            value={naturalPerson?.name}
          />
          <RowSpacer />
          <InputTextStyled
            label="Cognome"
            tooltip="Inserisci il cognome"
            rules={[{ required: true, message: "Il cognome è obbligatorio" }]}
            placeholder="cognome del soggetto..."
            onChange={(txt) => onChange(txt, "lastname")}
            value={naturalPerson?.lastname}
          />
        </FormRow>
        <FormRow>
          <Row style={{ flex: 1 }}>
            <DatePickerStyled
              label="Data di Nascita"
              tooltip="Seleziona la data di Nascita"
              placeholder="data di nascita ..."
              onChange={(txt) => onChange(txt, "birt.date")}
              value={naturalPerson?.birth?.date}
              format={"DD/MM/YYYY"}
            />
            <RowSpacer />
            <SelectStyled
              label="Sesso"
              tooltip="Seleziona Sesso"
              defaultValue="---"
              value={naturalPerson?.gender}
              onChange={(txt) => onChange(txt, "gender")}
              options={GenderTypes}
            />
          </Row>
          <RowSpacer />
          <FiscalCodeStyled
            style={{ flex: 1 }}
            label="Codice Fiscale"
            tooltip="Inserisci il codice fiscale"
            rules={[{ required: true, message: "Il codice fiscale è obbligatorio" }]}
            placeholder="codice fiscale..."
            onChange={(txt) => onChange(txt, "fiscalCode")}
            value={naturalPerson?.fiscalCode}
          />
        </FormRow>
        <FormRow>
          <InputAddress
            label="Luogo di Nascita"
            tooltip="Luogo di nascita"
            placeholder="luogo di nascita.."
            onEdit={() => {}}
            value={`${naturalPerson?.birth?.city} - ${naturalPerson?.birth?.province} - ${naturalPerson?.birth?.country}`}
            onChange={(data) => onChange(data, "birt.place")}
          />
        </FormRow>
      </FormContentTab>
    );
  };

  const renderGiuridicalPerson = () => {
    return (
      <FormContentTab>
        <FormRow>
          <SegmentedStyled
            label="Tipo Soggetto"
            tooltip="Seleziona il tipo di soggetto"
            options={["natural", "business"]}
            value={subjectType}
            onChange={(val) => onChange(val, "subjectType")}
          />
        </FormRow>
        <FormRow>
          <InputTextStyled
            label="Ragione Sociale"
            tooltip="Inserisci la ragione sociale"
            rules={[{ required: true, message: "La ragione sociale è obbligatoria" }]}
            placeholder="ragione sociale..."
            onChange={(txt) => onChange(txt, "business_name")}
            value={giuridicalPerson?.business_name}
          />
          <RowSpacer />
          <SelectStyled
            label="Tipo"
            tooltip="Tipo di persona giuridica"
            defaultValue="---"
            value={giuridicalPerson?.type}
            onChange={(txt) => onChange(txt, "type")}
            options={GiuridicalPersonTypes}
          />
        </FormRow>
        <FormRow>
          <InputTextStyled
            label="Partita IVA"
            tooltip="Inserisci la partita iva"
            rules={[{ required: true, message: "La partita iva è obbligatoria" }]}
            placeholder="partita iva..."
            onChange={(txt) => onChange(txt, "p_iva")}
            value={giuridicalPerson?.p_iva}
          />
          <RowSpacer />
          <div style={{ flex: 1 }}></div>
        </FormRow>

        {giuridicalPerson?.isProprietorship && (
          <>
            <TitleHr text="Ditta Individuale" />

            <FormRow>
              <InputTextStyled
                label="Nome"
                tooltip="Inserisci il nome"
                rules={[{ required: true, message: "Il nome è obbligatorio" }]}
                placeholder="nome del soggetto..."
                onChange={(txt) => onChange(txt, "name")}
                value={giuridicalPerson?.proprietorship?.name}
              />
              <RowSpacer />
              <InputTextStyled
                label="Cognome"
                tooltip="Inserisci il cognome"
                rules={[{ required: true, message: "Il cognome è obbligatorio" }]}
                placeholder="cognome del soggetto..."
                onChange={(txt) => onChange(txt, "lastname")}
                value={giuridicalPerson?.proprietorship?.lastname}
              />
            </FormRow>
            <FormRow>
              <Row style={{ flex: 1 }}>
                <DatePickerStyled
                  label="Data di Nascita"
                  tooltip="Seleziona la data di Nascita"
                  placeholder="data di nascita ..."
                  onChange={(txt) => onChange(txt, "birt.date")}
                  value={giuridicalPerson?.proprietorship?.birth.date}
                  format={"DD/MM/YYYY"}
                />
                <RowSpacer />
                <SelectStyled
                  label="Sesso"
                  tooltip="Seleziona Sesso"
                  defaultValue="---"
                  value={giuridicalPerson?.proprietorship?.gender}
                  onChange={(txt) => onChange(txt, "gender")}
                  options={GenderTypes}
                />
              </Row>
              <RowSpacer />
              <FiscalCodeStyled
                label="Codice Fiscale"
                tooltip="Inserisci il codice fiscale"
                rules={[{ required: true, message: "Il codice fiscale è obbligatorio" }]}
                placeholder="codice fiscale..."
                onChange={(txt) => onChange(txt, "fiscalCode")}
                value={giuridicalPerson?.proprietorship?.fiscalCode}
              />
            </FormRow>
            <FormRow>
              <InputAddress
                label="Luogo di Nascita"
                tooltip="Luogo di nascita"
                placeholder="luogo di nascita.."
                onEdit={() => {}}
                value={`${giuridicalPerson?.birth?.city} - ${giuridicalPerson?.birth?.province} - ${giuridicalPerson?.birth?.country}`}
                onChange={(data) => onChange(data, "birt.place")}
              />
            </FormRow>
          </>
        )}
      </FormContentTab>
    );
  };

  return subjectType === "natural" ? (
    renderNaturalPerson()
  ) : subjectType === "business" ? (
    renderGiuridicalPerson()
  ) : subjectType === "proprietorship" ? (
    renderGiuridicalPerson()
  ) : (
    <></>
  );
};

export default SubjectDetailsSubject;
