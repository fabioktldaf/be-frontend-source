import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import { useTranslation } from "react-i18next";
import { VehicleTypeOptions } from "../../config/const";
import { PartDamagedDetailsVehicle } from "./DamagedPart";

const DamagedPartVehicleStyled = styled.div``;

interface DamagedPartVehicleProps {
  details: PartDamagedDetailsVehicle;
}

const DamagedPartVehicle = (props: DamagedPartVehicleProps) => {
  const { t } = useTranslation();

  return (
    <DamagedPartVehicleStyled>
      <FormInput label="Targa" name={`targa`} tooltip="Targa del veicolo">
        <Input maxLength={10} />
      </FormInput>
      <FormInput label="Formato della targa" name={`fomato_targa`} tooltip="Formato della targa">
        <Select
          defaultValue="---"
          options={[
            {
              value: "Targhe Italia",
              label: "Targhe Italia",
            },
            {
              value: "Targhe Prova",
              label: "Targhe Prova",
            },
            {
              value: "Targhe Provvisorie",
              label: "Targhe Provvisorie",
            },
            {
              value: "Targhe Filobus",
              label: "Targhe Filobus",
            },
          ]}
        />
      </FormInput>
      <FormInput label="Tipo veicolo" name={`tipo_veicolo`} tooltip="Tipo del veicolo">
        <Select defaultValue="---" options={VehicleTypeOptions} />
      </FormInput>
    </DamagedPartVehicleStyled>
  );
};

export default DamagedPartVehicle;
