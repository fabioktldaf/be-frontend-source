import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal, Popconfirm } from "antd";
import { CenteredRow, Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import DamagedPartVehicle, { plateFormats } from "./DamagedPartVehicle";
import { HrStyled } from "./ClaimData";
import CarImpactSelector from "./CarImpactSelect";
import { useTranslation } from "react-i18next";

import {
  DamagedPartType,
  PartChangeType,
  PartDamagedDetailsVehicle,
  PartDamagedDetailsPerson,
  DamagedType,
  DamageTypeCard,
} from "../../types/new-claim.types";
import useApplication from "../../hooks/useApplication";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  part: DamagedPartType;
  partIndex: number;
  onCancel: () => void;
  onOk: () => void;
}

const DamagedPartModalContent = (props: DamagedPartModalContentProps) => {
  const app = useApplication();
  const { t } = useTranslation();

  const [part, setPart] = useState<DamagedPartType>(props.part);

  console.log("Modal Contente Part ", props.part);
  console.log("Modal Contente Part ", part);

  useEffect(() => {
    setPart(Object.assign({}, props.part));
  }, [props.part]);

  if (props.part.pdNumber !== part.pdNumber) return <></>; // part & props.part non sono sempre sincronizzate

  const isOwner = () => props.partIndex === 0;

  const handleOnOk = () => {
    app.updateDamagedPart(Object.assign({}, part), props.partIndex);
    props.onOk();
  };

  const handleModalPartChange = (type: PartChangeType, val: any) => {
    const updatedPart = JSON.parse(JSON.stringify(part)) as DamagedPartType;

    if (type === "damage-type") {
      const danno = updatedPart.damages[val.index];
      danno.damageType = val.value;
    }

    if (type === "collision-point") {
      (updatedPart.damages[val.index].details as PartDamagedDetailsVehicle).collisionPoints = val.value.sort(
        (a: string, b: string) => (a > b ? 1 : -1)
      );
    }

    if (type === "person-damage") {
      (updatedPart.damages[val.index].details as PartDamagedDetailsPerson).personWoundedPoints = val.value;
    }

    if (type === "role-type") {
      updatedPart.roleType = val;
    }

    if (type === "owner-vehicle-note") {
      updatedPart.damages[0].details.note = val;
    }

    setPart(updatedPart);
  };

  const handleAddDamageType = () => {
    const updatedPart = Object.assign({}, part);
    updatedPart.damages = [
      ...(part.damages || []),
      {
        damageType: "",
        details: {},
      } as DamagedType,
    ];

    setPart(updatedPart);
  };

  const handleDeleteDamageType = (index: number) => {
    const updatedPart = Object.assign({}, part);
    updatedPart.damages = part.damages!.filter((d, i) => i !== index) || [];
    setPart(updatedPart);
  };

  const renderDamageOwner = () => {
    const vehicleAdded = part.damages.find((d) => d.damageType === "Vehicle");
    const personAdded = part.damages.find((d) => d.damageType === "Person");

    const availableDamageTypes = app.getAvailableDamageTypes(0, part.roleType);

    return (
      <>
        <FormSubTitle>PARTITA DI DANNO PROPRIETARIO</FormSubTitle>
        <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select
              defaultValue="---"
              options={app.getRoleTypes(props.partIndex)}
              onChange={(val) => handleModalPartChange("role-type", val)}
            />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Gestione" name="tipo_gestione_veicolo_proprietario" tooltip="Tipo Gestione">
            {part.managementType}
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
            <DamagedPartVehicle readOnly={true} details={part.damages![0].details! as PartDamagedDetailsVehicle} />
          </Col>
          <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
            <CarImpactSelector
              onChange={(areas) => handleModalPartChange("collision-point", { value: areas, index: 0 })}
            />
          </Col>
        </Row>
        <Row>
          <FormInput label="Note" name="note" tooltip="Note">
            <Input onChange={(e) => handleModalPartChange("owner-vehicle-note", e.currentTarget.value)} />
          </FormInput>
        </Row>
        {part.damages.map((damage, i) => {
          if (i === 0) {
            return <></>;
          } else if (damage.damageType === "Person") {
            const details = part.damages[i].details as PartDamagedDetailsPerson;
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
                    {frontWounds.map((l, i) => (
                      <PersonDamageListItem key={i}>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}

                    <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                    {rearWounds.map((l, i) => (
                      <PersonDamageListItem key={i}>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}
                  </PersonDamageList>

                  <DamagedPartPersonSelect
                    onChange={(localizations: string[]) =>
                      handleModalPartChange("person-damage", { value: localizations, index: i })
                    }
                  />
                </Row>
                <FormInput label="Note Danno" name={`note_danno_${i}`} tooltip="Note relative al danno">
                  <Input />
                </FormInput>
              </>
            );
          } else if (damage.damageType === "Thing") {
            return (
              <>
                <FormSubTitle>Danni a Cose</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
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
                      onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
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
        <HrStyled />
        <Row>
          <Popconfirm
            title="Confermi di voler cancellare i dati inseriti?"
            onConfirm={props.onCancel}
            okText="Si"
            cancelText="No"
          >
            <Button>Cancella</Button>
          </Popconfirm>
          <Button type="primary" onClick={handleOnOk}>
            Salva
          </Button>
        </Row>
      </>
    );
  };

  const renderDamageOther = () => {
    const vehicleAdded = part.damages.find((d) => d.damageType === "Vehicle");
    const personAdded = part.damages.find((d) => d.damageType === "Person");

    let availableDamageTypes = [...DamageTypeCard];

    if (vehicleAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Vehicle");
    if (personAdded) availableDamageTypes = availableDamageTypes.filter((d) => d.value !== "Person");

    const tipoGestione = "CG - Gestionale";

    return (
      <>
        <FormSubTitle>ALTRA PARTITA DI DANNO</FormSubTitle>
        <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select defaultValue="---" options={app.getRoleTypes(props.partIndex)} />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Gestione" name="tipo_gestione" tooltip="Tipo Gestione">
            {tipoGestione}
          </FormInput>
        </Row>
        <HrStyled />
        {part.damages.map((damage, i) => {
          if (damage.damageType === "Vehicle") {
            return (
              <Row key={i}>
                <Col>
                  <DamagedPartVehicle readOnly={true} details={damage.details! as PartDamagedDetailsVehicle} />
                </Col>
                <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
                  <CarImpactSelector
                    onChange={(areas) => handleModalPartChange("collision-point", { value: areas, index: i })}
                  />
                </Col>
              </Row>
            );
          } else if (damage.damageType === "Person") {
            const details = part.damages[i].details as PartDamagedDetailsPerson;
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
                      handleModalPartChange("person-damage", { value: localizations, index: i })
                    }
                  />
                </Row>
              </>
            );
          } else if (damage.damageType === "Thing") {
            return (
              <>
                <FormSubTitle>Danni a Cose</FormSubTitle>
                <Row>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
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
                      onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
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
        <HrStyled />
        <Row>
          <Popconfirm
            title="Confermi di voler cancellare i dati inseriti?"
            onConfirm={props.onCancel}
            okText="Si"
            cancelText="No"
          >
            <Button>Cancella</Button>
          </Popconfirm>
          <Button type="primary" onClick={handleOnOk}>
            Salva
          </Button>
        </Row>
      </>
    );
  };

  return isOwner() ? renderDamageOwner() : renderDamageOther();
};

export default DamagedPartModalContent;
