import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import DamagedPartVehicle, { plateFormats } from "./DamagedPartVehicle";
import { HrStyled } from "./ClaimData";
import CarImpactSelector from "./CarImpactSelect";
import { useTranslation } from "react-i18next";

import {
  PartType,
  PartChangeType,
  PartDamagedDetailsVehicle,
  PartDamagedDetailsPerson,
  DamagedType,
  OwnerRolesType,
  NotOwnerRolesType,
  DamageTypeCard,
} from "./DamagedParts";

const PersonDamageList = styled(Col)`
  width: 25em;
`;

const PersonDamageListTitle = styled.div`
  text-transform: uppercase;
  margin-top: 5em;
  font-size: 0.9em;
`;

const PersonDamageListSubtitle = styled.div`
  text-transform: uppercase;
  margin-left: 1em;
  margin-top: 0.5em;
  font-size: 0.9em;
`;

const PersonDamageListItem = styled.div`
  margin-left: 2em;
`;

const ButtonDeleteOtherDamage = styled(Button)`
  font-size: 1.2em;
  margin-bottom: 24px;
  margin-left: 1em;
`;

interface DamagedPartModalContentProps {
  part: PartType;
  isOwner: boolean;
}

const DamagedPartModalContent = (props: DamagedPartModalContentProps) => {
  const { t } = useTranslation();
  const [part, setPart] = useState<PartType>(props.part);

  useEffect(() => {
    setPart(props.part);
  }, [props.part]);

  const handleModalPartChange = (type: PartChangeType, val: any) => {
    const updatedPart = Object.assign({}, part);

    if (type === "damage_type") {
      const danno = updatedPart.danni[val.index];
      danno.tipo_danno = val.value;

      if (val.value === "Person")
        if ((danno.details as PartDamagedDetailsPerson) === null) {
          danno.details = {
            personWoundedPoints: [],
          };
        }

      if (val.value === "Vehicle")
        if ((danno.details as PartDamagedDetailsVehicle) === null) {
          danno.details = {
            collisionPoints: [],
          };
        }
    }

    if (type === "collision_point") {
      (updatedPart.danni[val.index].details as PartDamagedDetailsVehicle).collisionPoints = val.value.sort(
        (a: string, b: string) => (a > b ? 1 : -1)
      );
    }

    if (type === "person_damage") {
      (updatedPart.danni[val.index].details as PartDamagedDetailsPerson).personWoundedPoints = val.value;
    }

    if (type === "role_type") {
      updatedPart.danni![val.index].tipo_ruolo = val.value;
    }

    setPart(updatedPart);
  };

  const handleAddDamageType = () => {
    const updatedPart = Object.assign({}, part);
    updatedPart.danni = [
      ...(part.danni || []),
      {
        tipo_ruolo: "",
        tipo_danno: "",
        note: "",
        details: {},
      } as DamagedType,
    ];

    setPart(updatedPart);
  };

  const handleDeleteDamageType = (index: number) => {
    const updatedPart = Object.assign({}, part);
    updatedPart.danni = part.danni!.filter((d, i) => i !== index) || [];
    setPart(updatedPart);
  };

  const renderDamageOwner = () => {
    const vehicleAdded = part.danni.find((d) => d.tipo_danno === "Vehicle");
    const personAdded = part.danni.find((d) => d.tipo_danno === "Person");

    let availableDamageTypes = [...DamageTypeCard];

    if (vehicleAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Vehicle");
    if (personAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Person");

    const tipoGestione = "CG - Gestionale";

    return (
      <>
        <FormSubTitle>PARTITA DI DANNO PROPRIETARIO</FormSubTitle>
        <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select defaultValue="---" options={OwnerRolesType} />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Gestione" name="tipo_gestione_veicolo_proprietario" tooltip="Tipo Gestione">
            {tipoGestione}
          </FormInput>
        </Row>
        <Row>
          <FormInput label="Tipo Danno" name="danno_veicolo_proprietario" tooltip="Seleziona il tipo danno">
            {"Veicolo"}
          </FormInput>
          <RowSpacer />
        </Row>
        <Row>
          <Col>
            <DamagedPartVehicle readOnly={true} details={part.danni![0].details! as PartDamagedDetailsVehicle} />
          </Col>
          <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
            <CarImpactSelector
              onChange={(areas) => handleModalPartChange("collision_point", { value: areas, index: 0 })}
            />
          </Col>
        </Row>
        <Row>
          <FormInput label="Note" name="note" tooltip="Note">
            <Input />
          </FormInput>
        </Row>
        {part.danni.map((damage, i) => {
          if (i === 0) {
            return <></>;
          } else if (damage.tipo_danno === "Person") {
            const details = part.danni[i].details as PartDamagedDetailsPerson;
            console.log("details ", details);

            const frontWounds = details.personWoundedPoints?.filter((l) => l.indexOf("front") !== -1) || [];
            const rearWounds = details.personWoundedPoints?.filter((l) => l.indexOf("rear") !== -1) || [];

            return (
              <>
                <FormSubTitle>Danni alla Persona</FormSubTitle>
                <ButtonDeleteOtherDamage
                  type="primary"
                  shape="circle"
                  onClick={() => handleDeleteDamageType(i)}
                  style={{ float: "right" }}
                >
                  <RiDeleteBinFill />
                </ButtonDeleteOtherDamage>
                <Row style={{ height: "450px" }}>
                  <PersonDamageList>
                    <PersonDamageListTitle>Parti del Corpo Lesionate </PersonDamageListTitle>

                    <PersonDamageListSubtitle>Davanti </PersonDamageListSubtitle>
                    {frontWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}

                    <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                    {rearWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}
                  </PersonDamageList>

                  <DamagedPartPersonSelect
                    onChange={(localizations: string[]) =>
                      handleModalPartChange("person_damage", { value: localizations, index: i })
                    }
                  />
                </Row>
                <FormInput label="Note Danno" name={`note_danno_${i}`} tooltip="Note relative al danno">
                  <Input />
                </FormInput>
              </>
            );
          } else if (damage.tipo_danno === "Thing") {
            return (
              <>
                <FormSubTitle>Danni a Cose</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage_type", { value: val, index: i })}
                      options={availableDamageTypes}
                    />
                  </FormInput>
                  <RowSpacer />
                  <FormInput label="Note Danno" name={`note_danno_${i}`} tooltip="Note relative al danno">
                    <Input />
                  </FormInput>
                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </Row>
              </>
            );
          } else {
            return (
              <>
                <FormSubTitle>Seleziona il tipo di danno</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage_type", { value: val, index: i })}
                      options={availableDamageTypes}
                    />
                  </FormInput>
                  <RowSpacer />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </Row>
              </>
            );
          }
        })}

        <Button type="primary" size="small" onClick={handleAddDamageType}>
          add danno
        </Button>
      </>
    );
  };

  const renderDamageOther = () => {
    const vehicleAdded = part.danni.find((d) => d.tipo_danno === "Vehicle");
    const personAdded = part.danni.find((d) => d.tipo_danno === "Person");

    let availableDamageTypes = [...DamageTypeCard];

    if (vehicleAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Vehicle");
    if (personAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Person");

    const tipoGestione = "CG - Gestionale";

    return (
      <>
        <FormSubTitle>ALTRA PARTITA DI DANNO</FormSubTitle>
        <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select defaultValue="---" options={NotOwnerRolesType} />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Gestione" name="tipo_gestione" tooltip="Tipo Gestione">
            {tipoGestione}
          </FormInput>
        </Row>
        <HrStyled />
        {part.danni.map((damage, i) => {
          if (damage.tipo_danno === "Vehicle") {
            return (
              <Row>
                <Col>
                  <DamagedPartVehicle readOnly={true} details={damage.details! as PartDamagedDetailsVehicle} />
                </Col>
                <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
                  <CarImpactSelector
                    onChange={(areas) => handleModalPartChange("collision_point", { value: areas, index: i })}
                  />
                </Col>
              </Row>
            );
          } else if (damage.tipo_danno === "Person") {
            const details = part.danni[i].details as PartDamagedDetailsPerson;
            console.log("details ", details);

            const frontWounds = details.personWoundedPoints?.filter((l) => l.indexOf("front") !== -1) || [];
            const rearWounds = details.personWoundedPoints?.filter((l) => l.indexOf("rear") !== -1) || [];

            return (
              <>
                <FormSubTitle>Danni alla Persona</FormSubTitle>
                <Row style={{ height: "450px" }}>
                  <PersonDamageList>
                    <PersonDamageListTitle>Parti del Corpo Lesionate </PersonDamageListTitle>

                    <PersonDamageListSubtitle>Davanti </PersonDamageListSubtitle>
                    {frontWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}

                    <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                    {rearWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}
                  </PersonDamageList>

                  <DamagedPartPersonSelect
                    onChange={(localizations: string[]) =>
                      handleModalPartChange("person_damage", { value: localizations, index: i })
                    }
                  />
                </Row>
              </>
            );
          } else if (damage.tipo_danno === "Thing") {
            return (
              <>
                <FormSubTitle>Danni a Cose</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage_type", { value: val, index: i })}
                      options={availableDamageTypes}
                    />
                  </FormInput>
                  <RowSpacer />
                  <FormInput label="Note Danno" name={`note_danno_${i}`} tooltip="Note relative al danno">
                    <Input />
                  </FormInput>
                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </Row>
              </>
            );
          } else {
            return (
              <>
                <FormSubTitle>Seleziona il tipo di danno</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage_type", { value: val, index: i })}
                      options={availableDamageTypes}
                    />
                  </FormInput>
                  <RowSpacer />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </Row>
              </>
            );
          }
        })}

        <Button type="primary" size="small" onClick={handleAddDamageType}>
          add danno
        </Button>
      </>
    );
  };

  return props.isOwner ? renderDamageOwner() : renderDamageOther();
};

export default DamagedPartModalContent;
