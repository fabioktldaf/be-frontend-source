import React from "react";
import { Tooltip, Button, Switch } from "antd";
import styled from "styled-components";
import { SubjectData, SubjectAddressData } from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";
import { Col, Row, RowSpacer } from "../../style/containers";
import { InputAddress, InputTextStyled, SelectStyled, SwitchStyled } from "../../style/Input";
import { AddressTypes } from "../../config/const";
import { IconDelete, IconEdit } from "../../config/icons";
import { FormContentTab, FormRow } from "../../style/form";
import { TitleHr } from "../Layout/Titles";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";

const AddressStyled = styled.div`
  margin-bottom: 4em;
`;

const ButtonDeleteAddress = styled(Button)`
  font-size: 0.9em;
  text-transform: uppercase;
`;

interface SubjectDetailsAddressesProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsAddresses = (props: SubjectDetailsAddressesProps) => {
  const { subject, readOnly, app, t } = props;
  const addresses: SubjectAddressData[] = subject?.addresses || [];

  const handleAddAddress = () => {
    app.editingSubjectAddAddress();
  };

  const handleRemoveAddress = (index: number) => {
    app.editingSubjectRemoveAddress(index);
  };

  const renderAddress = (address: SubjectAddressData, index: number) => {
    const handleChangeAddress = (value: any, field: string) => {
      //
    };

    const { street, civic, cap, city, province, country } = address;

    const addressValue = `${street} ${civic}, ${cap} ${city} ${province} ${country}`;

    return (
      <>
        <div style={{ position: "relative", zIndex: "1" }}>
          <TitleHr text="Indirizzo" containerStyle={{ zIndex: "1" }} />
          <RowSpacer />
          <ButtonDelete
            text="Elimina"
            onClick={() => handleRemoveAddress(index)}
            style={{ position: "absolute", right: "0", top: "1.2em", zIndex: "2" }}
          />
        </div>
        <FormRow>
          <SelectStyled
            label="Tipo Indirizzo"
            tooltip="Seleziona il tipo di indirizzo"
            defaultValue="---"
            value={address.type}
            onChange={(val) => handleChangeAddress(val, "type")}
            options={AddressTypes}
          />
          <RowSpacer />
          <SwitchStyled
            label="Preferito"
            unCheckedChildren={"No"}
            checkedChildren={"Si"}
            onChange={(val) => handleChangeAddress(val, "preferred")}
            checked={address.preferred}
          />
        </FormRow>
        <FormRow>
          <InputAddress
            label="Indirizzo"
            tooltip="Indirizzo"
            placeholder="luogo di nascita.."
            onEdit={() => {}}
            value={addressValue}
            onChange={(data) => handleChangeAddress(data, "-data-")}
          />
        </FormRow>
      </>
    );
  };

  return (
    <FormContentTab>
      {addresses.map((address, i) => (
        <AddressStyled key={i}>{renderAddress(address, i)}</AddressStyled>
      ))}
      <FormRow style={{ justifyContent: "center" }}>
        <ButtonConfirm onClick={handleAddAddress} text="Aggiungi indirizzo" />
      </FormRow>
    </FormContentTab>
  );
};

export default SubjectDetailsAddresses;
