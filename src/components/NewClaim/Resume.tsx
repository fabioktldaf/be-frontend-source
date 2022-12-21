import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Spin, Button, Tooltip, Space } from "antd";
import styled from "styled-components";
import { BsPrinter } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaBackward } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineLocationOn } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import {
  AdditionalInfoDocTypes,
  AdditionalInfoPaymentTransfer,
  AdditionalInfoPaymentTypes,
  AdditionalInfoSubjectRoles,
  AllPartRoles,
  ForceReasons,
  insuranceCodesWithCodes,
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
import { setStatus } from "../../redux/features/newClaimSlice";
import { Col, Row } from "../../style/containers";
import { DatePickerStyled, InputTextStyled, SelectStyled, TimePickerStyled } from "../../style/Input";
import useApplication from "../../hooks/useApplication";
import { MainForm } from "../Layout/Forms";
import { SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";

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

const ResumeStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2em;
`;

const SpanSmall = styled.span`
  margin-right: 0.25em;
  font-weight: lighter;
`;

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

const Title = styled.div`
  background-color: #eee;
  padding: 0.25em 1em;
  text-transform: uppercase;
  font-weight: normal;
  margin: 1em 0 2em 0;
`;

interface ResumeProps {
  onBackward: () => void;
}

const Resume = (props: ResumeProps) => {
  const app = useApplication();
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
  const ownerNaturalPerson = policyData?.owner as SubjectNaturalPersonData;
  const ownerGiuridicalPerson = policyData?.owner as SubjectGiuridicalPersonData;

  if (!!ownerNaturalPerson.fiscalCode) {
    const owner = ownerNaturalPerson;
    ownerDetails = (
      <>
        <SpanSmall>{`${owner.name} ${owner.lastname},`}</SpanSmall>
        <SpanSmall>cod. fiscale</SpanSmall>
        <SpanSmall>{owner.fiscalCode} </SpanSmall>
        <br />
        <SpanSmall>Residente a</SpanSmall>
        <SpanSmall> </SpanSmall>
        <SpanSmall>provincia di</SpanSmall>
        <SpanSmall> </SpanSmall>
      </>
    );
  } else if (!!ownerGiuridicalPerson.pIva) {
    const owner = ownerGiuridicalPerson;
    ownerDetails = (
      <>
        <SpanSmall>{owner.business_name}</SpanSmall>
        <SpanSmall>Partiva IVA</SpanSmall>
        <SpanSmall>{owner.pIva}</SpanSmall>
        <br />
        <SpanSmall>Sede Legale a </SpanSmall>
        <SpanSmall> </SpanSmall>
        <SpanSmall>Provincia di</SpanSmall>
        <SpanSmall> </SpanSmall>
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
              <AddInfoValue>id: {subjectDetails.subject?.id}</AddInfoValue>
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
            <div style={{ width: "100%" }}>
              {contactDetails.email && (
                <AddInfoRow>
                  <AddInfoIcon>
                    <MdAlternateEmail />
                  </AddInfoIcon>
                  <div>Email:</div>
                  <AddInfoValue>{contactDetails.email}</AddInfoValue>
                </AddInfoRow>
              )}
              {contactDetails.phone && (
                <AddInfoRow>
                  <AddInfoIcon>
                    <GiSmartphone />
                  </AddInfoIcon>
                  <div>Telefono:</div>
                  <AddInfoValue>{contactDetails.phone}</AddInfoValue>
                </AddInfoRow>
              )}
              {contactDetails.shippingAddress && (
                <AddInfoRow>
                  <AddInfoIcon>
                    <MdOutlineLocationOn />
                  </AddInfoIcon>
                  <div>Indirizzo di spedizione:</div>
                  <AddInfoValue>{contactDetails.shippingAddress}</AddInfoValue>
                </AddInfoRow>
              )}
            </div>
          </div>
        );
    }
  };

  const renderTitle = <div>Verifica i Dati del Sinistro e Invia al Liquidatore</div>;
  const actions = [
    {
      label: "Invia",
      icon: <></>,
      execute: () => {
        console.log("invia");
      },
    },
    {
      label: "Stampa/PDF",
      icon: <BsPrinter />,
      execute: handlePrintResume,
    },
    {
      label: "Indietro",
      icon: <FaBackward />,
      execute: handleBackward,
    },
  ];

  return (
    <MainForm layout="vertical" title={renderTitle} actions={actions}>
      <ResumeStyled ref={printAreaRef} style={{ fontWeight: "lighter" }}>
        <Col>
          <Title>dati sinistro</Title>
          <Row>
            <Row>
              <InputTextStyled label="Sinistro n°" readOnly={true} value={claimData?.number} />
            </Row>
            <Row>
              <InputTextStyled label="Data Registrazione" readOnly={true} value={claimData?.registrationDate} />
            </Row>
          </Row>
          <Row>
            <Row>
              <DatePickerStyled
                label="Data Accadimento"
                tooltip="Seleziona la data di Accadimento"
                rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
                placeholder="data di accadimento ..."
                onChange={(val) => app.updateClaimData(val, "occurrenceDate")}
                value={claimData?.occurrenceDate}
                format={"DD/MM/YYYY"}
              />
            </Row>
            <Row>
              <TimePickerStyled
                label="Ora Accadimento"
                tooltip="Seleziona l'ora di accadimento..."
                rules={[{ required: true, message: "L'ora di accadimento è obbligatoria" }]}
                placeholder="ora di accadimento ..."
                format="HH:mm"
                onChange={(val: string) => app.updateClaimData(val, "occurrenceTime")}
                value={claimData?.occurrenceTime}
              />
            </Row>
          </Row>
          <Row>
            <InputTextStyled label="Luogo Accadimento" value={claimData?.occurrencePlace} />
          </Row>

          <Title>controparte</Title>
          {counterpartData?.isOwnerNaturalPerson && (
            <Row>
              <Row>
                <InputTextStyled
                  label="Proprietario nome"
                  tooltip="Inserisci il nome del proprietario della controparte"
                  rules={[{ required: true, message: "Il nome del proprietario della controparte è obbligatorio" }]}
                  placeholder="nome proprietario controparte ..."
                  value={counterpartData?.ownerName}
                  onChange={(txt) => app.updateCounterpartData(txt, "ownerName")}
                />
              </Row>
              <Row>
                <InputTextStyled
                  label="Proprietario cognome"
                  tooltip="Inserisci il cognome del proprietario della controparte"
                  rules={[{ required: true, message: "Il cognome del proprietario della controparte è obbligatorio" }]}
                  placeholder="nome proprietario controparte ..."
                  value={counterpartData?.ownerLastname}
                  onChange={(val) => app.updateCounterpartData(val, "ownerLastname")}
                />
              </Row>
            </Row>
          )}
          {!counterpartData?.isOwnerNaturalPerson && (
            <Row>
              <Row>
                <InputTextStyled
                  label="Ragione sociale"
                  tooltip="Inserisci la ragione sociale della controparte"
                  rules={[{ required: true, message: "La ragione sociale della controparte è obbligatorio" }]}
                  placeholder="ragione sociale controparte ..."
                  value={counterpartData?.ownerBusinessName}
                  onChange={(val) => app.updateCounterpartData(val, "ownerBusinessName")}
                />
              </Row>
              <Row> </Row>
            </Row>
          )}
          {counterpartData?.driverName ||
            (counterpartData?.driverLastname && (
              <Row>
                <Row>
                  <InputTextStyled
                    label="Conducente nome"
                    tooltip="Inserisci il nome del conducente della controparte"
                    placeholder="nome del conducente della controparte ..."
                    value={counterpartData?.driverName}
                    onChange={(val) => app.updateCounterpartData(val, "driverName")}
                  />
                </Row>
                <Row>
                  <InputTextStyled
                    label="Conducente Cognome"
                    tooltip="Inserisci il cognome conducente della controparte"
                    placeholder="cognome conducente della controparte ..."
                    value={counterpartData?.driverLastname}
                    onChange={(val) => app.updateCounterpartData(val, "driverLastname")}
                  />
                </Row>
              </Row>
            ))}

          <Row>
            <InputTextStyled
              label="Targa"
              tooltip="Inserisci la targa del veicolo della controparte"
              rules={[{ required: true, message: "La targa del veicolo della controparte è obbligatoria" }]}
              placeholder="targa ..."
              value={counterpartData?.plate}
              onChange={(val) => app.updateCounterpartData(val, "plate")}
            />

            <SelectStyled
              label="Compagnia Assicurativa"
              tooltip="Seleziona la compagnia assicurativa della controparte"
              defaultValue="---"
              showSearch
              filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
              value={counterpartData?.insuranceCode}
              onChange={(val) => app.updateCounterpartData(val, "insuranceCode")}
              options={insuranceCodesWithCodes}
            />
          </Row>
        </Col>

        <table>
          <tbody>
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
                const subjectNaturalPerson = dp.subject as SubjectNaturalPersonData;
                const subjectGiuridicalPerson = dp.subject as SubjectGiuridicalPersonData;
                const isSubjectNaturalPerson = !!subjectNaturalPerson.fiscalCode;
                const isSubjectGiuridicalPerson = !!subjectGiuridicalPerson.pIva;

                if (isSubjectNaturalPerson) {
                  dpNominative = `${subjectNaturalPerson.name} ${subjectNaturalPerson.lastname}, cod. fiscale ${subjectNaturalPerson.fiscalCode}`;
                  dpAddress = `Residente a ${subjectNaturalPerson.birth.city} provincia di ${subjectNaturalPerson.birth.province} - ${subjectNaturalPerson.birth.country}`;
                } else if (isSubjectGiuridicalPerson) {
                  dpNominative = `${subjectGiuridicalPerson.business_name}, partita iva ${subjectGiuridicalPerson.pIva}`;
                  dpAddress = `Sede legale ${subjectGiuridicalPerson.registeredOffice?.street} ${subjectGiuridicalPerson.registeredOffice?.civic} ${subjectGiuridicalPerson.registeredOffice?.city}}`;
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
      </ResumeStyled>
    </MainForm>
  );
};

export default Resume;
