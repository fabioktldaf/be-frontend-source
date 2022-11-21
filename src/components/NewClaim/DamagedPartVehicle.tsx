import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import { useTranslation } from "react-i18next";
import { vehicleCollisionPoints, VehicleTypeOptions } from "../../config/const";
import { PartDamagedDetailsVehicle } from "./DamagedPart";

const DamagedPartVehicleStyled = styled.div``;

interface DamagedPartVehicleProps {
  details: PartDamagedDetailsVehicle;
  readOnly?: boolean;
}

export const plateFormats = [
  { value: "---", label: "---" },
  {
    value: "T",
    label: "Targa Italia",
  },
  {
    value: "X",
    label: "Targg Prova",
  },
  {
    value: "Y",
    label: "Targg Provvisorie",
  },
  {
    value: "J",
    label: "Targa Filobus",
  },
];

const DamagedPartVehicle = (props: DamagedPartVehicleProps) => {
  const { t } = useTranslation();

  const renderCollisionPoint = (code: string) => {
    const cp = vehicleCollisionPoints.find((p) => p.code === code);
    return <div>{`${cp!.code} - ${cp!.label}`}</div>;
  };
  return (
    <DamagedPartVehicleStyled>
      <FormInput label="Targa" name={`targa`} tooltip="Targa del veicolo">
        {props.readOnly ? <div>{props.details.plate}</div> : <Input maxLength={10} />}
      </FormInput>
      <FormInput label="Formato della targa" name={`fomato_targa`} tooltip="Formato della targa">
        {props.readOnly ? <div>{props.details.format}</div> : <Select defaultValue="---" options={plateFormats} />}
      </FormInput>
      <FormInput label="Tipo veicolo" name={`tipo_veicolo`} tooltip="Tipo del veicolo">
        {props.readOnly ? <div>{props.details.type}</div> : <Select defaultValue="---" options={VehicleTypeOptions} />}
      </FormInput>

      {props.details.collisionPoints?.length > 0 && (
        <FormInput label="Punti di impatto" name={`punti_impatto`} tooltip="Punti di impatto del veicolo">
          {props.details.collisionPoints?.map((c) => renderCollisionPoint(c))}
        </FormInput>
      )}
    </DamagedPartVehicleStyled>
  );
};

export default DamagedPartVehicle;
