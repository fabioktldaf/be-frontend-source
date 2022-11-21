import React, { useEffect, useState } from "react";
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
  noCard: [
    { value: "---", label: "---" },
    { value: "4", label: "Passivo" },
    { value: "5", label: "Attivo" },
  ],
  card: [
    { value: "---", label: "---" },
    { value: "1", label: "Debitore" },
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
  const [motivoForzatura, setMotivoForzatura] = useState("");
  const [tipoResponsabilità, setTipoResponsabilità] = useState("---");

  useEffect(() => {
    console.log("motivo forzatura ", motivoForzatura);
    if (motivoForzatura === "---") setTipoResponsabilità("1");
    else setTipoResponsabilità("2");
  }, [motivoForzatura]);

  const handleBaremsModalCancel = () => {
    setBaremModalOpen(false);
  };

  const handleBaremsModalOk = () => {
    setBaremModalOpen(false);
  };

  const handleChangeVehicleValue = (vehicle: "A" | "B", val: number) => {
    let bRes: string | null = null;

    if (vehicle === "A") {
      setBaremVehicleA(val);
      if (baremVehicleB) {
        bRes = Barems[val][baremVehicleB];
      }
    }
    if (vehicle === "B") {
      setBaremVehicleB(val);
      if (baremVehicleA) {
        bRes = Barems[baremVehicleA][val];
      }
    }

    if (bRes) {
      setBaremResult(bRes);
      const newTipoResp = bRes === "T" ? "1" : bRes === "C" ? "2" : bRes === "R" ? "3" : "";
      console.log("tipo responsabilità ", newTipoResp);
      setTipoResponsabilità(newTipoResp);
    }
  };

  return (
    <ResponsabilityStyled>
      <FormSubTitle>Ripartizione Responsabilità (Barèmes)</FormSubTitle>
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
                <Row>Veicolo Nostro : {t(`barem_label_${baremVehicleA}`)}</Row>
                <Row>Veicolo Controparte : {t(`barem_label_${baremVehicleB}`)}</Row>
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
                  <BaremTdHeader>VEICOLO Nostro</BaremTdHeader>
                  <BaremTdHeader>VEICOLO Controparte</BaremTdHeader>
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
      {baremResult === "T" && (
        <Row>
          <FormInput label="Motivo Forzatura" name="motivo_forzatura" tooltip="Seleziona il motivo della forzatura">
            <Select
              defaultValue="---"
              onChange={(val) => setMotivoForzatura(val)}
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
        {tipoResponsabilità && (
          <FormInput label="Tipo Responsabilità" name="tipo_responsabilità">
            {ResponsabilityTypes.card.find((r) => r.value === tipoResponsabilità)?.label}
          </FormInput>
        )}
        <RowSpacer />
        {props.isCard && (
          <FormInput label="Percentual Responsabilità" name="percentuale_responsabilità">
            {tipoResponsabilità === "3"
              ? "0%"
              : tipoResponsabilità === "2"
              ? "50%"
              : tipoResponsabilità === "1"
              ? "100%"
              : ""}
          </FormInput>
        )}
      </Row>
      <Row>
        <FormInput label="Tipo Firma" name="tipo_firma" tooltip="Seleziona il tipo firma">
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "monofirma", label: "Monofirma" },
              { value: "firma_congiunta", label: "Doppia Firma" },
            ]}
          />
        </FormInput>
      </Row>
    </ResponsabilityStyled>
  );
};

export default Responsability;
