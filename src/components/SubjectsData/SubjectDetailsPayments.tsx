import React from "react";
import { Button, Tooltip, Upload } from "antd";
import styled from "styled-components";
import {
  SubjectData,
  SubjectDocumentData,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
  SubjectPaymentData,
} from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import { Col, Row, RowSpacer } from "../../style/containers";
import { DatePickerStyled, InputTextStyled, SelectStyled } from "../../style/Input";
import { DocumentTypes, PaymentsTypes } from "../../config/const";
import { IconDelete, IconInbox } from "../../config/icons";
import { FormContentTab, FormRow } from "../../style/form";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";
import { TitleHr } from "../Layout/Titles";

const PaymentStyled = styled.div`
  margin-bottom: 4em;
`;

interface SubjectDetailsPaymentsProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsPayments = (props: SubjectDetailsPaymentsProps) => {
  const { subject, readOnly, app, t } = props;
  const payments: SubjectPaymentData[] = subject?.payments || [];

  const handleAddPayment = () => {
    app.editingSubjectAddPayment();
  };

  const handleRemovePayment = (index: number) => {
    app.editingSubjectRemovePayment(index);
  };

  const renderPayment = (payment: SubjectPaymentData, index: number) => {
    const handleChangePayment = (value: any, field: string) => {
      //
    };

    return (
      <>
        <div style={{ position: "relative", zIndex: "1" }}>
          <TitleHr text="Pagamento" containerStyle={{ zIndex: "1" }} />
          <RowSpacer />
          <ButtonDelete
            children="Elimina"
            onClick={() => handleRemovePayment(index)}
            style={{ position: "absolute", right: "0", top: "1.2em", zIndex: "2" }}
          />
        </div>
        <FormRow>
          <SelectStyled
            label="Tipo Pagamento"
            tooltip="Seleziona il tipo pagamento"
            defaultValue="---"
            value={payment.type}
            onChange={(val) => handleChangePayment(val, "type")}
            options={PaymentsTypes}
          />
          <RowSpacer />
          {payment.type === "transfer" ? (
            <InputTextStyled
              label="IBAN"
              tooltip="Inserisci l'iban"
              placeholder="iban..."
              value={payment.iban}
              onChange={(val) => handleChangePayment(val, "iban")}
            />
          ) : (
            <div style={{ flex: "1" }}></div>
          )}
        </FormRow>
      </>
    );
  };
  return (
    <FormContentTab>
      {payments.map((document, i) => (
        <PaymentStyled key={i}>{renderPayment(document, i)}</PaymentStyled>
      ))}
      <FormRow style={{ justifyContent: "center" }}>
        <ButtonConfirm onClick={handleAddPayment} children="Aggiungi Pagamento" />
      </FormRow>
    </FormContentTab>
  );
};

export default SubjectDetailsPayments;
