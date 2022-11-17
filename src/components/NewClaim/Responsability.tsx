import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Select, Modal, Divider } from "antd";
import { Col, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput, FormDatePicker } from "../../style/form";
import { useTranslation } from "react-i18next";
import { Barems } from "../../config/const";

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

const ResponsabilityTypes = {
  card: [
    { value: "---", label: "---" },
    { value: "4", label: "Passivo" },
    { value: "5", label: "Attivo" },
  ],
  noCard: [
    { value: "---", label: "---" },
    { value: "1", label: "Definito" },
    { value: "2", label: "Concorsuale" },
    { value: "3", label: "Gestionario" },
  ],
};

const baremsArray = () => Array.from(Array(18).keys()).map((i) => 17 - i);

interface ResponsabilityProps {
  isCard: boolean;
}

const Responsability = (props: ResponsabilityProps) => {
  const { t } = useTranslation();

  const [baremModalOpen, setBaremModalOpen] = useState(false);
  const [baremVehicleA, setBaremVehicleA] = useState<number | undefined>();
  const [baremVehicleB, setBaremVehicleB] = useState<number | undefined>();
  const [baremResult, setBaremResult] = useState("NC");

  const handleBaremsModalCancel = () => {
    setBaremModalOpen(false);
  };

  const handleBaremsModalOk = () => {
    setBaremModalOpen(false);
  };

  const handleChangeVehicleValue = (vehicle: "A" | "B", val: number) => {
    if (vehicle === "A") {
      setBaremVehicleA(val);
      if (baremVehicleB) {
        setBaremResult(Barems[val][baremVehicleB]);
      }
    }
    if (vehicle === "B") {
      setBaremVehicleB(val);
      if (baremVehicleA) {
        setBaremResult(Barems[baremVehicleA][val]);
      }
    }
  };

  return (
    <ResponsabilityStyled>
      <FormSubTitle>Barem</FormSubTitle>
      <Row>
        <FormInput
          label="Caso Circostanza"
          name="caso_circostanza_mittente"
          tooltip="Seleziona il caso di circostanza"
          rules={[{ required: true, message: "Il caso di cirsostanza è obbligatorio" }]}
        >
          <BaremContainer>
            <BaremOpenModal onClick={() => setBaremModalOpen(true)}>
              {["R", "C", "T"].indexOf(baremResult) === -1 ? (
                "Seleziona"
              ) : (
                <>
                  {baremResult} ({t(`barem_result_${baremResult}_label`)})
                </>
              )}
            </BaremOpenModal>
            {["R", "C", "T"].indexOf(baremResult) > -1 && (
              <Col>
                <Row>Veicolo A : {t(`barem_label_${baremVehicleA}`)}</Row>
                <Row>Veicolo B : {t(`barem_label_${baremVehicleB}`)}</Row>
              </Col>
            )}
          </BaremContainer>

          <Modal
            title="Seleziona le circostanze dei veicoli"
            open={baremModalOpen}
            onCancel={handleBaremsModalCancel}
            width={900}
            footer={
              <BaremModalFooter>
                <BaremModalFooterMessage>
                  <BaremModalFooterMessageType>
                    {baremResult !== "NC" && (
                      <>
                        {baremResult} ({t(`barem_result_${baremResult}_label`)})
                      </>
                    )}
                  </BaremModalFooterMessageType>
                  {baremResult !== "NC" && "-"}
                  <BaremModalFooterMessageText>{t(`barem_result_${baremResult}_text`)}</BaremModalFooterMessageText>
                </BaremModalFooterMessage>
                <BaremModalFooterButtons>
                  <Button onClick={handleBaremsModalCancel}>Cancel</Button>
                  <Button
                    type="primary"
                    onClick={handleBaremsModalOk}
                    disabled={["R", "T", "C"].indexOf(baremResult) === -1}
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
                  <tr>
                    <BaremCaseLabel>{t(`barem_label_${i}`)}</BaremCaseLabel>
                    <BaremCaseTd onClick={() => handleChangeVehicleValue("A", i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <BaremCaseValue selected={baremVehicleA === i}>{i}</BaremCaseValue>
                      </div>
                    </BaremCaseTd>
                    <BaremCaseTd onClick={() => handleChangeVehicleValue("B", i)}>
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
      {["T", "C"].indexOf(baremResult) !== -1 && (
        <Row>
          <FormInput label="Motivo Forzatura" name="motivo_forzatura" tooltip="Seleziona il motivo della forzatura">
            <Select
              defaultValue="---"
              options={[
                { value: "---", label: "---" },
                { value: "1", label: "Mancato rispetto limiti velocità" },
                { value: "2", label: "Mancato rispetto norme regola strada per svolte sx dx" },
              ]}
            />
          </FormInput>
        </Row>
      )}

      <FormSubTitle>Responsabilità</FormSubTitle>

      <Row>
        <FormInput label="Tipo Firma" name="tipo_firma" tooltip="Seleziona il tipo firma">
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "monofirma", label: "Monofirma" },
              { value: "firma_congiunta", label: "Firma Congiunta" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Tipo Responsabilità"
          name="tipo_responsabilità"
          tooltip="Seleziona il tip di responsabilità"
          rules={[{ required: true, message: "Il tipo di responsabilità è obbligatorio" }]}
        >
          <Select defaultValue="---" options={props.isCard ? ResponsabilityTypes.card : ResponsabilityTypes.noCard} />
        </FormInput>
      </Row>
      <Row>
        {props.isCard && (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1em" }}>Percentuale Responsabilità :</div>
            {baremResult === "R" ? "0%" : baremResult === "C" ? "50%" : baremResult === "T" ? "100%" : ""}
          </div>
        )}

        <RowSpacer />
      </Row>
    </ResponsabilityStyled>
  );
};

export default Responsability;
