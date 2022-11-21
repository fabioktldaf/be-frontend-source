import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, InputNumber, Button, Select, Switch } from "antd";
import { Row, RowSpacer, Hidden } from "../../style/containers";
import { FormSubTitle, FormInput, FormDatePicker, FormTextArea } from "../../style/form";
import { HrStyled } from "./ClaimData";
import { VehicleTypeOptions } from "../../config/const";

const CardDataStyled = styled.div`
  margin-bottom: 2em;
`;

const TrStyled = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TdQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20em;
  padding-left: 1em;
`;

const TdRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 14em;
  margin: 1em 0;
`;

const TdVehicleLabel = styled.td`
  width: 8em;
  padding-right: 1em;
  text-align: right;
`;

const CardCheck = styled.div<{ isCard: boolean }>`
  color: ${(props) => (props.isCard ? "#888" : "red")};
  background-color: ${(props) => (props.isCard ? "lightgreen" : "lightyellow")};
  font-size: 0.8em;
  width: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1em;
  border-radius: 10em;
`;

const CardNoCardResult = styled.div<{ isCard: boolean }>`
  color: ${(props) => (props.isCard ? "#333" : "red")};
  background-color: ${(props) => (props.isCard ? "#c0ffc0" : "lightyellow")};
  margin: 1em;
  text-align: center;
  padding: 0.25em;
`;

type VehicoleTypeType = "A" | "B" | "C" | "M" | "Q" | "T" | "W" | "R" | "S" | "---";
type ClaimType = "CARD" | "NO CARD" | "---";

export type StepperDataType = {
  numeroVeicoliCoinvolti: number;
  veicoloAVisibile: boolean;
  tipoVeicoloA: VehicoleTypeType;
  veicoloBVisibile: boolean;
  tipoVeicoloB: VehicoleTypeType;
  collisioneVisibile: boolean;
  collisione: boolean;
  inItaliaVisibile: boolean;
  inItalia: boolean;
  tipoSinistro: ClaimType;
};

export type SteppedChangeDataType = "vehicles_number" | "vehicle_a_type" | "vehicle_b_type" | "collision" | "inItaly";

interface CardDataProps {
  onClaimTypeChanged: (details: StepperDataType) => void;
}

const CardData = (props: CardDataProps) => {
  const [stepperData, setStepperData] = useState<StepperDataType>({
    numeroVeicoliCoinvolti: 0,
    veicoloAVisibile: false,
    tipoVeicoloA: "---",
    veicoloBVisibile: false,
    tipoVeicoloB: "---",
    collisioneVisibile: false,
    collisione: false,
    inItaliaVisibile: false,
    inItalia: false,
    tipoSinistro: "---",
  });

  useEffect(() => {
    props.onClaimTypeChanged(stepperData);
  }, [stepperData]);

  const handleChangeStepperData = (val: any, field: SteppedChangeDataType) => {
    console.log("val ", val);
    console.log("field ", field);

    if (field === "vehicles_number") {
      if (val === 2) {
        setStepperData(
          Object.assign({}, stepperData, {
            numeroVeicoliCoinvolti: val,
            veicoloAVisibile: true,
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: val,
          veicoloAVisibile: false,
          tipoVeicoloA: "---",
          veicoloBVisibile: false,
          tipoVeicoloB: "---",
          collisioneVisibile: false,
          collisione: false,
          inItaliaVisibile: false,
          inItalia: false,
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "vehicle_a_type") {
      if (["A", "B", "C", "M", "Q", "T", "W"].indexOf(val) >= 0) {
        setStepperData(
          Object.assign({}, stepperData, {
            tipoVeicoloA: val,
            veicoloBVisibile: true,
            tipoVeicoloB: "---",
            collisioneVisibile: false,
            collisione: false,
            inItaliaVisibile: false,
            inItalia: false,
            tipoSinistro: "---",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: val,
          veicoloBVisibile: false,
          tipoVeicoloB: "---",
          collisioneVisibile: false,
          collisione: false,
          inItaliaVisibile: false,
          inItalia: false,
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "vehicle_b_type") {
      if (["A", "B", "C", "M", "Q", "T", "W"].indexOf(val) >= 0) {
        setStepperData(
          Object.assign({}, stepperData, {
            tipoVeicoloB: val,
            collisioneVisibile: true,
            collisione: false,
            inItaliaVisibile: false,
            inItalia: false,
            tipoSinistro: "---",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: stepperData.tipoVeicoloA,
          veicoloBVisibile: stepperData.veicoloBVisibile,
          tipoVeicoloB: val,
          collisioneVisibile: false,
          collisione: false,
          inItaliaVisibile: false,
          inItalia: false,
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "collision") {
      if (val) {
        setStepperData(
          Object.assign({}, stepperData, {
            collisione: val,
            inItaliaVisibile: true,
            inItalia: false,
            tipoSinistro: "---",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: stepperData.tipoVeicoloA,
          veicoloBVisibile: stepperData.veicoloBVisibile,
          tipoVeicoloB: stepperData.tipoVeicoloB,
          collisioneVisibile: stepperData.collisioneVisibile,
          collisione: val,
          inItaliaVisibile: false,
          inItalia: false,
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "inItaly") {
      if (val) {
        setStepperData(
          Object.assign({}, stepperData, {
            inItalia: val,
            tipoSinistro: "CARD",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: stepperData.tipoVeicoloA,
          veicoloBVisibile: stepperData.veicoloBVisibile,
          tipoVeicoloB: stepperData.tipoVeicoloB,
          collisioneVisibile: stepperData.collisioneVisibile,
          collisione: stepperData.collisione,
          inItaliaVisibile: stepperData.inItaliaVisibile,
          inItalia: false,
          tipoSinistro: "NO CARD",
        });
      }
    }
  };

  const renderCardNoCard = (val: boolean) => <CardCheck isCard={val}>{val ? "CARD" : "NO CARD"}</CardCheck>;

  return (
    <CardDataStyled>
      <table>
        <tbody>
          <TrStyled>
            <td>
              <TdQuestion>Quanti veicoli sono stati coinvolti?</TdQuestion>
            </td>
            <TdVehicleLabel></TdVehicleLabel>
            <td>
              <TdRight>
                <FormInput name="numero_veicoli" style={{ marginBottom: 0, textAlign: "right" }}>
                  <InputNumber max={100} min={0} onChange={(val) => handleChangeStepperData(val, "vehicles_number")} />
                </FormInput>
              </TdRight>
            </td>
            <td>{renderCardNoCard(stepperData.veicoloAVisibile)}</td>
          </TrStyled>
          {(stepperData.veicoloAVisibile || stepperData.veicoloBVisibile) && (
            <TrStyled>
              <td>
                <TdQuestion>Quale tipo di veicoli sono stati coinvolti?</TdQuestion>
              </td>
              <TdVehicleLabel>Veicolo A</TdVehicleLabel>
              <td>
                <TdRight>
                  <FormInput name="tipo_veicolo_a" style={{ marginBottom: 0 }}>
                    <Select
                      defaultValue="---"
                      onChange={(val) => handleChangeStepperData(val, "vehicle_a_type")}
                      options={VehicleTypeOptions}
                    />
                    <Hidden>{stepperData.tipoVeicoloA}</Hidden>
                  </FormInput>
                </TdRight>
              </td>
              <td>{renderCardNoCard(stepperData.veicoloBVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.veicoloBVisibile && (
            <TrStyled>
              <td></td>
              <TdVehicleLabel>Veicolo B</TdVehicleLabel>
              <td>
                <TdRight>
                  <FormInput name="tipo_veicolo_b" style={{ marginBottom: 0 }}>
                    <Select
                      defaultValue="---"
                      onChange={(val) => handleChangeStepperData(val, "vehicle_b_type")}
                      options={VehicleTypeOptions}
                    />
                    <Hidden>{stepperData.tipoVeicoloB}</Hidden>
                  </FormInput>
                </TdRight>
              </td>
              <td>{renderCardNoCard(stepperData.collisioneVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.collisioneVisibile && (
            <TrStyled>
              <td>
                <TdQuestion>C'è stata una collisione?</TdQuestion>
              </td>
              <TdVehicleLabel></TdVehicleLabel>
              <td>
                <TdRight>
                  <Switch
                    unCheckedChildren={"No"}
                    checkedChildren={"Si"}
                    onChange={(val) => handleChangeStepperData(val, "collision")}
                  />
                </TdRight>
              </td>
              <td>{renderCardNoCard(stepperData.inItaliaVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.inItaliaVisibile && (
            <TrStyled>
              <td>
                <TdQuestion>Il luogo di accadimento è in Italia, San Marino o Vaticano?</TdQuestion>
              </td>
              <TdVehicleLabel></TdVehicleLabel>
              <td>
                <TdRight>
                  <Switch
                    unCheckedChildren={"No"}
                    checkedChildren={"Si"}
                    onChange={(val) => handleChangeStepperData(val, "inItaly")}
                  />
                </TdRight>
              </td>
              <td>{renderCardNoCard(stepperData.tipoSinistro === "CARD")}</td>
            </TrStyled>
          )}
        </tbody>
      </table>

      {["CARD", "NO CARD"].indexOf(stepperData.tipoSinistro) > -1 && (
        <CardNoCardResult isCard={stepperData.tipoSinistro === "CARD"}>
          In base ai dati inseriti il sinistro risulta di tipo <b>{stepperData.tipoSinistro}</b>
        </CardNoCardResult>
      )}
    </CardDataStyled>
  );
};

export default CardData;
