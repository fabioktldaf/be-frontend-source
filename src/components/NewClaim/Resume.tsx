import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { Spin, Button, Tooltip } from "antd";
import styled from "styled-components";

import { ImFilePdf } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import { RiDeleteBinFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { AiOutlineContacts } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaBackward } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import {
  AdditionalInfoDocTypes,
  AdditionalInfoPaymentTransfer,
  AdditionalInfoPaymentTypes,
  AdditionalInfoSubjectRoles,
  AllPartRoles,
  ForceReasons,
  SignatureTypes,
  vehicleCollisionPoints,
  VehicleTypeOptions,
} from "../../config/const";
import {
  AdditionalInfoContactType,
  AdditionalInfoDataType,
  AdditionalInfoDocumentType,
  AdditionalInfoPaymentType,
  AdditionalInfoSubjectType,
  DamagedType,
  NewClaimStateType,
  PartDamagedDetailsPerson,
  PartDamagedDetailsThing,
  PartDamagedDetailsVehicle,
  SelectPair,
} from "../../types/new-claim.types";
import CarImpactSelector from "./CarImpactSelect";
import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import { t } from "i18next";
import moment from "moment";
import { insuranceCodes } from "../../config/dummy-data";
import { HiUserGroup } from "react-icons/hi";
import { CenteredRow } from "../../style/containers";
import { setStatus } from "../../redux/features/newClaimSlice";

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

const ResumeContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6em 6em;
  border-radius: 5px;
  box-shadow: 0 0 5px #aaa;
  background-color: white;
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

const SpanSmall = styled.span`
  margin-right: 0.25em;
  font-weight: lighter;
`;

const ReadonlyValue = styled.span``;

const DataRow = styled.div``;

const AddInfoIcon = styled.div`
  font-size: 1.4em;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1em;
  margin-bottom: 0.5em;
`;

const TdClaimDataLabel = styled.td`
  width: 16em;
  vertical-align: top;
  padding: 0.5em 0;
  text-transform: uppercase;
  font-size: 0.9em;
`;

const TdClaimDataValue = styled.td`
  font-weight: lighter;
  vertical-align: top;
  padding: 0.5em 0;
`;

const AddInfoRow = styled.div`
  display: flex;
  border-bottom: 1px dotted #eee;
  width: 100%;
  margin-bottom: 0.5em;
`;
const AddInfoValue = styled.div`
  flex: 1;
  text-align: right;
`;

interface ResumeProps {
  onBackward: () => void;
}

const Resume = (props: ResumeProps) => {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const printAreaRef = React.useRef<HTMLDivElement>(null);
  const { claimData, policyData, counterpartData, damagedParts, additionalInfo, responsability } = useSelector(
    (state: RootState) => state.newClaim
  );

  useEffect(() => {
    setTimeout(() => {
      setSaved(true);
    }, 2000);
  });

  const handlePrintResume = useReactToPrint({ content: () => printAreaRef.current });

  const handleBackward = () => {
    dispatch(setStatus(NewClaimStateType.AdditionalData));
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

  const policyFields = [
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
  ];

  const claimFields = [
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
  ];

  const counterpartFields = [
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
  ];

  const damagedPartsFields = (index: number, isOwnerNaturalPerson: boolean) =>
    isOwnerNaturalPerson
      ? [
          {
            label: "Nome",
            value: damagedParts[index].subject.natural_person?.name,
          },
          {
            label: "Cognome",
            value: damagedParts[index].subject.natural_person?.lastname,
          },
          {
            label: "Codice Fiscale",
            value: damagedParts[index].subject.natural_person?.fiscal_code,
          },
          {
            label: "Provincia di Residenza",
            value: damagedParts[index].subject.natural_person?.province_of_residence,
          },
          {
            label: "Comune di Residenza",
            value: damagedParts[index].subject.natural_person?.city_of_residence,
          },
        ]
      : [
          {
            label: "Ragione Sociale",
            value: damagedParts[index].subject.giuridical_person?.business_name,
          },
          {
            label: "Partita IVA",
            value: damagedParts[index].subject.giuridical_person?.iva,
          },
          {
            label: "Provincia di Sede",
            value: damagedParts[index].subject.giuridical_person?.registered_office_city,
          },
          {
            label: "Comune di Sede",
            value: damagedParts[index].subject.giuridical_person?.registered_office_city,
          },
        ];

  const damagedPartDamagesFields = (damage: DamagedType) => {
    let fields: SelectPair[] = [];
    const detailsVehicle = damage.details as PartDamagedDetailsVehicle;
    const detailsPerson = damage.details as PartDamagedDetailsPerson;
    const detailsThing = damage.details as PartDamagedDetailsThing;

    if (damage.damageType === "Vehicle") {
      fields = [
        ...fields,
        {
          label: "Targa",
          value: `${detailsVehicle.format} - ${detailsVehicle.plate}`,
        },
        {
          label: "Tipo Veicolo",
          value: VehicleTypeOptions.find((v) => v.value === detailsVehicle.type)?.label,
        },
        {
          label: "Punti di Collisione",
          value: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "4em" }}>
                {detailsVehicle.collisionPoints.map((cp) => vehicleCollisionPoints.find((p) => p.code === cp)?.label)}
              </div>
              <div style={{ transform: "scale(0.5)" }}>
                <CarImpactSelector readOnly={true} areas={detailsVehicle.collisionPoints} />
              </div>
            </div>
          ),
        },
        {
          label: "Note",
          value: detailsVehicle.note,
        },
      ];
    }

    if (damage.damageType === "Person") {
      fields = [
        ...fields,
        {
          label: "Parti Lesionate",
          value: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "4em" }}>
                {detailsPerson.personWoundedPoints?.map((w) => (
                  <div>{t(`person_injury_${w}`)}</div>
                ))}
              </div>
              <div style={{ transform: "scale(0.5)" }}>
                <DamagedPartPersonSelect readOnly={true} details={detailsPerson} />
              </div>
            </div>
          ),
        },
        {
          label: "Note",
          value: detailsPerson.note,
        },
      ];
    }

    if (damage.damageType === "Thing") {
      fields = [
        ...fields,
        {
          label: "Oggetto Danneggiato",
          value: detailsThing.note,
        },
      ];
    }

    return fields;
  };

  const renderDamagedPartAdditionalInfo = (damagedPartNumber: string) => {
    const addInfos = additionalInfo.filter((ai) => ai.damagedPartNumber === damagedPartNumber);
    if (addInfos.length < 1) return;

    let fields: SelectPair[] = [];

    addInfos.forEach((ai) => {
      switch (ai.type) {
        case "subject":
          const subjectDetails = ai.details as AdditionalInfoSubjectType;
          fields = [
            ...fields,
            {
              label: "Info Addizionali Soggetto",
              value: (
                <div>
                  <div>Ruolo : {AdditionalInfoSubjectRoles.find((r) => r.value === subjectDetails.role)?.label}</div>
                  <div>Nome : n.d.</div>
                </div>
              ),
            },
          ];
          break;
        case "document":
          const docDetails = ai.details as AdditionalInfoDocumentType;
          fields = [
            ...fields,
            {
              label: "Info Addizionali Documento",
              value: (
                <div>
                  Il veicolo A {t(`barem_label_${responsability?.barems.vehicleA}`)}
                  <div>Tipo : {AdditionalInfoDocTypes.find((r) => r.value === docDetails.type)?.label}</div>
                  {docDetails.filename.length === 1 ? (
                    <div>Nome File: {docDetails.filename.toString()}</div>
                  ) : (
                    <div>Nomi Files: {docDetails.filename.toString()}</div>
                  )}
                </div>
              ),
            },
          ];
          break;
        case "payment":
          const docPayment = ai.details as AdditionalInfoPaymentType;
          fields = [
            ...fields,
            {
              label: "Info Addizionali Pagamento",
              value: (
                <div>
                  <div>Tipo : {AdditionalInfoPaymentTypes.find((p) => p.value === docPayment.type)?.label}</div>
                  {docPayment.iban && <div>IBAN: {docPayment.iban}</div>}
                </div>
              ),
            },
          ];
          break;
        case "contact":
          const contactPayment = ai.details as AdditionalInfoContactType;
          fields = [
            ...fields,
            {
              label: "Info Addizionali Contatto",
              value: (
                <div>
                  {contactPayment.shippingAddress && (
                    <div>Indirizzo di Spedizione: {contactPayment.shippingAddress}</div>
                  )}
                  {contactPayment.email && <div>Email: {contactPayment.email}</div>}
                  {contactPayment.phone && <div>Telefono: {contactPayment.phone}</div>}
                </div>
              ),
            },
          ];
          break;
          break;
      }
    });

    return renderDetailsGroupData("", fields);
  };

  const responsabilityFields: SelectPair[] = [
    {
      label: "Veicolo A",
      value: t(`barem_label_${responsability?.barems.vehicleA}`),
    },
    {
      label: "Veicolo B",
      value: t(`barem_label_${responsability?.barems.vehicleB}`),
    },
    {
      label: "Tipo Responsabilità",
      value: t(`management_type_${responsability?.responsabilityType}`),
    },
    {
      label: "Percentuale Responsabilità",
      value: responsability?.responsabilityPercentage,
    },
  ];

  if (responsability?.forcedReason) {
    responsabilityFields.push({
      label: "Motivo Forzatura",
      value: ForceReasons.find((fr) => fr.value === responsability?.forcedReason)?.label,
    });
  }

  responsabilityFields.push({
    label: "Tipo Firma",
    value: SignatureTypes.find((st) => st.value === responsability?.signatureType)?.label,
  });

  let ownerDetails = <></>;
  if (policyData?.owner.natural_person) {
    const owner = policyData?.owner.natural_person;
    ownerDetails = (
      <>
        <SpanSmall>{`${owner.name} ${owner.lastname},`}</SpanSmall>
        <SpanSmall>cod. fiscale</SpanSmall>
        <SpanSmall>{owner.fiscal_code} </SpanSmall>
        <br />
        <SpanSmall>Residente a</SpanSmall>
        <SpanSmall>{owner.city_of_residence}</SpanSmall>
        <SpanSmall>provincia di</SpanSmall>
        <SpanSmall>{owner.province_of_residence}</SpanSmall>
      </>
    );
  } else if (policyData?.owner.giuridical_person) {
    const owner = policyData?.owner.giuridical_person;
    ownerDetails = (
      <>
        <SpanSmall>{owner.business_name}</SpanSmall>
        <SpanSmall>Partiva IVA</SpanSmall>
        <SpanSmall>{owner.iva}</SpanSmall>
        <br />
        <SpanSmall>Sede Legale a </SpanSmall>
        <SpanSmall>{owner.registered_office_city}</SpanSmall>
        <SpanSmall>Provincia di</SpanSmall>
        <SpanSmall>{owner.registered_office_province}</SpanSmall>
      </>
    );
  }

  let counterpartDetails = <></>;
  if (counterpartData?.isOwnerNaturalPerson) {
    counterpartDetails = (
      <>
        <SpanSmall>{`${counterpartData.ownerName} ${counterpartData.ownerLastname},`}</SpanSmall>
        <br />
        <SpanSmall>Veicolo targa</SpanSmall>
        <SpanSmall>
          {counterpartData.plate}
          <br />
        </SpanSmall>
        {counterpartData.driverName ||
          (counterpartData.driverLastname && (
            <>
              <SpanSmall>
                con alla guida ${counterpartData.driverName} ${counterpartData.driverLastname}
              </SpanSmall>
              <br />
            </>
          ))}
        <SpanSmall>
          Assicurato con {insuranceCodes.find((ic) => ic.value === counterpartData.insuranceCode)?.label} (cod.{" "}
          {counterpartData.insuranceCode})
        </SpanSmall>
      </>
    );
  } else if (counterpartData) {
    counterpartDetails = (
      <>
        <SpanSmall>{`${counterpartData.ownerBusinessName},`}</SpanSmall>
        <SpanSmall>veicolo targa</SpanSmall>
        <SpanSmall>{counterpartData.plate}</SpanSmall>
        <br />
        {counterpartData.driverName ||
          (counterpartData.driverLastname && (
            <>
              <SpanSmall>
                con alla guida ${counterpartData.driverName} ${counterpartData.driverLastname}
              </SpanSmall>
              <br />
            </>
          ))}
      </>
    );
  }

  const renderAdditionalInfo = (ai: AdditionalInfoDataType) => {
    switch (ai.type) {
      case "subject":
        const subjectDetails = ai.details as AdditionalInfoSubjectType;

        return (
          <div
            style={{
              display: "flex",
              fontWeight: "lighter",
              alignItems: "center",
              fontSize: "0.9em",
            }}
          >
            <AddInfoIcon>
              <SlUser style={{ fontSize: "0.9em" }} />
            </AddInfoIcon>
            <AddInfoRow>
              <div>{AdditionalInfoSubjectRoles.find((r) => r.value === subjectDetails.role)?.label}</div>
              <AddInfoValue>{subjectDetails.personalData || " [nome cognome]"}</AddInfoValue>
            </AddInfoRow>
          </div>
        );
      case "document":
        const documentDetails = ai.details as AdditionalInfoDocumentType;
        return (
          <div
            style={{
              display: "flex",
              fontWeight: "lighter",
              alignItems: "center",
              fontSize: "0.9em",
            }}
          >
            <AddInfoIcon>
              <HiOutlineDocumentText />
            </AddInfoIcon>
            {AdditionalInfoDocTypes.find((d) => d.value === documentDetails.type)?.label}
          </div>
        );
      case "payment":
        const paymentDetails = ai.details as AdditionalInfoPaymentType;
        return (
          <div
            style={{
              display: "flex",
              fontWeight: "lighter",
              alignItems: "center",
              fontSize: "0.9em",
            }}
          >
            <AddInfoIcon>
              <RiMoneyEuroCircleLine />
            </AddInfoIcon>
            <AddInfoRow>
              <div>{AdditionalInfoPaymentTypes.find((p) => p.value === paymentDetails.type)?.label}</div>
              <AddInfoValue>
                {paymentDetails.type === AdditionalInfoPaymentTransfer.value && " IBAN: " + paymentDetails.iban}
              </AddInfoValue>
            </AddInfoRow>
          </div>
        );
      case "contact":
        const contactDetails = ai.details as AdditionalInfoContactType;

        return (
          <div
            style={{
              display: "flex",
              fontWeight: "lighter",
              alignItems: "flex-start",
              fontSize: "0.9em",
            }}
          >
            <AddInfoIcon>
              <AiOutlineContacts />
            </AddInfoIcon>
            <div style={{ width: "100%" }}>
              {contactDetails.email && (
                <AddInfoRow>
                  <div>Email:</div>
                  <AddInfoValue>{contactDetails.email}</AddInfoValue>
                </AddInfoRow>
              )}
              {contactDetails.phone && (
                <AddInfoRow>
                  <div>Telefono:</div>
                  <AddInfoValue>{contactDetails.phone}</AddInfoValue>
                </AddInfoRow>
              )}
              {contactDetails.shippingAddress && (
                <AddInfoRow>
                  <div>Indirizzo di spedizione:</div>
                  <AddInfoValue>{contactDetails.shippingAddress}</AddInfoValue>
                </AddInfoRow>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <ResumeContainer>
      {!saved && (
        <LoaderContainer>
          <Spin size="large" />
          <LoaderMessage> Salvataggio delle informazioni addizionali in corso...</LoaderMessage>
        </LoaderContainer>
      )}
      {saved && (
        <div>
          <div style={{ display: "flex", marginBottom: "1em" }}>
            <Tooltip title="Modifica Informazioni Addizionali">
              <Button
                icon={<FaBackward />}
                onClick={handleBackward}
                type="primary"
                shape="circle"
                style={{ paddingTop: "4px" }}
              ></Button>
            </Tooltip>
            <div style={{ width: "1em", height: "1em" }}> </div>
            <Tooltip title="Stampa o salva in PDF">
              <Button
                icon={<BsPrinter />}
                onClick={handlePrintResume}
                type="primary"
                shape="circle"
                style={{ paddingTop: "4px" }}
              ></Button>
            </Tooltip>
            <div style={{ flex: "1", height: "1em" }}> </div>
          </div>
          <ResumeContent ref={printAreaRef}>
            <div
              style={{
                display: "flex",
                textTransform: "uppercase",
                marginBottom: "2em",
                borderBottom: "5px double #eee",
              }}
            >
              <h3 style={{ flex: 1 }}>Riepilogo del sinistro n° {claimData?.number} </h3>
              <div> registrato il giorno {moment(Date.now()).format("DD/MM/YYYY")}</div>
            </div>

            <table>
              <tbody>
                <tr>
                  <TdClaimDataLabel>Polizza n°: </TdClaimDataLabel>
                  <TdClaimDataValue style={{ fontWeight: "lighter" }}>{policyData?.policy_number}</TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel>Proprietario del veicolo: </TdClaimDataLabel>
                  <TdClaimDataValue>{ownerDetails}</TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel>Data e luogo accadimento:</TdClaimDataLabel>
                  <TdClaimDataValue>
                    <SpanSmall style={{ marginLeft: "0.5em" }}>
                      {claimData?.occurrenceDate} alle ore {claimData?.occurrenceTime} in località{" "}
                      {claimData?.occurrencePlace}
                    </SpanSmall>
                  </TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel>Note ANIA: </TdClaimDataLabel>
                  <TdClaimDataValue>{claimData?.note}</TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel>Controparte: </TdClaimDataLabel>
                  <TdClaimDataValue>{counterpartDetails}</TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel>Caso Circostanza: </TdClaimDataLabel>
                  <TdClaimDataValue>
                    <div>Il veicolo A {t(`barem_label_${responsability?.barems.vehicleA}`)}</div>
                    <div>Il veicolo B {t(`barem_label_${responsability?.barems.vehicleB}`)}</div>
                  </TdClaimDataValue>
                </tr>
                {responsability?.forcedReason && (
                  <tr>
                    <TdClaimDataLabel style={{ verticalAlign: "top" }}>Motivo Forzatura: </TdClaimDataLabel>
                    <TdClaimDataValue>
                      {ForceReasons.find((fr) => fr.value === responsability?.forcedReason)?.label}
                    </TdClaimDataValue>
                  </tr>
                )}
                <tr>
                  <TdClaimDataLabel style={{ verticalAlign: "top" }}>Responsabilità: </TdClaimDataLabel>
                  <TdClaimDataValue>
                    {t(`management_type_${responsability?.responsabilityType}`)}
                    <span style={{ margin: "0 0.25em" }}>-</span>
                    <span>{responsability?.responsabilityPercentage}</span>
                  </TdClaimDataValue>
                </tr>
                <tr>
                  <TdClaimDataLabel style={{ verticalAlign: "top" }}>Tipo Firma: </TdClaimDataLabel>
                  <TdClaimDataValue style={{ fontWeight: "lighter" }}>
                    {SignatureTypes.find((st) => st.value === responsability?.signatureType)?.label}
                  </TdClaimDataValue>
                </tr>
              </tbody>
            </table>
            <p>
              <br />
            </p>
            <table>
              <tbody>
                {damagedParts &&
                  damagedParts.map((dp, i) => {
                    let dpNominative = "";
                    let dpAddress = "";
                    if (dp.subject.natural_person) {
                      const subject = dp.subject.natural_person;
                      dpNominative = `${subject.name} ${subject.lastname}, cod. fiscale ${subject.fiscal_code}`;
                      dpAddress = `Residente a ${subject.city_of_residence} provincia di ${subject.province_of_residence}`;
                    } else if (dp.subject.giuridical_person) {
                      const subject = dp.subject.giuridical_person;
                      dpNominative = `${subject.business_name}, partita iva ${subject.iva}`;
                      dpAddress = `Sede legale ${subject.registered_office_city} provincia di ${subject.registered_office_province}`;
                    }

                    const vehicleDamage = dp.damages.find((damage) => damage.damageType === "Vehicle")
                      ?.details as PartDamagedDetailsVehicle;
                    const personDamage = dp.damages.find((damage) => damage.damageType === "Person")
                      ?.details as PartDamagedDetailsPerson;
                    const objectsDamage: PartDamagedDetailsThing[] = dp.damages
                      .filter((damage) => damage.damageType === "Thing")
                      .map((d) => d.details as PartDamagedDetailsThing);

                    const addInfo = additionalInfo.filter((ai) => ai.damagedPartNumber === dp.pdNumber);

                    const vehiclePersoneBorder = vehicleDamage && personDamage;

                    return (
                      <>
                        <tr>
                          <td colSpan={2}>
                            <h4
                              style={{
                                fontSize: "1em",
                                padding: "0.2em 2em 0.1em 2em",
                                textTransform: "uppercase",
                                backgroundColor: "#f5f5f5",
                              }}
                            >
                              Partita di Danno - {AllPartRoles.find((r) => r.value === dp.roleType)?.label}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td style={{ fontWeight: "lighter", padding: "0 2em" }}>
                            {dpNominative}, {dpAddress}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td style={{ padding: "0 2em" }}>
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  flex: "1",
                                  width: "250px",
                                  borderRight: `${vehiclePersoneBorder ? "2px dashed #eee" : "none"}`,
                                }}
                              >
                                {vehicleDamage && (
                                  <>
                                    <div
                                      style={{
                                        fontWeight: "lighter",
                                        textTransform: "uppercase",
                                        fontSize: "0.9em",
                                        marginTop: "1em",
                                        marginBottom: "1em",
                                        alignItems: "center",
                                        backgroundColor: "#f5f5f5",
                                        padding: "0 1em",
                                        textAlign: "center",
                                      }}
                                    >
                                      danni al veicolo
                                    </div>
                                    <div style={{ transform: "scale(0.5) translateY(-50%)", height: "190px" }}>
                                      <CarImpactSelector readOnly={true} areas={vehicleDamage.collisionPoints} />
                                    </div>
                                    <ul style={{ fontWeight: "lighter" }}>
                                      {vehicleDamage.collisionPoints.map((cp) => (
                                        <li>{vehicleCollisionPoints.find((p) => p.code === cp)?.label}</li>
                                      ))}
                                    </ul>
                                    {vehicleDamage.note && (
                                      <div
                                        style={{
                                          fontWeight: "lighter",
                                          marginTop: "1em",
                                          fontSize: "0.9em",
                                          textAlign: "justify",
                                          paddingRight: "1em",
                                        }}
                                      >
                                        NOTE: {vehicleDamage.note}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>

                              {personDamage && (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flex: "1",
                                    width: "250px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: "lighter",
                                      textTransform: "uppercase",
                                      fontSize: "0.9em",
                                      marginTop: "1em",
                                      marginBottom: "1em",
                                      alignItems: "center",
                                      backgroundColor: "#f5f5f5",
                                      padding: "0 1em",
                                      textAlign: "center",
                                    }}
                                  >
                                    danni alla persona
                                  </div>
                                  <div style={{ transform: "scale(0.5) translateY(-100%)", height: "190px" }}>
                                    <DamagedPartPersonSelect readOnly={true} details={personDamage} />
                                  </div>
                                  <div
                                    style={{
                                      fontWeight: "lighter",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <ul>
                                      {personDamage.personWoundedPoints.map((w) => (
                                        <li>{t(`person_injury_${w}`)}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  {personDamage.note && (
                                    <div
                                      style={{
                                        fontWeight: "lighter",
                                        marginTop: "1em",
                                        fontSize: "0.9em",
                                        textAlign: "justify",
                                        paddingLeft: "1em",
                                      }}
                                    >
                                      NOTE: {personDamage.note}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>

                        {objectsDamage?.length > 0 && (
                          <tr>
                            <td></td>
                            <td style={{ padding: "0 2em" }}>
                              <div>
                                <div
                                  style={{
                                    fontWeight: "lighter",
                                    textTransform: "uppercase",
                                    fontSize: "0.9em",
                                    marginTop: "1em",
                                    marginBottom: "1em",
                                    alignItems: "center",
                                    backgroundColor: "#f5f5f5",
                                    padding: "0 1em",
                                  }}
                                >
                                  danni alle cose
                                </div>
                                <div>
                                  <ul style={{ fontWeight: "lighter" }}>
                                    {objectsDamage.map((od: PartDamagedDetailsThing) => (
                                      <li>{od.note}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {addInfo?.length > 0 && (
                          <tr>
                            <td></td>
                            <td style={{ padding: "0 2em" }}>
                              <div>
                                <div
                                  style={{
                                    fontWeight: "lighter",
                                    textTransform: "uppercase",
                                    fontSize: "0.9em",
                                    marginTop: "1em",
                                    marginBottom: "1em",
                                    alignItems: "center",
                                    backgroundColor: "#f5f5f5",
                                    padding: "0 1em",
                                  }}
                                >
                                  Informazioni Addizionali
                                </div>
                                <div style={{ paddingLeft: "1em", marginBottom: "1em" }}>
                                  {addInfo.map((ai: AdditionalInfoDataType) => renderAdditionalInfo(ai))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {i < damagedParts.length - 1 && (
                          <tr>
                            <td>
                              <div style={{ height: "3em" }}></div>
                            </td>
                            <td></td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </ResumeContent>
        </div>
      )}
    </ResumeContainer>
  );
};

export default Resume;
