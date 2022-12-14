import React, { useEffect, useState } from "react";
import { Modal, Button, Tooltip } from "antd";
import styled from "styled-components";
import useApplication from "../../hooks/useApplication";
import useSelection from "antd/lib/table/hooks/useSelection";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  AdditionalInfoContact,
  AdditionalInfoDoc,
  AdditionalInfoDocTypes,
  AdditionalInfoPayment,
  AdditionalInfoPaymentTypes,
  AdditionalInfoSubject,
  AdditionalInfoSubjectRoles,
  AllPartRoles,
  vehicleCollisionPoints,
} from "../../config/const";
import {
  AdditionalInfoContactType,
  AdditionalInfoDocumentType,
  AdditionalInfoPaymentType,
  AdditionalInfoSubjectType,
  DamagedPartType,
  PartDamagedDetailsPerson,
  PartDamagedDetailsVehicle,
} from "../../types/new-claim.types";
import { useTranslation } from "react-i18next";
import { MainForm } from "../Layout/Forms";
import { IoBodyOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { BiCar, BiEditAlt } from "react-icons/bi";
import { RiDeleteBinFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { AiOutlineContacts } from "react-icons/ai";
import { SlUser } from "react-icons/sl";
import { HiOutlineDocumentText } from "react-icons/hi";
import AdditionalInfoModalContent from "./AdditionaInfoModalContent";
import TabSubject from "../PolicyManualInsert/TabSubject";
import { CenteredRow } from "../../style/containers";
import { clearLocalStorage } from "../../redux/features/newClaimSlice";
import {
  EditingSubjectState,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";

const DamagedPartsTable = styled.table`
  width: 90%;
  margin: 2em 5%;
`;

const DamagedPartResume = styled.tr`
  background-color: #a4f7d8;
`;

const DamagedPartResumeTd = styled.td`
  padding: 1em 1em;
`;

const DamangeIconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  color: #888;

  span {
    margin-right: 0.5em;
  }
`;

const ButtonAddInfo = styled(Button)`
  margin-left: 2em;
  cursor: pointer;
`;

const TooltipContainer = styled.div`
  padding: 0.5em 1em;

  .title {
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 1em;
  }

  .subtitle {
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 1px;
  }
`;

const AddInfoResume = styled.td`
  padding-right: 2em;
  border-bottom: 1px dotted #eee;
`;

const TdBorderBottom = styled.td`
  border-bottom: 1px dotted #eee;
`;

const TrAdditionalInfo = styled.tr`
  font-size: 0.9em;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonEditAddInfo = styled(BiEditAlt)`
  color: #888;
  margin: 0.5em;
  font-size: 1.4em;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const ButtonDeleteAddInfo = styled(RiDeleteBinFill)`
  color: #888;
  margin: 0.5em;
  font-size: 1.4em;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const AddInfoIcon = styled.div`
  font-size: 1.8em;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1em;
`;

interface AdditionalDataProps {
  onSend: () => void;
}

const AdditionalInfo = (props: AdditionalDataProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDamagedPartIndex, setActiveDamagedPartIndex] = useState(-1);
  const [activeAdditionalInfoIndex, setActiveAdditionalInfoIndex] = useState(-1);
  const claimData = useSelector((state: RootState) => state.newClaim);
  const { damagedParts, additionalInfo } = claimData;
  const [editingSubject, setEditingSubject] = useState<EditingSubjectState | undefined>();

  const handleAddAdditionalInfo = (index: number) => {
    setActiveDamagedPartIndex(index);
    setActiveAdditionalInfoIndex(-1);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveDamagedPartIndex(-1);
  };

  const handleDeleteAdditionalInfo = (id: number) => {
    app.removeAdditionalInfo(id);
  };

  const handleEditAdditionalInfo = (damagePartIndex: number, addInfoId: number) => {
    let additionalInfoIndex = -1;

    additionalInfo.forEach((ai, index) => {
      if (ai.id === addInfoId) {
        additionalInfoIndex = index;
      }
    });

    setActiveDamagedPartIndex(damagePartIndex);
    setActiveAdditionalInfoIndex(additionalInfoIndex);
    setModalOpen(true);
  };

  const handleOnSave = () => {
    app.clearLocalStorage();
    props.onSend();
  };
  const handleEditSubject = (id: string | undefined) => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.id = id;
    updatedEditingSubject.type = "edit-subject";
    updatedEditingSubject.modalOpen = true;
    setEditingSubject(updatedEditingSubject);
  };

  const handleCloseEditingSubject = () => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.modalOpen = false;
    setEditingSubject(updatedEditingSubject);
  };

  const renderDamagedPartResume = (p: DamagedPartType, index: number) => {
    const managementType = t(`management_type_${claimData.responsability?.responsabilityType}`);
    const roleLabel = AllPartRoles.find((r) => r.value === p.roleType)?.label || "";
    let nominative = '"Nome Cognome"';

    const subjectNaturalPerson = p.subject as SubjectNaturalPersonData;
    const subjectGiuridicalPerson = p.subject as SubjectGiuridicalPersonData;
    const isSubjectNaturalPerson = !!subjectNaturalPerson.fiscalCode;
    const isSubjectGiuridicalPerson = !!subjectGiuridicalPerson.pIva;

    if (isSubjectNaturalPerson) {
      const { name, lastname } = subjectNaturalPerson;
      nominative = `${name} ${lastname}`;
    } else if (isSubjectGiuridicalPerson) {
      nominative = subjectGiuridicalPerson.business_name;
    }

    const vehicleDamages = p.damages.find((d) => d.damageType === "Vehicle");
    const collisionPoints = vehicleDamages ? (vehicleDamages.details as PartDamagedDetailsVehicle).collisionPoints : [];
    const collisionPointsLabel = collisionPoints.map(
      (cp) => vehicleCollisionPoints.find((vcp) => vcp.code === cp)?.label
    );
    const liCollisionPoints = collisionPointsLabel.map((cpl, i) => <li key={i}>{cpl}</li>);
    const tooltipDamagesVehicle = (
      <TooltipContainer>
        <div className="title">Punti di Collisione</div>
        <ul>{liCollisionPoints}</ul>
      </TooltipContainer>
    );

    const personDamages = p.damages.find((d) => d.damageType === "Person");
    const wounds = personDamages ? (personDamages.details as PartDamagedDetailsPerson).personWoundedPoints : [];
    const woundsLabelFront = wounds.filter((w) => w.indexOf("front") >= 0).map((w) => t(`person_injury_${w}`));
    const woundsLabelRear = wounds.filter((w) => w.indexOf("rear") >= 0).map((w) => t(`person_injury_${w}`));
    const liWoundsFront = woundsLabelFront.map((wl, i) => <li key={i}>{wl}</li>);
    const liWoundsRear = woundsLabelRear.map((wl, i) => <li key={i}>{wl}</li>);
    const tooltipDamagePerson = (
      <TooltipContainer>
        <div className="title">Danni alla Persona</div>
        {liWoundsFront.length > 0 && (
          <>
            <div className="subtitle">Frontali</div>
            <ul>{liWoundsFront}</ul>
          </>
        )}
        {liWoundsRear.length > 0 && (
          <>
            <div className="subtitle">Retro</div>
            <ul>{liWoundsRear}</ul>
          </>
        )}
      </TooltipContainer>
    );

    const liThingDamages = p.damages
      .filter((d) => d.damageType === "Thing")
      .map((d, i) => <li key={i}>{d.details.note}</li>);
    const howManyThingDamages = liThingDamages.length;
    const tooltipDamagesThings = (
      <TooltipContainer>
        <div className="title">Danni alle Cose</div>
        <ul>{liThingDamages}</ul>
      </TooltipContainer>
    );

    return (
      <DamagedPartResume>
        <DamagedPartResumeTd
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => handleEditSubject(p?.subject?.id)}
        >
          {nominative}
        </DamagedPartResumeTd>
        <DamagedPartResumeTd>{roleLabel}</DamagedPartResumeTd>
        <DamagedPartResumeTd>{managementType}</DamagedPartResumeTd>

        <td>
          {collisionPoints.length > 0 && (
            <Tooltip title={tooltipDamagesVehicle}>
              <DamangeIconStyled>
                <BiCar />
              </DamangeIconStyled>
            </Tooltip>
          )}
        </td>
        <td>
          {wounds.length > 0 && (
            <Tooltip title={tooltipDamagePerson}>
              <DamangeIconStyled>
                <IoBodyOutline />
              </DamangeIconStyled>
            </Tooltip>
          )}
        </td>
        <td>
          {liThingDamages.length > 0 && (
            <Tooltip title={tooltipDamagesThings}>
              <DamangeIconStyled>
                <span style={{ fontSize: "0.6em" }}>{howManyThingDamages > 1 ? howManyThingDamages : ""}</span>
                <BsBox />
              </DamangeIconStyled>
            </Tooltip>
          )}
        </td>
        <td></td>
      </DamagedPartResume>
    );
  };

  const renderResumeSubject = (subjetDetails: AdditionalInfoSubjectType) => {
    const naturalPersonDetails = subjetDetails.subject as SubjectNaturalPersonData;
    const giuridicalPersonDetails = subjetDetails.subject as SubjectGiuridicalPersonData;

    const role = AdditionalInfoSubjectRoles.find((r) => r.value === subjetDetails.role)?.label;

    let nominative = "";

    if (naturalPersonDetails?.name?.length > 0) nominative = naturalPersonDetails?.name;
    if (naturalPersonDetails?.lastname?.length > 0) nominative += " " + naturalPersonDetails?.lastname;
    if (giuridicalPersonDetails?.business_name?.length > 0) nominative = giuridicalPersonDetails.business_name;

    return (
      <>
        <SlUser
          style={{
            fontSize: "1.4em",
            color: "#bbb",
            verticalAlign: "sub",
            marginRight: "0.5em",
          }}
        />
        {`${role} - ${nominative}`}
      </>
    );
  };

  const renderResumeDocument = (documentDetails: AdditionalInfoDocumentType) => {
    const docType = AdditionalInfoDocTypes.find((r) => r.value === documentDetails.type)?.label;
    const filename = "fronte.jpg, retro.jpg";
    return (
      <>
        <HiOutlineDocumentText
          style={{
            fontSize: "1.4em",
            color: "#bbb",
            verticalAlign: "sub",
            marginRight: "0.5em",
          }}
        />
        {`${docType} : ${filename}`}
      </>
    );
  };

  const renderResumePayment = (paymentDetails: AdditionalInfoPaymentType) => {
    const paymentType = AdditionalInfoPaymentTypes.find((r) => r.value === paymentDetails.type)?.label;
    const iban = paymentDetails.iban ? ` - IBAN ${paymentDetails.iban}` : "";
    return (
      <>
        <RiMoneyEuroCircleLine
          style={{
            fontSize: "1.4em",
            color: "#bbb",
            verticalAlign: "sub",
            marginRight: "0.5em",
          }}
        />
        {`${paymentType} ${iban}`}
      </>
    );
  };

  const renderResumeContact = (contactDetails: AdditionalInfoContactType) => {
    const shippingAddress = contactDetails.shippingAddress ? `${contactDetails.shippingAddress}` : "";
    const email = contactDetails.email ? ` - ${contactDetails.email}` : "";
    const phone = contactDetails.phone ? ` - tel. ${contactDetails.phone}` : "";

    return (
      <>
        <AiOutlineContacts
          style={{
            fontSize: "1.4em",
            color: "#bbb",
            verticalAlign: "sub",
            marginRight: "0.5em",
          }}
        />
        {`${shippingAddress} ${email} ${phone}`}
      </>
    );
  };

  const renderPreferredInfo = () => {
    const preferredAddress = {
      type: "shipping",
      street: "Via Giotto",
      civic: "111",
      cap: "37030",
      city: "Velo Veronese",
      province: "VR",
      country: "Italia",
    };

    const preferredContact = {
      type: "phone",
      value: "0368 6001893",
    };
    const preferredPayment = {
      type: "transfer",
      iban: "NL09ABNA5766671156",
    };

    let preferredAddressLabel = "";
    let preferredAddressValue = "";

    if (preferredAddress) {
      preferredAddressLabel = "Indirizzo di Spedizione";
      preferredAddressValue = `${preferredAddress.street} ${preferredAddress.civic}, ${preferredAddress.cap} ${preferredAddress.city} - ${preferredAddress.province} ${preferredAddress.country}`;
    }

    let preferredContactLabel = "";
    let preferredContactValue = "";

    if (preferredContact) {
      preferredContactLabel = "Telefono";
      preferredContactValue = preferredContact.value;
    }

    let preferredPaymentLabel = "";
    let preferredPaymentValue = "";

    if (preferredPayment) {
      preferredPaymentLabel = "Bonifico";
      preferredPaymentValue = `IBAN ${preferredPayment.iban}`;
    }

    return (
      <>
        {preferredAddress && (
          <TrAdditionalInfo style={{ backgroundColor: "#fafafa" }}>
            <td style={{ textTransform: "uppercase", fontSize: "0.9em", padding: "0.5em 0 0.5em 3em" }}>
              {preferredAddressLabel} preferito:
            </td>
            <td colSpan={6}>{preferredAddressValue}</td>
          </TrAdditionalInfo>
        )}
        {preferredContact && (
          <TrAdditionalInfo style={{ backgroundColor: "#fafafa" }}>
            <td style={{ textTransform: "uppercase", fontSize: "0.9em", padding: "0.5em 0 0.5em 3em" }}>
              {preferredContactLabel} preferito:
            </td>
            <td colSpan={6}>{preferredContactValue}</td>
          </TrAdditionalInfo>
        )}
        {preferredPayment && (
          <TrAdditionalInfo style={{ backgroundColor: "#fafafa" }}>
            <td style={{ textTransform: "uppercase", fontSize: "0.9em", padding: "0.5em 0 0.5em 3em" }}>
              Metodo di pagamento preferito:{" "}
            </td>
            <td colSpan={6}>
              {preferredPaymentLabel} {preferredPaymentValue}
            </td>
          </TrAdditionalInfo>
        )}
      </>
    );
  };

  const renderAdditionalInfo = (pdNumber: string, pdIndex: number) => {
    const pdAdditionalInfo = additionalInfo.filter((ai) => ai.damagedPartNumber === pdNumber);

    return (
      <>
        {renderPreferredInfo()}
        <tr>
          <td
            colSpan={7}
            style={{
              textTransform: "uppercase",
              fontSize: "0.9em",
              letterSpacing: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                backgroundColor: "#fff4e6",
                padding: "0.5em 0 0.5em 5em",
                marginTop: "0.25em",
              }}
            >
              <div style={{ flex: 1 }}>informazioni addizionali</div>

              <Tooltip title="Aggiungi Informazioni">
                <ButtonAddInfo
                  style={{
                    float: "right",
                    marginRight: "2.2em",
                  }}
                  type="primary"
                  shape="circle"
                  size="small"
                  onClick={() => handleAddAdditionalInfo(pdIndex)}
                >
                  +
                </ButtonAddInfo>
              </Tooltip>
            </div>
          </td>
        </tr>
        {pdAdditionalInfo.map((ai, i) => (
          <TrAdditionalInfo key={i}>
            <AddInfoResume colSpan={6} style={{ paddingLeft: "6em" }}>
              {ai.type === AdditionalInfoSubject.value && renderResumeSubject(ai.details as AdditionalInfoSubjectType)}
              {ai.type === AdditionalInfoDoc.value && renderResumeDocument(ai.details as AdditionalInfoDocumentType)}
              {ai.type === AdditionalInfoPayment.value && renderResumePayment(ai.details as AdditionalInfoPaymentType)}
              {ai.type === AdditionalInfoContact.value && renderResumeContact(ai.details as AdditionalInfoContactType)}
            </AddInfoResume>
            <TdBorderBottom>
              <ButtonEditAddInfo onClick={() => handleEditAdditionalInfo(pdIndex, ai.id)} />
              <ButtonDeleteAddInfo onClick={() => handleDeleteAdditionalInfo(ai.id)} />
            </TdBorderBottom>
          </TrAdditionalInfo>
        ))}
      </>
    );
  };

  return (
    <MainForm
      layout="vertical"
      title={<>Informazioni Addizionali</>}
      actions={[
        {
          label: "Salva",
          execute: () => {},
        },
        {
          label: "Invia al Liquidatore",
          execute: handleOnSave,
        },
      ]}
    >
      <>
        <DamagedPartsTable>
          <tbody>
            {damagedParts.map((part, i) => {
              return (
                <>
                  {renderDamagedPartResume(part, i)}
                  {renderAdditionalInfo(part.pdNumber, i)}
                  <tr>
                    <td colSpan={7} style={{ height: "4em" }}></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </DamagedPartsTable>
        <Modal
          title="Inserisci Info Addizionali per la partita di danno"
          open={modalOpen}
          width={900}
          footer={null}
          onCancel={handleCloseModal}
        >
          <AdditionalInfoModalContent
            damagedPartIndex={activeDamagedPartIndex}
            onClose={handleCloseModal}
            index={activeAdditionalInfoIndex}
          />
        </Modal>
        <SubjectEditModal
          isOpen={editingSubject?.modalOpen}
          id={editingSubject?.id}
          onOk={() => {}}
          onCancel={() => handleCloseEditingSubject()}
        />
      </>
    </MainForm>
  );
};

export default AdditionalInfo;
