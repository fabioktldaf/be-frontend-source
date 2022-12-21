import { TFunction } from "i18next";
import React from "react";
import { IApplication } from "../../application";
import useApplication from "../../hooks/useApplication";
import { RowSpacer } from "../../style/containers";
import { FormContentTab, FormRow } from "../../style/form";
import { InputTextStyled, SelectStyled, SwitchStyled } from "../../style/Input";
import { PolicyDataType } from "../../types/policy.types";
import { CarsData } from "../../config/dummy-data";
import { SelectPair } from "../../types/new-claim.types";
import { PlateFormats, VehicleTypeOptions } from "../../config/const";

const carsBrandOptions = CarsData.map((c) => ({
  label: c.brand,
  value: c.brand,
}));

const getCarsModelOptions = (brand: string | undefined): SelectPair[] => {
  return (
    CarsData.find((c) => c.brand === brand)?.models.map(
      (m) =>
        ({
          label: m,
          value: m,
        } as SelectPair)
    ) || []
  );
};

interface PolicyGoodInsuredProps {
  policy?: PolicyDataType;
  app: IApplication;
  readOnly?: boolean;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const PolicyGoodInsured = (props: PolicyGoodInsuredProps) => {
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
          label="Marca"
          tooltip="Seleziona la marca"
          defaultValue="---"
          showSearch
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
          value={policy?.goodInsured?.brand}
          onChange={(val) => handleChangeData(val, "goodInsured.brand")}
          options={carsBrandOptions}
        />
        <RowSpacer />
        <SelectStyled
          label="Modello"
          tooltip="Seleziona il modello"
          defaultValue="AUTO"
          value={policy?.goodInsured?.model}
          onChange={(val) => handleChangeData(val, "goodInsured.model")}
          options={getCarsModelOptions(policy?.goodInsured?.brand)}
        />
      </FormRow>
      <FormRow>
        <SelectStyled
          label="Tipo Veicolo"
          tooltip="Seleziona il tipo veicolo"
          value={policy?.goodInsured?.vehicleType}
          onChange={(val) => handleChangeData(val, "goodInsured.vehicleType")}
          options={VehicleTypeOptions}
        />
        <RowSpacer />
        <SwitchStyled
          label="Speciale"
          checkedChildren={"Si"}
          unCheckedChildren={"No"}
          onChange={(val) => handleChangeData(val, "goodInsured.isSpecial")}
          checked={policy?.goodInsured?.isSpecial}
        />
      </FormRow>
      <FormRow>
        <InputTextStyled
          label="Targa"
          tooltip="Inserisci la targa del veicolo"
          rules={[{ required: true, message: "La targa del veicolo è obbligatoria" }]}
          placeholder="targa ..."
          value={policy?.goodInsured?.plate}
          onChange={(val) => handleChangeData(val, "goodInsured.plate")}
        />
        <RowSpacer />
        <SelectStyled
          label="Tipo Targa"
          tooltip="Seleziona il tipo targa"
          value={policy?.goodInsured?.plateType}
          onChange={(val) => handleChangeData(val, "goodInsured.plateType")}
          options={PlateFormats}
        />
      </FormRow>
    </FormContentTab>
  );
};

export default PolicyGoodInsured;
