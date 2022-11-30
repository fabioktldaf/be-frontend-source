import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, Switch, Collapse, Select, Segmented } from "antd";
import { Hidden, Row, RowSpacer } from "../../style/containers";
import { FormInput, FormDatePicker, FormTextArea, FormTimePicker, FormSubTitle, FormRow } from "../../style/form";
import CardData from "./CardData";
import moment from "moment";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useApplication from "../../hooks/useApplication";
import { insuranceCodes } from "../../config/dummy-data";
import { InputTextStyled, SegmentedStyled, SelectStyled } from "../../style/Input";

const ClaimDataStyled = styled.div``;

const CounterpartData = () => {
  const app = useApplication();
  const counterpartData = useSelector((state: RootState) => state.newClaim.counterpartData);

  return (
    <ClaimDataStyled>
      <FormSubTitle>DATI CONTROPARTE</FormSubTitle>
      <FormRow>
        <SegmentedStyled
          label="Proprietario tipo persona"
          tooltip="Seleziona il tipo persona del proprietario"
          options={["Fisica", "Giuridica"]}
          value={counterpartData?.isOwnerNaturalPerson ? "Fisica" : "Giuridica"}
          onChange={(val) => app.updateCounterpartData(val === "Fisica", "isOwnerNaturalPerson")}
        />
      </FormRow>
      {counterpartData?.isOwnerNaturalPerson && (
        <FormRow>
          <InputTextStyled
            label="Proprietario nome"
            tooltip="Inserisci il nome del proprietario della controparte"
            rules={[{ required: true, message: "Il nome del proprietario della controparte è obbligatorio" }]}
            placeholder="nome proprietario controparte ..."
            value={counterpartData?.ownerName}
            onChange={(txt) => app.updateCounterpartData(txt, "ownerName")}
          />

          <RowSpacer />
          <InputTextStyled
            label="Proprietario cognome"
            tooltip="Inserisci il cognome del proprietario della controparte"
            rules={[{ required: true, message: "Il cognome del proprietario della controparte è obbligatorio" }]}
            placeholder="nome proprietario controparte ..."
            value={counterpartData?.ownerLastname}
            onChange={(val) => app.updateCounterpartData(val, "ownerLastname")}
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
            onChange={(val) => app.updateCounterpartData(val, "ownerBusinessName")}
          />
        </FormRow>
      )}
      <FormRow>
        <InputTextStyled
          label="Conducente nome"
          tooltip="Inserisci il nome del conducente della controparte"
          placeholder="nome del conducente della controparte ..."
          value={counterpartData?.driverName}
          onChange={(val) => app.updateCounterpartData(val, "driverName")}
        />

        <RowSpacer />
        <InputTextStyled
          label="Conducente Cognome"
          tooltip="Inserisci il cognome conducente della controparte"
          placeholder="cognome conducente della controparte ..."
          value={counterpartData?.driverLastname}
          onChange={(val) => app.updateCounterpartData(val, "driverLastname")}
        />
      </FormRow>
      <FormRow>
        <InputTextStyled
          label="Targa"
          tooltip="Inserisci la targa del veicolo della controparte"
          rules={[{ required: true, message: "La targa del veicolo della controparte è obbligatoria" }]}
          placeholder="targa ..."
          value={counterpartData?.plate}
          onChange={(val) => app.updateCounterpartData(val, "plate")}
        />

        <RowSpacer />
        <SelectStyled
          label="Compagnia Assicurativa"
          tooltip="Seleziona la compagnia assicurativa della controparte"
          defaultValue="---"
          showSearch
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
          value={counterpartData?.insuranceCode}
          onChange={(val) => app.updateCounterpartData(val, "insuranceCode")}
          options={insuranceCodes}
        />
      </FormRow>
    </ClaimDataStyled>
  );
};

export default CounterpartData;
