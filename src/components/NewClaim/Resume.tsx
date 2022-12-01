import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

import { ImFilePdf } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";

import { MainForm } from "../Layout/Forms";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

const ResumeContainer = styled.div`
  width: 900px;
  display: flex;
  flex-align: column;
  justify-content: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
`;

const LoaderMessage = styled.div`
  color: #333;
  margin-left: 2em;
`;

const ResumeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 0;

  h3 {
    text-transform: uppercase;
    background-color: #eee;
  }
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

interface ResumeProps {
  onBackward: () => void;
}

const Resume = (props: ResumeProps) => {
  const [saved, setSaved] = useState(false);
  const { claimData, policyData, counterpartData } = useSelector((state: RootState) => state.newClaim);

  useEffect(() => {
    setTimeout(() => {
      setSaved(true);
    }, 2000);
  });

  const actions = [
    {
      label: "Salva PDF",
      icon: <ImFilePdf />,
      execute: () => {
        console.log("save as PDF");
      },
    },
    {
      label: "Stampa",
      icon: <BsPrinter />,
      execute: () => {
        console.log("Stampa");
      },
    },
  ];

  const modalTitle = <>{`Riepilogo Sinistro N° ${claimData?.number}`}</>;

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

  return (
    <ResumeContainer>
      {!saved && (
        <LoaderContainer>
          <Spin size="large" />
          <LoaderMessage> Salvataggio delle informazioni addizionali in corso...</LoaderMessage>
        </LoaderContainer>
      )}
      {saved && (
        <MainForm layout="vertical" title={modalTitle} actions={actions}>
          <ResumeSection>
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

            {policyData?.owner.natural_person && renderNaturalPerson("PROPRIETARIO", policyData?.owner.natural_person)}
            {policyData?.owner.giuridical_person &&
              renderGiuridicalPerson("PROPRIETARIO", policyData?.owner.giuridical_person)}

            {renderDetailsGroupData("SINISTRO", [
              {
                label: "Numero Sinistro",
                value: claimData?.number,
              },
              {
                label: "Data Registrazione ",
                value: claimData?.registrationDate,
              },
              {
                label: "Data Ora Accadimento",
                value: `${claimData?.occurrenceDate} ${claimData?.occurrenceTime}`,
              },
              {
                label: "Luogo Accadimento",
                value: claimData?.occurrencePlace,
              },
              {
                label: "Note ANIA",
                value: claimData?.note,
              },
            ])}

            {renderDetailsGroupData("CONTROPARTE", [
              {
                label: "Nominativo",
                value: counterpartData?.isOwnerNaturalPerson
                  ? `${counterpartData.ownerName} ${counterpartData.ownerLastname}`
                  : counterpartData?.ownerBusinessName,
              },
              {
                label: "Conducente",
                value:
                  counterpartData?.driverName || counterpartData?.driverLastname
                    ? `${counterpartData?.driverName} ${counterpartData?.driverLastname}`
                    : "n.d.",
              },
              {
                label: "Targa",
                value: counterpartData?.plate,
              },
              {
                label: "Compagnia Assicurativa",
                value: counterpartData?.insuranceCode,
              },
              {
                label: "Note ANIA",
                value: claimData?.note,
              },
            ])}
          </ResumeSection>
        </MainForm>
      )}
    </ResumeContainer>
  );
};

export default Resume;
