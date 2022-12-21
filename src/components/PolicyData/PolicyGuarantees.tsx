import { TFunction } from "i18next";
import React from "react";
import { IApplication } from "../../application";
import useApplication from "../../hooks/useApplication";
import { RowSpacer } from "../../style/containers";
import { FormContentTab, FormRow } from "../../style/form";
import { DatePickerStyled, SelectStyled } from "../../style/Input";
import { PolicyDataType } from "../../types/policy.types";

interface PolicyGuaranteesProps {
  policy?: PolicyDataType;
  app: IApplication;
  readOnly?: boolean;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const PolicyGuarantees = (props: PolicyGuaranteesProps) => {
  const { policy } = props;
  const app = useApplication();

  const handleChangeData = (value: any, field: string) => {
    //
    console.log("updateing ", field);
    console.log("value ", value);
  };

  return (
    <FormContentTab>
      <FormRow>
        <SelectStyled
          label="Codice Garanzia"
          tooltip="Seleziona il codice di garanzia"
          defaultValue="---"
          value={policy?.guarantees?.code}
          onChange={(val) => handleChangeData(val, "guarantees.code")}
          options={[{ label: "RCA", value: "RCA" }]}
        />
        <RowSpacer />
        <div style={{ flex: 1 }}></div>
      </FormRow>
      <FormRow>
        <DatePickerStyled
          label="Data Effetto"
          tooltip="Seleziona la data effetto"
          rules={[{ required: true, message: "La data effetto è obbligatoria" }]}
          placeholder="data effetto ..."
          value={props.policy?.policyData?.effectDate}
          onChange={(val) => handleChangeData(val, "guarantees.effectDate")}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <DatePickerStyled
          label="Data Scadenza"
          tooltip="Seleziona la data scadenza"
          rules={[{ required: true, message: "La data scadenza è obbligatoria" }]}
          placeholder="data scadenza ..."
          value={props.policy?.policyData?.expiringDate}
          onChange={(val) => handleChangeData(val, "guarantees.expiringDate")}
          format={"DD/MM/YYYY"}
        />
      </FormRow>
    </FormContentTab>
  );
};

export default PolicyGuarantees;
