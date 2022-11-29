import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, Switch, Collapse, Select, Segmented } from "antd";
import { Hidden, Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormTextArea, FormTimePicker, FormSubTitle } from "../../style/form";
import CardData from "./CardData";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useApplication from "../../hooks/useApplication";
import { insuranceCodes } from "../../config/dummy-data";

const ClaimDataStyled = styled.div``;

export const HrStyled = styled.div`
  height: 1px;
  border-top: 1px solid #eee;
  width: 100%;
  margin-bottom: 2em;
`;

const CounterpartData = () => {
  const app = useApplication();
  const counterpartData = useSelector((state: RootState) => state.newClaim.counterpartData);

  return (
    <ClaimDataStyled>
      <FormSubTitle>DATI CONTROPARTE</FormSubTitle>
      <Row>
        <FormInput
          label="Proprietario tipo persona"
          name="proprietario_tipo_persona"
          tooltip="Seleziona il tipo persona del proprietario"
        >
          <Segmented
            options={["Fisica", "Giuridica"]}
            value={counterpartData?.isOwnerNaturalPerson ? "Fisica" : "Giuridica"}
            onChange={(val) => app.updateCounterpartData(val === "Fisica", "isOwnerNaturalPerson")}
          />
        </FormInput>
      </Row>
      {counterpartData?.isOwnerNaturalPerson && (
        <Row>
          <FormInput
            label="Proprietario nome"
            name="nome_controparte"
            tooltip="Inserisci il nome del proprietario della controparte"
            rules={[{ required: true, message: "Il nome del proprietario della controparte è obbligatorio" }]}
          >
            <Input
              placeholder="nome proprietario controparte ..."
              value={counterpartData?.ownerName}
              onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "ownerName")}
            />
          </FormInput>
          <RowSpacer />
          <FormInput
            label="Proprietario cognome"
            name="Cognome_controparte"
            tooltip="Inserisci il cognome del proprietario della controparte"
            rules={[{ required: true, message: "Il cognome del proprietario della controparte è obbligatorio" }]}
          >
            <Input
              placeholder="nome proprietario controparte ..."
              value={counterpartData?.ownerLastname}
              onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "ownerLastname")}
            />
          </FormInput>
        </Row>
      )}
      {!counterpartData?.isOwnerNaturalPerson && (
        <Row>
          <FormInput
            label="Ragione sociale"
            name="ragione_sociale_controparte"
            tooltip="Inserisci la ragione sociale della controparte"
            rules={[{ required: true, message: "La ragione sociale della controparte è obbligatorio" }]}
          >
            <Input
              placeholder="ragione sociale controparte ..."
              value={counterpartData?.ownerBusinessName}
              onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "ownerBusinessName")}
            />
          </FormInput>
          <RowSpacer />
        </Row>
      )}
      <Row>
        <FormInput
          label="Conducente nome"
          name="nome_conducente_controparte"
          tooltip="Inserisci il nome del conducente della controparte"
        >
          <Input
            placeholder="nome del conducente della controparte ..."
            value={counterpartData?.driverName}
            onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "driverName")}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Conducente Cognome"
          name="cognome_conducente_controparte"
          tooltip="Inserisci il cognome conducente della controparte"
        >
          <Input
            placeholder="cognome conducente della controparte ..."
            value={counterpartData?.driverLastname}
            onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "driverLastname")}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Targa"
          name="targa_controparte"
          tooltip="Inserisci la targa del veicolo della controparte"
          rules={[{ required: true, message: "La targa del veicolo della controparte è obbligatoria" }]}
        >
          <Input
            placeholder="targa ..."
            value={counterpartData?.plate}
            onChange={(val) => app.updateCounterpartData(val.currentTarget.value, "plate")}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Compagnia Assicurativa"
          name="compagnia_assicurativa_controparte"
          tooltip="Seleziona la compagnia assicurativa della controparte"
        >
          <Select
            defaultValue="---"
            showSearch
            filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
            value={counterpartData?.insuranceCode}
            onChange={(val) => app.updateCounterpartData(val, "insuranceCode")}
            options={insuranceCodes}
          />
          <Hidden>{counterpartData?.insuranceCode}</Hidden>
        </FormInput>
      </Row>
    </ClaimDataStyled>
  );
};

export default CounterpartData;
