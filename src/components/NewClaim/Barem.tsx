import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Select, Modal } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput, FormDatePicker } from "../../style/form";
import { useTranslation } from "react-i18next";

const BaremStyled = styled.div``;

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

const BaremOpenModal = styled.div`
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  background-color: #e3ffb5;
  padding: 0.5em 1em;
  border-radius: 10em;
`;

const baremsArray = () => Array.from(Array(18).keys()).map((i) => 17 - i);

const Barem = () => {
  const { t } = useTranslation();

  const [baremModalOpen, setBaremModalOpen] = useState(false);
  const [baremValue, setBaremValue] = useState<string | undefined>();
  const [baremVehicleA, setBaremVehicleA] = useState<number | undefined>();
  const [baremVehicleB, setBaremVehicleB] = useState<number | undefined>();

  const handleBaremoModalCancel = () => {
    setBaremModalOpen(false);
  };

  const handleBaremoModalOk = () => {
    setBaremModalOpen(false);
    setBaremValue(`${baremVehicleA} - ${baremVehicleB}`);
  };

  return (
    <BaremStyled>
      <FormSubTitle>Barem</FormSubTitle>
      <Row>
        <FormInput
          label="Caso Circostanza Mittente"
          name="caso_circostanza_mittente"
          tooltip="Seleziona il caso di circostanza del mittente"
          rules={[{ required: true, message: "Il caso di cirsostanza del mittente è obbligatorio" }]}
        >
          <BaremOpenModal onClick={() => setBaremModalOpen(true)}>
            {baremValue ? baremValue : "Seleziona"}
          </BaremOpenModal>
          <Modal
            title="Barem Mittente"
            open={baremModalOpen}
            onCancel={handleBaremoModalCancel}
            onOk={handleBaremoModalOk}
            width={900}
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
                  <tr>
                    <BaremCaseLabel>{t(`barem_label_${i}`)}</BaremCaseLabel>
                    <BaremCaseTd onClick={() => setBaremVehicleA(i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <BaremCaseValue selected={baremVehicleA === i}>{i}</BaremCaseValue>
                      </div>
                    </BaremCaseTd>
                    <BaremCaseTd onClick={() => setBaremVehicleB(i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <BaremCaseValue selected={baremVehicleB === i}>{i}</BaremCaseValue>
                      </div>
                    </BaremCaseTd>
                  </tr>
                ))}
              </tbody>
            </BaremTable>
          </Modal>
        </FormInput>
        <RowSpacer />
      </Row>
      <Row>
        <FormInput
          label="Motivo Forzatura"
          name="motivo_forzatura"
          tooltip="Seleziona il motivo della forzatura"
          rules={[{ required: true, message: "Il motivo della forzatura è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Mancato rispetto limiti velocità" },
              { value: "2", label: "Mancato rispetto norme regola strada per svolte sx dx" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput label="Ragione o Torto" name="ragione_torto" tooltip="Seleziona ragione o torto">
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "C", label: "C - responsabilità concorsuale" },
              { value: "T", label: "T - torto" },
              { value: "R", label: "R - ragione" },
              { value: "MD", label: "MD - manca denuncia" },
              { value: "NA", label: "NA - non applicabile" },
              { value: "NE", label: "NE - negazione evento" },
            ]}
          />
        </FormInput>
      </Row>
    </BaremStyled>
  );
};

export default Barem;
