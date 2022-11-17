import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";
import { InjuryLocationNumber, InjuryNatureNumber } from "../../config/const";

import { useTranslation } from "react-i18next";
import { PartDamagedDetailsPerson } from "./DamagedPart";

const DamagedPartPersonStyled = styled.div``;

type InjuryLocationType = {
  value: string;
  label: string;
};

interface DamagedPartPersonProps {
  index: number;
  details: PartDamagedDetailsPerson;
}

const DamagedPartPerson = (props: DamagedPartPersonProps) => {
  const { t } = useTranslation();

  const injuryNatureOptions = Array.from(Array(InjuryNatureNumber).keys()).map((i) => {
    const txt = t(`injuryNature_${i}`);
    return {
      value: txt,
      label: txt,
    };
  });

  const injuryLocationOptions = Array.from(Array(InjuryLocationNumber).keys())
    .map((i) => {
      const label = t(`injuryLocation_${i}`);
      if (label === "") return null;

      const txt = t(label);

      return {
        value: txt,
        label: txt,
      };
    })
    .filter((o) => o !== null) as InjuryLocationType[];

  return (
    <DamagedPartPersonStyled>
      <FormInput label="Tipo Natura Danno" name={`tipo_natura_danno${props.index}`} tooltip="Tipo natura del danno">
        <Select defaultValue="---" options={injuryNatureOptions} />
        <Hidden>{props.details.nature}</Hidden>
      </FormInput>
      <FormInput label="Sede della lesione" name={`sede_lesione_${props.index}`} tooltip="Sede della lesione">
        <Select defaultValue="---" options={injuryLocationOptions} />
        <Hidden>{props.details.location}</Hidden>
      </FormInput>
      <FormInput
        label="Note Natura Danno"
        name={`note_natura_danno_${props.index}`}
        tooltip="Note relative alla natura del danno"
      >
        <Input />
        <Hidden>{props.details.note}</Hidden>
      </FormInput>
    </DamagedPartPersonStyled>
  );
};

export default DamagedPartPerson;
