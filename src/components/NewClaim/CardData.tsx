import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, Select } from "antd";
import { Row, RowSpacer, Hidden } from "../../style/containers";
import { FormSubTitle, FormInput, FormDatePicker, FormTextArea } from "../../style/form";

const CardDataStyled = styled.div``;

type VehicoleNumberType = "1" | "2" | "3" | "---";
type VehicoleTypeType = "A" | "B" | "C" | "M" | "Q" | "T" | "W" | "R" | "S" | "---";
type PlaceOfOccurrenceType = "Italia" | "San Marino" | "Vaticano" | "Esteri" | "---";
type DateOfOccurrance = "Entro 2 anni" | "Superiore a 2 anni" | "---";
type ClaimType = "CARD" | "NO CARD" | "---";

type StepperDataType = {
  numeroVeicoliCoinvolti: VehicoleNumberType;
  veicoloAVisibile: boolean;
  tipoVeicoloA: VehicoleTypeType;
  veicoloBVisibile: boolean;
  tipoVeicoloB: VehicoleTypeType;
  luogoAccadimentoVisibile: boolean;
  luogoAccadimento: PlaceOfOccurrenceType;
  dataAccadimentoVisibile: boolean;
  dataAccadimento: DateOfOccurrance;
  tipoSinistro: ClaimType;
};

type SteppedChangeDataType =
  | "vehicles_number"
  | "vehicle_a_type"
  | "vehicle_b_type"
  | "place_of_occurrence"
  | "date_of_occurrence";

const CardData = () => {
  const [stepperData, setStepperData] = useState<StepperDataType>({
    numeroVeicoliCoinvolti: "---",
    veicoloAVisibile: false,
    tipoVeicoloA: "---",
    veicoloBVisibile: false,
    tipoVeicoloB: "---",
    luogoAccadimentoVisibile: false,
    luogoAccadimento: "---",
    dataAccadimentoVisibile: false,
    dataAccadimento: "---",
    tipoSinistro: "---",
  });

  const [numeroVeicoliCoinvolti, setNumeroVeicoliCoinvolti] = useState<VehicoleNumberType>();
  const [tipoVeicoloA, setTipoVeicoloA] = useState<VehicoleTypeType>("---");
  const [tipoVeicoloB, setTipoVeicoloB] = useState<VehicoleTypeType>("---");
  const [luogoAccadimento, setLuogoAccadimento] = useState<PlaceOfOccurrenceType>("---");
  const [dataAccadimento, setDataAccadimento] = useState<DateOfOccurrance>("---");
  const [tipoSinistro, setTipoSinistro] = useState<ClaimType>("---");

  const handleChangeStepperData = (val: any, field: SteppedChangeDataType) => {
    if (field === "vehicles_number") {
      if (val === "2") {
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
          luogoAccadimentoVisibile: false,
          luogoAccadimento: "---",
          dataAccadimentoVisibile: false,
          dataAccadimento: "---",
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
            luogoAccadimentoVisibile: false,
            luogoAccadimento: "---",
            dataAccadimentoVisibile: false,
            dataAccadimento: "---",
            tipoSinistro: "NO CARD",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: val,
          veicoloBVisibile: false,
          tipoVeicoloB: "---",
          luogoAccadimentoVisibile: false,
          luogoAccadimento: "---",
          dataAccadimentoVisibile: false,
          dataAccadimento: "---",
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "vehicle_b_type") {
      if (["A", "B", "C", "M", "Q", "T", "W"].indexOf(val) >= 0) {
        setStepperData(
          Object.assign({}, stepperData, {
            tipoVeicoloB: val,
            luogoAccadimentoVisibile: true,
            luogoAccadimento: "---",
            dataAccadimentoVisibile: false,
            dataAccadimento: "---",
            tipoSinistro: "NO CARD",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: stepperData.tipoVeicoloA,
          veicoloBVisibile: stepperData.veicoloBVisibile,
          tipoVeicoloB: val,
          luogoAccadimentoVisibile: false,
          luogoAccadimento: "---",
          dataAccadimentoVisibile: false,
          dataAccadimento: "---",
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "place_of_occurrence") {
      if (["Italia", "San Marino", "Vaticano"].indexOf(val) >= 0) {
        setStepperData(
          Object.assign({}, stepperData, {
            luogoAccadimento: val,
            dataAccadimentoVisibile: true,
            dataAccadimento: "---",
            tipoSinistro: "NO CARD",
          })
        );
      } else {
        setStepperData({
          numeroVeicoliCoinvolti: stepperData.numeroVeicoliCoinvolti,
          veicoloAVisibile: stepperData.veicoloAVisibile,
          tipoVeicoloA: stepperData.tipoVeicoloA,
          veicoloBVisibile: stepperData.veicoloBVisibile,
          tipoVeicoloB: stepperData.tipoVeicoloB,
          luogoAccadimentoVisibile: stepperData.luogoAccadimentoVisibile,
          luogoAccadimento: val,
          dataAccadimentoVisibile: false,
          dataAccadimento: "---",
          tipoSinistro: "NO CARD",
        });
      }
    }
    if (field === "date_of_occurrence") {
      if (val === "Entro 2 anni") {
        setStepperData(
          Object.assign({}, stepperData, {
            dataAccadimento: val,
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
          luogoAccadimentoVisibile: stepperData.luogoAccadimentoVisibile,
          luogoAccadimento: stepperData.luogoAccadimento,
          dataAccadimentoVisibile: stepperData.luogoAccadimentoVisibile,
          dataAccadimento: val,
          tipoSinistro: "NO CARD",
        });
      }
    }
  };

  console.log("StepperData ", stepperData);

  return (
    <CardDataStyled>
      <FormSubTitle>Dati Card</FormSubTitle>
      <Row>
        <FormInput label="Numero Veicoli" name="numero_veicoli" tooltip="Quanti veicoli sono stati coinvolti?">
          <Select
            defaultValue="---"
            onChange={(val) => handleChangeStepperData(val, "vehicles_number")}
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3 o pù" },
            ]}
          />
        </FormInput>
        <RowSpacer />
      </Row>
      <Row>
        {stepperData.veicoloAVisibile && (
          <FormInput label="Tipo Veicolo A" name="tipo_veicolo_a" tooltip="Tipo del veicolo A">
            <Select
              defaultValue="---"
              onChange={(val) => handleChangeStepperData(val, "vehicle_a_type")}
              options={[
                { value: "---", label: "---" },
                { value: "A", label: "AUTOVETTURA" },
                { value: "B", label: "AUTOBUS" },
                { value: "C", label: "AUTOCARRI" },
                { value: "M", label: "MOTOCICLI" },
                { value: "Q", label: "MOTOCARRI" },
                { value: "T", label: "MACCHINE OPERATRICI" },
                { value: "W", label: "CICLOMOTORI" },
                { value: "R", label: "RIMORCHI" },
                { value: "S", label: "MACCHINE AGRICOLE" },
              ]}
            />
            <Hidden>{stepperData.tipoVeicoloA}</Hidden>
          </FormInput>
        )}
        <RowSpacer />

        {stepperData.veicoloBVisibile && (
          <FormInput label="Tipo Veicolo B" name="tipo_veicolo_b" tooltip="Tipo del veicolo B">
            <Select
              defaultValue="---"
              onChange={(val) => handleChangeStepperData(val, "vehicle_b_type")}
              options={[
                { value: "---", label: "---" },
                { value: "A", label: "AUTOVETTURA" },
                { value: "B", label: "AUTOBUS" },
                { value: "C", label: "AUTOCARRI" },
                { value: "M", label: "MOTOCICLI" },
                { value: "Q", label: "MOTOCARRI" },
                { value: "T", label: "MACCHINE OPERATRICI" },
                { value: "W", label: "CICLOMOTORI" },
                { value: "R", label: "RIMORCHI" },
                { value: "S", label: "MACCHINE AGRICOLE" },
              ]}
            />
            <Hidden>{stepperData.tipoVeicoloB}</Hidden>
          </FormInput>
        )}
      </Row>
      <Row>
        {stepperData.luogoAccadimentoVisibile && (
          <FormInput label="Luogo Accadimento" name="luogo_accadimento" tooltip="Luogo accadimento del sinistro">
            <Select
              defaultValue="---"
              onChange={(val) => handleChangeStepperData(val, "place_of_occurrence")}
              options={[
                { value: "---", label: "---" },
                { value: "Italia", label: "Italia" },
                { value: "San Marino", label: "San Marino" },
                { value: "Vaticano", label: "Vaticano" },
                { value: "Esteri", label: "Esteri" },
              ]}
            />
            <Hidden>{stepperData.luogoAccadimento}</Hidden>
          </FormInput>
        )}
        <RowSpacer />
        {stepperData.dataAccadimentoVisibile && (
          <FormInput label="Data Accadimento" name="data_accadimento" tooltip="Data accadimento del sinistro">
            <Select
              defaultValue="---"
              onChange={(val) => handleChangeStepperData(val, "date_of_occurrence")}
              options={[
                { value: "---", label: "---" },
                { value: "Entro 2 anni", label: "Entro 2 anni" },
                { value: "Superiore a 2 anni", label: "Superiore a 2 anni" },
              ]}
            />
            <Hidden>{stepperData.dataAccadimento}</Hidden>
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
              { value: "firma_congiunta", label: "Firma Congiunta" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput label="Classificazione" name="classificazione" tooltip="Seleziona la classificazione">
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: " ", label: " " },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "N", label: "N" },
            ]}
          />
        </FormInput>
        <RowSpacer />
      </Row>
      <Row>
        <FormInput label="Nota Ania" name="nota_ania" tooltip="Inserisci una nota utente">
          <FormTextArea placeholder="nota utente ..." rows={5} maxLength={1000} />
        </FormInput>
      </Row>
    </CardDataStyled>
  );
};

export default CardData;
