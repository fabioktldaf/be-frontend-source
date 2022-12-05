import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Select, Modal, Divider } from "antd";
import { Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput, FormDatePicker, FormRow } from "../../style/form";
import { useTranslation } from "react-i18next";
import {
  Barems,
  BaremsToManagement,
  BaremsToResponsability,
  ForceReasons,
  Responsabilities,
  SignatureTypes,
} from "../../config/const";
import useApplication from "../../hooks/useApplication";
import { BaremsResultType } from "../../types/new-claim.types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SelectStyled } from "../../style/Input";

const ResponsabilityStyled = styled.div``;

const BaremTable = styled.table``;

const BaremTdHeader = styled.td`
  padding: 0.5em 1em;
  font-weight: bold;
`;

const BaremCaseLabel = styled.td`
  padding: 0.5em 1em;
`;

const BaremCaseTd = styled.td``;

const BaremCaseValue = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em;
  height: 3em;
  background-color: ${(props) => (props.selected ? "dodgerblue" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
`;

const BaremContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BaremOpenModal = styled.div`
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  background-color: #e3ffb5;
  padding: 0.5em 1em;
  border-radius: 10em;
  margin-right: 2em;
`;

const BaremModalFooter = styled.div`
  display: flex;
`;

const BaremModalFooterMessage = styled.div`
  display: flex;
`;

const BaremModalFooterMessageType = styled.div`
  font-weight: bold;
  margin-right: 0.5em;
`;

const BaremModalFooterMessageText = styled.div`
  margin-left: 0.5em;
`;

const BaremModalFooterButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const baremsArray = () => Array.from(Array(18).keys()).map((i) => 17 - i);

interface ResponsabilityProps {
  isCard: boolean;
}

type BaremModalStateType = {
  isOpen: boolean;
  vehicleA: number | undefined;
  vehicleB: number | undefined;
  result: string | undefined;
};

const Responsability = (props: ResponsabilityProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const responsabilityData = useSelector((state: RootState) => state.newClaim.responsability);

  const [baremModal, setBaremModal] = useState<BaremModalStateType>({
    isOpen: false,
    ...responsabilityData?.barems,
  } as BaremModalStateType);

  const { forcedReason, responsabilityType, signatureType, responsabilityPercentage } = responsabilityData || {};

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

  return (
    <ResponsabilityStyled>
      <FormSubTitle>Ripartizione Responsabilità (Barèmes)</FormSubTitle>
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
              <Hidden>{responsabilityData?.barems.result}</Hidden>
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
                  <Button type="primary" onClick={handleBaremsModalOk} disabled={!baremModal.result}>
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
        <RowSpacer />
      </FormRow>
      {baremModal.result === "1" && (
        <FormRow>
          <FormInput label="Motivo Forzatura" name="motivo_forzatura" tooltip="Seleziona il motivo della forzatura">
            <Select
              defaultValue="---"
              onChange={(val) => app.updateResponsabilityData(val, "forced-reason")}
              options={ForceReasons}
              value={responsabilityData?.forcedReason}
            />
          </FormInput>
        </FormRow>
      )}

      <FormSubTitle>Responsabilità</FormSubTitle>

      <FormRow>
        {
          <FormInput label="Tipo Responsabilità" name="tipo_responsabilità">
            {BaremsToManagement[responsabilityData?.responsabilityType || ""]}
          </FormInput>
        }
        <RowSpacer />
        {
          <FormInput label="Percentual Responsabilità" name="percentuale_responsabilità">
            {responsabilityPercentage}
          </FormInput>
        }
      </FormRow>
      <FormRow>
        <SelectStyled
          defaultValue="---"
          onChange={(val) => app.updateResponsabilityData(val, "signature-type")}
          options={SignatureTypes}
          value={responsabilityData?.signatureType}
        />

        {/* <FormInput label="Tipo Firma" name="tipo_firma" tooltip="Seleziona il tipo firma">
          <Select
            defaultValue="---"
            onChange={(val) => app.updateResponsabilityData(val, "signature-type")}
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Monofirma" },
              { value: "2", label: "Doppia Firma" },
            ]}
            value={responsabilityData?.signatureType}
          />
          <Hidden>{responsabilityData?.signatureType}</Hidden>
        </FormInput> */}
      </FormRow>
    </ResponsabilityStyled>
  );
};

export default Responsability;
