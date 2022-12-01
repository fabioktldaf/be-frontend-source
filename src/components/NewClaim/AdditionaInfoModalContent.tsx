import { Button } from "antd";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  AdditionalInfoContact,
  AdditionalInfoDoc,
  AdditionalInfoDocTypes,
  AdditionalInfoEmpty,
  AdditionalInfoPayment,
  AdditionalInfoPaymentTypes,
  AdditionalInfoSubject,
  AdditionalInfoSubjectRoleLawyer,
  AdditionalInfoSubjectRoles,
  AdditionalInfoTypes,
  UploadDocumentsAction,
} from "../../config/const";
import { RootState } from "../../redux/store";
import { Col, Row, RowSpacer } from "../../style/containers";
import { InputTextStyled, SelectStyled } from "../../style/Input";
import {
  AdditionalInfoContactType,
  AdditionalInfoDataType,
  AdditionalInfoDocumentType,
  AdditionalInfoPaymentType,
  AdditionalInfoSubjectType,
} from "../../types/new-claim.types";
import useApplication from "../../hooks/useApplication";

const FormContainer = styled.div`
  margin: 3em 0em;
  padding: 1em;
  background-color: beige;
  display: flex;
  flex-direction: column;
`;

const FooterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface AdditionalInfoModalContentProps {
  index: number;
  damagedPartIndex: number;
  onClose: () => void;
}

const AdditionalInfoModalContent = (props: AdditionalInfoModalContentProps) => {
  const app = useApplication();
  const additionalInfo = useSelector((state: RootState) => state.newClaim.additionalInfo[props.index]);
  const [addInfoType, setAddInfoType] = useState(AdditionalInfoEmpty.value);

  const [subjectData, setSubjectData] = useState<AdditionalInfoSubjectType>({
    role: "---",
    personalData: null,
  });
  const [documentData, setDocumentData] = useState<AdditionalInfoDocumentType>({
    type: "---",
    filename: [],
  });

  const [paymentData, setPaymentData] = useState<AdditionalInfoPaymentType>({
    type: "---",
    iban: "",
  });

  const [contactData, setContactData] = useState<AdditionalInfoContactType>({
    shippingAddress: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!additionalInfo) return;

    if (additionalInfo.type === AdditionalInfoSubject.value) {
      const details = additionalInfo.details as AdditionalInfoSubjectType;
      setSubjectData(details);
    }
    if (additionalInfo.type === AdditionalInfoDoc.value) {
      const details = additionalInfo.details as AdditionalInfoDocumentType;
      setDocumentData(details);
    }
    if (additionalInfo.type === AdditionalInfoPayment.value) {
      const details = additionalInfo.details as AdditionalInfoPaymentType;
      setPaymentData(details);
    }

    if (additionalInfo.type === AdditionalInfoContact.value) {
      const details = additionalInfo.details as AdditionalInfoContactType;
      setContactData(details);
    }
    setAddInfoType(additionalInfo.type);
  }, [additionalInfo]);
  const damagedPart = useSelector((state: RootState) =>
    props.damagedPartIndex >= 0 ? state.newClaim.damagedParts[props.damagedPartIndex] : null
  );

  const handleSave = () => {
    const details:
      | AdditionalInfoSubjectType
      | AdditionalInfoDocumentType
      | AdditionalInfoPaymentType
      | AdditionalInfoContactType
      | null =
      addInfoType === AdditionalInfoSubject.value
        ? ({
            role: subjectData.role,
            personalData: subjectData.personalData,
          } as AdditionalInfoSubjectType)
        : addInfoType === AdditionalInfoDoc.value
        ? ({
            type: documentData.type,
            filename: documentData.filename,
          } as AdditionalInfoDocumentType)
        : addInfoType === AdditionalInfoPayment.value
        ? ({
            type: paymentData.type,
            iban: paymentData.iban,
          } as AdditionalInfoPaymentType)
        : addInfoType === AdditionalInfoContact.value
        ? ({
            shippingAddress: contactData.shippingAddress,
            email: contactData.email,
            phone: contactData.phone,
          } as AdditionalInfoContactType)
        : null;

    if (details) {
      const additionalInfo: AdditionalInfoDataType = {
        id: Date.now(),
        type: addInfoType,
        damagedPartNumber: damagedPart!.pdNumber,
        details,
      };
      app.setAdditionalInfo(additionalInfo, props.index);
    }

    props.onClose();
  };

  const handleChangeSubject = (field: string, value: any) => {
    setSubjectData(Object.assign({}, subjectData, { [field]: value }));
  };

  const handleChangeDocument = (field: string, value: any) => {
    setDocumentData(Object.assign({}, documentData, { [field]: value }));
  };

  const handleChangePayment = (field: string, value: any) => {
    setPaymentData(Object.assign({}, paymentData, { [field]: value }));
  };

  const handleChangeContact = (field: string, value: any) => {
    setContactData(Object.assign({}, contactData, { [field]: value }));
  };

  const renderSubjectForm = () => {
    return (
      <FormContainer>
        <Row>
          <SelectStyled
            label="Ruolo del soggetto"
            tooltip="Seleziona il ruolo del soggetto"
            onChange={(val) => handleChangeSubject("role", val)}
            options={AdditionalInfoSubjectRoles}
            value={subjectData.role}
          />
          <RowSpacer />
          <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
            <Button type="primary" size="small">
              Seleziona Anagrafica
            </Button>
          </div>
        </Row>
      </FormContainer>
    );
  };

  const renderDocumentForm = () => {
    return (
      <FormContainer>
        <SelectStyled
          label="Tipo di documento"
          tooltip="Seleziona il tipo di documento"
          onChange={(val) => handleChangeDocument("type", val)}
          options={AdditionalInfoDocTypes}
          value={documentData.type}
        />
        <br />
        <Upload.Dragger
          name="file"
          multiple={true}
          action={UploadDocumentsAction}
          onChange={() => {}}
          onDrop={() => {}}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-hint">Trascina qui il file o clicca per selezionare</p>
        </Upload.Dragger>
      </FormContainer>
    );
  };

  const renderPaymentForm = () => {
    return (
      <FormContainer>
        <Row>
          <SelectStyled
            label="Tipo di pagamento"
            tooltip="Seleziona il tipo di pagamento"
            onChange={(val) => handleChangePayment("type", val)}
            options={AdditionalInfoPaymentTypes}
            value={paymentData.type}
          />
          <RowSpacer />
          <InputTextStyled
            label="IBAN"
            tooltip="Inserisci l'IBAN"
            onChange={(val) => {
              handleChangePayment("iban", val);
            }}
            value={paymentData.iban}
          />
        </Row>
      </FormContainer>
    );
  };

  const renderContactForm = () => {
    return (
      <FormContainer>
        <Row>
          <InputTextStyled
            label="Indirizzo di spedizione"
            tooltip="Inserisci l'indirizzo di spedizione"
            onChange={(val) => handleChangeContact("shippingAddress", val)}
            value={contactData.shippingAddress}
          />
        </Row>
        <br />
        <Row>
          <InputTextStyled
            label="Email"
            tooltip="Inserisci l'email'"
            onChange={(val) => handleChangeContact("email", val)}
            value={contactData.email}
          />
          <RowSpacer />
          <InputTextStyled
            label="Numero di telefono"
            tooltip="Inserisci il numero di telefono"
            onChange={(val) => handleChangeContact("phone", val)}
            value={contactData.phone}
          />
        </Row>
      </FormContainer>
    );
  };

  return (
    damagedPart && (
      <Col>
        <Row>
          <SelectStyled
            label="Tipo di Dati"
            tooltip="Seleziona il tipo di informazioni aggiuntiva da inserire"
            onChange={(val) => setAddInfoType(val)}
            options={AdditionalInfoTypes}
            value={addInfoType}
          />
          <RowSpacer />
          <div style={{ flex: "1" }}></div>
        </Row>
        {addInfoType === AdditionalInfoSubject.value && renderSubjectForm()}
        {addInfoType === AdditionalInfoDoc.value && renderDocumentForm()}
        {addInfoType === AdditionalInfoPayment.value && renderPaymentForm()}
        {addInfoType === AdditionalInfoContact.value && renderContactForm()}

        <FooterActions>
          <Button onClick={props.onClose}>Cancella</Button>
          <RowSpacer />
          <Button type="primary" onClick={handleSave}>
            Salva
          </Button>
        </FooterActions>
      </Col>
    )
  );
};

export default AdditionalInfoModalContent;