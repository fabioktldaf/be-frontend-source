import React from "react";
import { Tooltip } from "antd";
import styled from "styled-components";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import { DatePickerStyled, FiscalCodeStyled, InputTextStyled, SelectStyled } from "../../style/Input";
import { Row, RowSpacer } from "../../style/containers";
import { GenderTypes, GiuridicalPersonTypes, GiuridicalPersonTypeSpa } from "../../config/const";
import { IconEdit } from "../../config/icons";
import { BiEditAlt } from "react-icons/bi";

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

  let subjectType: subectType;
  if (naturalPerson?.name?.length > 0) subjectType = "natural";
  if (giuridicalPerson?.business_name?.length > 0) subjectType = "business";
  if (giuridicalPerson?.isProprietorship) subjectType = "proprietorship";

  const renderNaturalPerson = () => {
    return (
      <>
        <Row>
          <InputTextStyled
            label="Nome"
            tooltip="Inserisci il nome"
            rules={[{ required: true, message: "Il nome è obbligatorio" }]}
            placeholder="nome del soggetto..."
            onChange={(txt) => onChange(txt, "name")}
            value={naturalPerson.name}
          />
          <RowSpacer />
          <InputTextStyled
            label="Cognome"
            tooltip="Inserisci il cognome"
            rules={[{ required: true, message: "Il cognome è obbligatorio" }]}
            placeholder="cognome del soggetto..."
            onChange={(txt) => onChange(txt, "lastname")}
            value={naturalPerson.lastname}
          />
        </Row>
        <Row>
          <SelectStyled
            label="Sesso"
            tooltip="Seleziona Sesso"
            defaultValue="---"
            value={naturalPerson.gender}
            onChange={(txt) => onChange(txt, "gender")}
            options={GenderTypes}
          />
          <RowSpacer />
          <DatePickerStyled
            label="Data di Nascita"
            tooltip="Seleziona la data di Nascita"
            placeholder="data di nascita ..."
            onChange={(txt) => onChange(txt, "birt.date")}
            value={naturalPerson.birth.date}
            format={"DD/MM/YYYY"}
          />
        </Row>
        <Row>
          <InputTextStyled
            label="Luogo di Nascita"
            tooltip="Luogo di nascita"
            placeholder="nome del soggetto..."
            value={`${naturalPerson.birth.city} - ${naturalPerson.birth.province} - ${naturalPerson.birth.country}`}
          />
          <BiEditAlt style={{ cursor: "pointer" }} />
        </Row>
        <Row>
          <FiscalCodeStyled
            label="Codice Fiscale"
            tooltip="Inserisci il codice fiscale"
            rules={[{ required: true, message: "Il codice fiscale è obbligatorio" }]}
            placeholder="codice fiscale..."
            onChange={(txt) => onChange(txt, "fiscalCode")}
            value={naturalPerson.fiscalCode}
          />
        </Row>
      </>
    );
  };

  const renderGiuridicalPerson = () => {
    return (
      <>
        <Row>
          <InputTextStyled
            label="Ragione Sociale"
            tooltip="Inserisci la ragione sociale"
            rules={[{ required: true, message: "La ragione sociale è obbligatoria" }]}
            placeholder="ragione sociale..."
            onChange={(txt) => onChange(txt, "business_name")}
            value={giuridicalPerson.business_name}
          />
          <RowSpacer />
          <SelectStyled
            label="Tipo"
            tooltip="Tipo di persona giuridica"
            defaultValue="---"
            value={giuridicalPerson.type}
            onChange={(txt) => onChange(txt, "type")}
            options={GiuridicalPersonTypes}
          />
        </Row>
        <Row>
          <InputTextStyled
            label="Partita IVA"
            tooltip="Inserisci la partita iva"
            rules={[{ required: true, message: "La partita iva è obbligatoria" }]}
            placeholder="partita iva..."
            onChange={(txt) => onChange(txt, "p_iva")}
            value={giuridicalPerson.p_iva}
          />
        </Row>

        {giuridicalPerson.isProprietorship && (
          <>
            <div>Ditta Individuale</div>
            <Row>
              <InputTextStyled
                label="Nome"
                tooltip="Inserisci il nome"
                rules={[{ required: true, message: "Il nome è obbligatorio" }]}
                placeholder="nome del soggetto..."
                onChange={(txt) => onChange(txt, "name")}
                value={giuridicalPerson.proprietorship?.name}
              />
              <RowSpacer />
              <InputTextStyled
                label="Cognome"
                tooltip="Inserisci il cognome"
                rules={[{ required: true, message: "Il cognome è obbligatorio" }]}
                placeholder="cognome del soggetto..."
                onChange={(txt) => onChange(txt, "lastname")}
                value={giuridicalPerson.proprietorship?.lastname}
              />
            </Row>
            <Row>
              <SelectStyled
                label="Sesso"
                tooltip="Seleziona Sesso"
                defaultValue="---"
                value={giuridicalPerson.proprietorship?.gender}
                onChange={(txt) => onChange(txt, "gender")}
                options={GenderTypes}
              />
              <RowSpacer />
              <DatePickerStyled
                label="Data di Nascita"
                tooltip="Seleziona la data di Nascita"
                placeholder="data di nascita ..."
                onChange={(txt) => onChange(txt, "birt.date")}
                value={giuridicalPerson.proprietorship?.birth.date}
                format={"DD/MM/YYYY"}
              />
            </Row>
            <Row>
              <InputTextStyled
                label="Luogo di Nascita"
                tooltip="Luogo di nascita"
                placeholder="nome del soggetto..."
                value={`${giuridicalPerson.proprietorship?.birth.city} - ${giuridicalPerson.proprietorship?.birth.province} - ${giuridicalPerson.proprietorship?.birth.country}`}
              />
              <BiEditAlt style={{ cursor: "pointer" }} />
            </Row>
            <Row>
              <FiscalCodeStyled
                label="Codice Fiscale"
                tooltip="Inserisci il codice fiscale"
                rules={[{ required: true, message: "Il codice fiscale è obbligatorio" }]}
                placeholder="codice fiscale..."
                onChange={(txt) => onChange(txt, "fiscalCode")}
                value={giuridicalPerson.proprietorship?.fiscalCode}
              />
            </Row>
          </>
        )}
      </>
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
