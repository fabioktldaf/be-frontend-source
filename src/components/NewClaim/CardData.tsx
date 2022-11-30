import React from "react";
import styled from "styled-components";
import { Switch } from "antd";
import { VehicleTypeOptions } from "../../config/const";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { InputNumberStyled, SelectStyled } from "../../style/Input";

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

const TdAnswer = styled.td`
  text-align: right;
  padding: 0.5em 0;
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

const CardData = () => {
  const app = useApplication();
  const stepperData = useSelector((state: RootState) => state.newClaim.stepperData);

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
            <TdAnswer>
              <InputNumberStyled
                min={0}
                max={10}
                value={stepperData.numeroVeicoliCoinvolti}
                onChange={(val) => app.updatedStepperData(val, "vehicles_number")}
              />
            </TdAnswer>
            <td>{renderCardNoCard(stepperData.veicoloAVisibile)}</td>
          </TrStyled>
          {(stepperData.veicoloAVisibile || stepperData.veicoloBVisibile) && (
            <TrStyled>
              <td>
                <TdQuestion>Quale tipo di veicoli sono stati coinvolti?</TdQuestion>
              </td>
              <TdVehicleLabel>Veicolo A</TdVehicleLabel>
              <TdAnswer>
                <SelectStyled
                  onChange={(val) => app.updatedStepperData(val, "vehicle_a_type")}
                  options={VehicleTypeOptions}
                  value={stepperData.tipoVeicoloA}
                />
              </TdAnswer>
              <td>{renderCardNoCard(stepperData.veicoloBVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.veicoloBVisibile && (
            <TrStyled>
              <td></td>
              <TdVehicleLabel>Veicolo B</TdVehicleLabel>
              <TdAnswer>
                <SelectStyled
                  onChange={(val) => app.updatedStepperData(val, "vehicle_b_type")}
                  options={VehicleTypeOptions}
                  value={stepperData.tipoVeicoloB}
                />
              </TdAnswer>
              <td>{renderCardNoCard(stepperData.collisioneVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.collisioneVisibile && (
            <TrStyled>
              <td>
                <TdQuestion>C'è stata una collisione?</TdQuestion>
              </td>
              <TdVehicleLabel></TdVehicleLabel>
              <TdAnswer>
                <Switch
                  unCheckedChildren={"No"}
                  checkedChildren={"Si"}
                  onChange={(val) => app.updatedStepperData(val, "collision")}
                  checked={stepperData.collisione}
                />
              </TdAnswer>
              <td>{renderCardNoCard(stepperData.inItaliaVisibile)}</td>
            </TrStyled>
          )}
          {stepperData.inItaliaVisibile && (
            <TrStyled>
              <td>
                <TdQuestion>Il luogo di accadimento è in Italia, San Marino o Vaticano?</TdQuestion>
              </td>
              <TdVehicleLabel></TdVehicleLabel>
              <TdAnswer>
                <Switch
                  unCheckedChildren={"No"}
                  checkedChildren={"Si"}
                  onChange={(val) => app.updatedStepperData(val, "inItaly")}
                  checked={stepperData.inItalia}
                />
              </TdAnswer>
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
