import { TFunction } from "i18next";
import React from "react";
import { IApplication } from "../../application";
import { insuranceCodesWithCodes } from "../../config/const";
import useApplication from "../../hooks/useApplication";
import { RowSpacer } from "../../style/containers";
import { FormContentTab, FormRow } from "../../style/form";
import { DatePickerStyled, InputTextStyled, SelectStyled } from "../../style/Input";
import { PolicyDataType } from "../../types/policy.types";

interface PolicyDataProps {
  policy?: PolicyDataType;
  app: IApplication;
  readOnly?: boolean;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const PolicyData = (props: PolicyDataProps) => {
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
          label="Compagnia Assicurativa"
          tooltip="Seleziona la compagnia assicurativa della controparte"
          defaultValue="---"
          showSearch
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
          value={props.policy?.policyData?.companyCode}
          onChange={(val) => handleChangeData(val, "policyData.companyCode")}
          options={insuranceCodesWithCodes}
        />
        <RowSpacer />
        <SelectStyled
          label="Ramo Polizza"
          tooltip="Seleziona il ramo polizza"
          defaultValue="AUTO"
          value={props.policy?.policyData?.branch}
          onChange={(val) => handleChangeData(val, "policyData.branch")}
          options={[{ value: "AUTO", label: "AUTO" }]}
        />
      </FormRow>
      <FormRow>
        <InputTextStyled
          label="Numero Polizza"
          tooltip="Inserisci il numero polizza"
          rules={[{ required: true, message: "Il numero polizza è obbligatorio" }]}
          placeholder="numero polizza ..."
          value={props.policy?.policyData?.number}
          onChange={(val) => handleChangeData(val, "policyData.number")}
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
          onChange={(val) => handleChangeData(val, "policyData.effectDate")}
          format={"DD/MM/YYYY"}
        />
        <RowSpacer />
        <DatePickerStyled
          label="Data Scadenza"
          tooltip="Seleziona la data scadenza"
          rules={[{ required: true, message: "La data scadenza è obbligatoria" }]}
          placeholder="data scadenza ..."
          value={props.policy?.policyData?.expiringDate}
          onChange={(val) => handleChangeData(val, "policyData.expiringDate")}
          format={"DD/MM/YYYY"}
        />
      </FormRow>
    </FormContentTab>
  );
};

export default PolicyData;
