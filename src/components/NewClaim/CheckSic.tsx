import React, { useEffect, useState, useTransition } from "react";
import { Steps, Space, Spin, Button, Modal, Select } from "antd";
import styled from "styled-components";

import cnApproved from "../../images/cn-approved.jpg";
import useApplication from "../../hooks/useApplication";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../redux/features/newClaimSlice";
import { BaremsResultType, NewClaimStateType } from "../../types/new-claim.types";
import { RootState } from "../../redux/store";
import { FormActionType, MainForm } from "../Layout/Forms";
import { Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { IconCheckList } from "../../config/icons";
import { DatePickerStyled, InputAddress, InputTextStyled, SelectStyled, TimePickerStyled } from "../../style/Input";
import { FormInput, FormRow, FormSubTitle } from "../../style/form";
import { TabContentStyled } from ".";
import DamagedParts from "./DamagedParts";

import {
  Barems,
  BaremsToResponsability,
  ForceReasons,
  insuranceCodesWithCodes,
  SignatureTypes,
} from "../../config/const";
import {
  BaremCaseLabel,
  BaremCaseTd,
  BaremCaseValue,
  BaremContainer,
  BaremModalFooter,
  BaremModalFooterButtons,
  BaremModalFooterMessage,
  BaremModalFooterMessageText,
  BaremModalFooterMessageType,
  BaremModalStateType,
  BaremOpenModal,
  baremsArray,
  BaremTable,
  BaremTdHeader,
} from "./Responsability";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";

const ResumeContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5em 0;
`;

const LoaderMessage = styled.div`
  color: #333;
  margin-left: 2em;
`;

const ResultANIA = styled.div`
  margin-top: 3em;
`;

interface CheckSicProps {
  onForward: () => void;
  onBackward: () => void;
}

const CheckSic = (props: CheckSicProps) => {
  const app = useApplication();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, claimData, counterpartData, responsability } = useSelector((state: RootState) => state.newClaim);

  const [isDataModified, setIsDataModified] = useState(false);
  const [baremModal, setBaremModal] = useState<BaremModalStateType>({
    isOpen: false,
    ...responsability?.barems,
  } as BaremModalStateType);

  const handleBaremChange = (vehicle: "vehicleA" | "vehicleB", value: number) => {
    const newBaremModal = Object.assign({}, baremModal);

    newBaremModal[vehicle] = value;

    if (newBaremModal.vehicleA && newBaremModal.vehicleB) {
      const result = Barems[newBaremModal.vehicleA][newBaremModal.vehicleB] as string;
      const responsability = BaremsToResponsability[result];
      newBaremModal.result = responsability;
    }

    setBaremModal(newBaremModal);
  };

  const handleShowBaremsModal = () => {
    const newBaremModal = Object.assign({}, baremModal);
    newBaremModal.isOpen = true;
    setBaremModal(newBaremModal);
  };

  const handleBaremsModalCancel = () => {
    const newBaremModal = Object.assign({}, baremModal);
    newBaremModal.isOpen = false;
    setBaremModal(newBaremModal);
  };

  const handleBaremsModalOk = () => {
    const newBaremModal = Object.assign({}, baremModal);
    newBaremModal.isOpen = false;

    setBaremModal(newBaremModal);

    const barems: BaremsResultType = {
      vehicleA: newBaremModal.vehicleA!,
      vehicleB: newBaremModal.vehicleB!,
      result: newBaremModal.result!,
    };

    app.updateResponsabilityData(barems, "barems");
  };

  const actions: FormActionType[] = [
    {
      label: "Indietro",
      execute: () => {
        props.onBackward();
      },
    },
    {
      label: "Verifica SIC",
      disabled: status === NewClaimStateType.VerifingSic,
      execute: () => {
        dispatch(setStatus(NewClaimStateType.VerifingSic));
        setTimeout(() => {
          dispatch(setStatus(NewClaimStateType.SicCorrect));
          setIsDataModified(false);
        }, 2000);
      },
    },
    {
      label: "Salva",
      disabled: !isDataModified,
      execute: () => {},
    },
    {
      label: "Avanti",
      disabled: isDataModified || status !== NewClaimStateType.SicCorrect,
      execute: () => {
        props.onForward();
      },
    },
  ];

  const renderTitle = () => {
    const text = isDataModified
      ? "Dati modificati, ricontrolla il sic"
      : status === NewClaimStateType.CheckingData
      ? "Controlla i Dati e Verifica il SIC"
      : status === NewClaimStateType.SicError
      ? "SIC ERRATO"
      : status === NewClaimStateType.SicCorrect
      ? "SIC VERIFICATO"
      : status === NewClaimStateType.VerifingSic
      ? "VERIFICA SIC in corso"
      : "";

    return (
      <>
        <IconCheckList /> {text}
      </>
    );
  };

  const renderResume = () => (
    <ResumeContent>
      <FormRow>
        <DatePickerStyled
          label="Data Denuncia"
          tooltip="Seleziona la data di  denuncia"
          rules={[{ required: true, message: "La data di  denuncia è obbligatoria" }]}
          placeholder="data denuncia ..."
          onChange={(val) => {
            setIsDataModified(true);
            app.updateClaimData(val, "receiptDate");
          }}
          value={claimData?.receiptDate}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
      </FormRow>

      <FormRow>
        <DatePickerStyled
          label="Data Pervenimento in Compagnia"
          tooltip="Seleziona la data di pervenimento in compagnia"
          rules={[{ required: true, message: "La data di pervenimento in compagnia è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => app.updateClaimData(val, "dateOfReceiptCompany")}
          value={claimData?.dateOfReceiptCompany}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <DatePickerStyled
          label="Data Pervenimento in Dekra"
          tooltip="Seleziona la data di pervenimento in Dekra"
          rules={[{ required: true, message: "La data di pervenimento in Dekra è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => app.updateClaimData(val, "dateOfReceiptDekra")}
          value={claimData?.dateOfReceiptDekra}
          format={"DD/MM/YYYY"}
        />
      </FormRow>
      <FormRow>
        <DatePickerStyled
          label="Data Accadimento"
          tooltip="Seleziona la data di Accadimento"
          rules={[{ required: true, message: "La data di accadimento è obbligatoria" }]}
          placeholder="data di accadimento ..."
          onChange={(val) => {
            setIsDataModified(true);
            app.updateClaimData(val, "occurrenceDate");
          }}
          value={claimData?.occurrenceDate}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <TimePickerStyled
          label="Ora Accadimento"
          tooltip="Seleziona l'ora di accadimento..."
          rules={[{ required: true, message: "L'ora di accadimento è obbligatoria" }]}
          placeholder="ora di accadimento ..."
          format="HH:mm"
          onChange={(val: string) => {
            setIsDataModified(true);
            app.updateClaimData(val, "occurrenceTime");
          }}
          value={claimData?.occurrenceTime}
        />
      </FormRow>
      <FormRow>
        <InputAddress
          label="Luogo di Accadimento"
          value={claimData?.occurrencePlace?.fullAddress || ""}
          onEdit={() => {
            setIsDataModified(true);
          }}
        />
      </FormRow>
      <FormSubTitle>controparte</FormSubTitle>

      {counterpartData?.isOwnerNaturalPerson && (
        <FormRow>
          <InputTextStyled
            label="Nome"
            tooltip="Inserisci il nome del proprietario della controparte"
            rules={[{ required: true, message: "Il nome del proprietario della controparte è obbligatorio" }]}
            placeholder="nome proprietario controparte ..."
            value={counterpartData?.ownerName}
            onChange={(txt) => {
              setIsDataModified(true);
              app.updateCounterpartData(txt, "ownerName");
            }}
          />

          <RowSpacer />
          <InputTextStyled
            label="Cognome"
            tooltip="Inserisci il cognome del proprietario della controparte"
            rules={[{ required: true, message: "Il cognome del proprietario della controparte è obbligatorio" }]}
            placeholder="nome proprietario controparte ..."
            value={counterpartData?.ownerLastname}
            onChange={(val) => {
              setIsDataModified(true);
              app.updateCounterpartData(val, "ownerLastname");
            }}
          />
        </FormRow>
      )}
      {!counterpartData?.isOwnerNaturalPerson && (
        <FormRow>
          <InputTextStyled
            label="Ragione sociale"
            tooltip="Inserisci la ragione sociale della controparte"
            rules={[{ required: true, message: "La ragione sociale della controparte è obbligatorio" }]}
            placeholder="ragione sociale controparte ..."
            value={counterpartData?.ownerBusinessName}
            onChange={(val) => {
              setIsDataModified(true);
              app.updateCounterpartData(val, "ownerBusinessName");
            }}
          />
        </FormRow>
      )}
      <FormRow>
        <InputTextStyled
          label="Targa"
          tooltip="Inserisci la targa del veicolo della controparte"
          rules={[{ required: true, message: "La targa del veicolo della controparte è obbligatoria" }]}
          placeholder="targa ..."
          value={counterpartData?.plate}
          onChange={(val) => {
            setIsDataModified(true);
            app.updateCounterpartData(val, "plate");
          }}
        />

        <RowSpacer />
        <SelectStyled
          label="Assicurazione"
          tooltip="Seleziona la compagnia assicurativa della controparte"
          defaultValue="---"
          showSearch
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
          value={counterpartData?.insuranceCode}
          onChange={(val) => {
            setIsDataModified(true);
            app.updateCounterpartData(val, "insuranceCode");
          }}
          options={insuranceCodesWithCodes}
        />
      </FormRow>
      <FormSubTitle>responsabilita</FormSubTitle>
      <FormRow>
        <FormInput
          label="Caso Circostanza"
          name="caso_circostanza_mittente"
          tooltip="Seleziona il caso di circostanza"
          rules={[{ required: true, message: "Il caso di cirsostanza è obbligatorio" }]}
        >
          <BaremContainer>
            <BaremOpenModal onClick={handleShowBaremsModal}>
              {!baremModal.result ? "Seleziona" : t(`barem_result_${baremModal.result}_label`)}
              <Hidden>{responsability?.barems.result}</Hidden>
            </BaremOpenModal>
            {baremModal.result && (
              <Col>
                <Row>Veicolo A : {t(`barem_label_${baremModal.vehicleA}`)}</Row>
                <Row>Veicolo B : {t(`barem_label_${baremModal.vehicleB}`)}</Row>
              </Col>
            )}
          </BaremContainer>

          <Modal
            title="Seleziona le circostanze dei veicoli"
            open={baremModal.isOpen}
            onCancel={handleBaremsModalCancel}
            width={900}
            footer={
              <BaremModalFooter>
                {baremModal.result && (
                  <BaremModalFooterMessage>
                    <BaremModalFooterMessageType>
                      {baremModal.result !== "NC" && <>{t(`barem_result_${baremModal.result}_label`)}</>}
                    </BaremModalFooterMessageType>
                    {baremModal.result !== "NC" && "-"}
                    <BaremModalFooterMessageText>
                      {t(`barem_result_${baremModal.result}_text`)}
                    </BaremModalFooterMessageText>
                  </BaremModalFooterMessage>
                )}
                <BaremModalFooterButtons>
                  <Button onClick={handleBaremsModalCancel}>Cancel</Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsDataModified(true);
                      handleBaremsModalOk();
                    }}
                    disabled={!baremModal.result}
                  >
                    Ok
                  </Button>
                </BaremModalFooterButtons>
              </BaremModalFooter>
            }
          >
            <BaremTable>
              <thead>
                <tr>
                  <BaremTdHeader>CIRCOSTANZA DEL SINISTRO</BaremTdHeader>
                  <BaremTdHeader>VEICOLO A</BaremTdHeader>
                  <BaremTdHeader>VEICOLO B</BaremTdHeader>
                </tr>
              </thead>
              <tbody>
                {baremsArray().map((i: number) => (
                  <tr key={i}>
                    <BaremCaseLabel>{t(`barem_label_${i}`)}</BaremCaseLabel>
                    <BaremCaseTd onClick={() => handleBaremChange("vehicleA", i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <BaremCaseValue selected={baremModal.vehicleA === i}>{i}</BaremCaseValue>
                      </div>
                    </BaremCaseTd>
                    <BaremCaseTd onClick={() => handleBaremChange("vehicleB", i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <BaremCaseValue selected={baremModal.vehicleB === i}>{i}</BaremCaseValue>
                      </div>
                    </BaremCaseTd>
                  </tr>
                ))}
              </tbody>
            </BaremTable>
          </Modal>
        </FormInput>
      </FormRow>
      <FormRow>
        {baremModal.result === "1" && (
          <FormRow>
            <SelectStyled
              defaultValue="---"
              onChange={(val) => app.updateResponsabilityData(val, "signature-type")}
              options={SignatureTypes}
              value={responsability?.signatureType}
            />
            <RowSpacer />
            <FormInput label="Motivo Forzatura" name="motivo_forzatura" tooltip="Seleziona il motivo della forzatura">
              <Select
                defaultValue="---"
                onChange={(val) => app.updateResponsabilityData(val, "forced-reason")}
                options={ForceReasons}
                value={responsability?.forcedReason}
              />
            </FormInput>
          </FormRow>
        )}
      </FormRow>

      <FormSubTitle>partite di danno</FormSubTitle>
      <DamagedParts
        isResume={true}
        onDataChange={() => {
          setIsDataModified(true);
        }}
      />
    </ResumeContent>
  );

  return (
    <MainForm layout="vertical" title={renderTitle()} actions={actions}>
      <>
        {status === NewClaimStateType.VerifingSic && (
          <LoaderContainer>
            <Spin size="large" />
            <LoaderMessage> Verifica della correttezza dei dati in corso...</LoaderMessage>
          </LoaderContainer>
        )}
        {status !== NewClaimStateType.VerifingSic && renderResume()}
      </>
    </MainForm>
  );
};

export default CheckSic;
