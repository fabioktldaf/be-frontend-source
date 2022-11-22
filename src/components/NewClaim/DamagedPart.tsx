import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import DamagedPartVehicle, { plateFormats } from "./DamagedPartVehicle";
import SearchSubject from "../SearchSubject";
import { HrStyled } from "./ClaimData";
import { VehicleTypeOptions } from "../../config/const";
import CarImpactSelector from "./CarImpactSelect";
import { useTranslation } from "react-i18next";

import { CgSmileSad } from "react-icons/cg";

const DamagedPartStyled = styled.div`
  margin-bottom: 2em;
`;

const SubjectOpenModal = styled.div``;

const PartStyled = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const PartResumeStyled = styled.div`
  cursor: pointer;
`;

const PartSpacer = styled.div`
  flex: 1;
`;

const PartDeleteButton = styled(Button)``;

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

const OtherDamageItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1em 0;
  margin: 1em 0;
`;

const ButtonDeleteOtherDamage = styled(Button)`
  font-size: 1.2em;
  margin-bottom: 24px;
  margin-left: 1em;
`;

const DamageTypeCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
];

const DamageTypeNoCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
  { value: "Location", label: "Ubicazione" },
  { value: "Generic", label: "Generico" },
];

type PartChangeType =
  | "owner_damage_type"
  | "owner_collision_point"
  | "owner_person_damage"
  | "other_damage_type"
  | "other_role_type";

type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

type SubjectPersonalDataType = {
  isOpen: boolean;
  personalData: {
    id: number;
  };
};

export type PartDamagedDetailsPerson = {
  localization: string[];
  note: string;
  personalData?: SubjectPersonalDataType;
};

export type PartDamagedDetailsVehicle = {
  plate: string;
  format: string;
  type: string;
  collisionPoints: string[];
};

export type PartDamagedDetailsThing = {
  note: string;
};

type DamagedType = {
  tipo_ruolo: string;
  tipo_danno: PartChangeTypeType;
  dettagli_danni_persona?: PartDamagedDetailsPerson;
  dettagli_danni_veicolo?: PartDamagedDetailsVehicle;
  dettagli_danni_cose?: PartDamagedDetailsThing;
};

type PartType = {
  subject: any;
  numero_pd: string;
  danni: DamagedType[];
  danni_proprietario: DamagedType;
  data_pd: string;
};

type PartModalType = {
  isOpen: boolean;
  part?: PartType;
  index: number;
};

const getNewDamagedPartNumber = () => Date.now().toString();

const OwnerRolesType = [
  { value: "---", label: "---" },
  { value: "CP", label: "CP - Conducente proprietario" },
  { value: "TP", label: "TP - Trasportato proprietario" },
  {
    value: "NP",
    label: "NP - Proprietario non presente sul veicolo",
  },
];

const AllRolesType = [
  { value: "---", label: "---" },
  { value: "CP", label: "CP - Conducente proprietario" },
  { value: "TP", label: "TP - Trasportato proprietario" },
  {
    value: "NP",
    label: "NP - Proprietario non presente sul veicolo",
  },
  { value: "CN", label: "CN - Conducente non proprietario" },
  { value: "TN", label: "TN - Trasportato non proprietario" },

  {
    value: "CPC",
    label: "CPC - Conducente proprietario controparte",
  },
  {
    value: "CNC",
    label: "CNC - Conducente non proprietario controparte",
  },
  {
    value: "TPC",
    label: "TPC - Trasportato proprietario controparte",
  },
  {
    value: "TNC",
    label: "TNC - Trasportato non proprietario controparte",
  },
  {
    value: "NPC",
    label: "NPC - Proprietario non presente sul veicolo",
  },
  {
    value: "TS",
    label: "TS - Terzo passante",
  },
];

const DamagedPart = () => {
  const { t } = useTranslation();
  const [parts, setParts] = useState<PartType[]>([
    {
      subject: {},
      numero_pd: getNewDamagedPartNumber(),
      data_pd: "",
      danni_proprietario: {
        tipo_ruolo: "",
        tipo_danno: "Vehicle",
        dettagli_danni_persona: {
          localization: [],
          note: "",
        },
        dettagli_danni_veicolo: {
          plate: "AB123DC",
          format: "Targa Italiana",
          type: "Autovettura",
          collisionPoints: [],
        },
      },
      danni: [],
    },
  ]);

  const [partModal, setPartModal] = useState<PartModalType>({
    isOpen: false,
    part: undefined,
    index: -1,
  });
  const [partModalPerson, setPartModalPerson] = useState<SubjectPersonalDataType>({
    isOpen: false,
    personalData: { id: 0 },
  });

  const handlePartModalOk = () => {
    const updatedParts = parts.map(
      (p: PartType, i: number) => (i === partModal.index ? partModal.part : p) as PartType
    );
    setParts(updatedParts);
  };

  const handleAddDamagedPart = () => {
    setParts((prev) => [
      ...prev,
      {
        subject: {},
        numero_pd: getNewDamagedPartNumber(),
        data_pd: "",
        danni_proprietario: {
          tipo_ruolo: "",
          tipo_danno: "",
          dettagli_danni_persona: {
            localization: [],
            note: "",
          },
          dettagli_danni_veicolo: {
            plate: "",
            format: "",
            type: "",
            collisionPoints: [],
          },
        },
        danni: [],
      },
    ]);
  };

  const handleRemoveDamagedPart = (index: number) => {
    setParts((prev) => prev.filter((p, i) => i !== index));
  };

  const showPartModal = (index: number) => {
    setPartModal({
      isOpen: true,
      part: parts[index],
      index,
    });
  };

  const cancelPartModal = () => {
    setPartModal((prev) => ({
      isOpen: false,
      part: prev.part,
      index: prev.index,
    }));
  };

  const handleModalPartChange = (type: PartChangeType, val: any) => {
    const updatedPart: PartType = Object.assign({}, partModal.part);

    if (type === "owner_damage_type") {
      updatedPart.danni_proprietario.tipo_danno = val;
    }

    if (type === "owner_collision_point") {
      updatedPart!.danni_proprietario!.dettagli_danni_veicolo!.collisionPoints = val.sort((a: string, b: string) =>
        a > b ? 1 : -1
      );
    }

    if (type === "owner_person_damage") {
      updatedPart!.danni_proprietario!.dettagli_danni_persona!.localization = val;
    }

    if (type === "other_damage_type") {
      updatedPart.danni[val.index].tipo_danno = val.value;
    }

    if (type === "other_role_type") {
      updatedPart.danni[val.index].tipo_ruolo = val.value;
    }

    console.log("updatedPart ", updatedPart);

    setPartModal({
      isOpen: partModal.isOpen,
      index: partModal.index,
      part: updatedPart,
    } as PartModalType);
  };

  const handleModalPartPersonCancel = () => {
    setPartModalPerson((prev) => ({
      isOpen: false,
      personalData: { id: 0 },
    }));
  };

  const handleModalPartPersonOk = () => {
    setPartModalPerson((prev) => ({
      isOpen: false,
      personalData: { id: 0 },
    }));
  };

  const handleAddDamageType = () => {
    const updatedPart = Object.assign({}, partModal.part);
    updatedPart.danni = [
      ...(partModal.part?.danni || []),
      {
        tipo_ruolo: "",
        tipo_danno: "",
        dettagli_danni_persona: undefined,
        dettagli_danni_veicolo: undefined,
        dettagli_danni_cose: undefined,
      } as DamagedType,
    ];

    setPartModal({ isOpen: partModal.isOpen, index: partModal.index, part: updatedPart });
  };

  const handleDeleteDamageType = (index: number) => {
    const updatedPart = Object.assign({}, partModal.part);
    updatedPart.danni = partModal.part?.danni.filter((d, i) => i !== index) || [];

    setPartModal({ isOpen: partModal.isOpen, index: partModal.index, part: updatedPart });
  };

  const isPersonDamageType = () => {
    return (
      partModal.part?.danni_proprietario?.tipo_danno === "Person" ||
      partModal.part?.danni.find((d) => d.tipo_danno === "Person")
    );
  };

  const renderDamagedPartResume = (p: PartType) => {
    const num = p.numero_pd;
    let role = "[ruolo]";
    let type = "[tipo]";
    let nameOrPlate = "[nome/targa]";

    if (p.danni_proprietario?.dettagli_danni_veicolo) {
      role = "Proprietario ...";
      type = "Veicolo";
      nameOrPlate = p.danni_proprietario.dettagli_danni_veicolo.plate;
    }

    return `N° ${num} - ${role} - ${type} - ${nameOrPlate}`;
  };

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        {parts.map((p: PartType, i: number) => (
          <PartStyled>
            <PartResumeStyled onClick={() => showPartModal(i)}>{renderDamagedPartResume(p)}</PartResumeStyled>
            <PartSpacer />
            {i > 0 && (
              <PartDeleteButton
                onClick={() => handleRemoveDamagedPart(i)}
                icon={<RiDeleteBinFill />}
                shape="circle"
                type="primary"
              />
            )}
          </PartStyled>
        ))}

        <CenteredRow>
          <Button type="primary" size="small" onClick={handleAddDamagedPart}>
            +
          </Button>
        </CenteredRow>
      </DamagedPartStyled>
      <Modal
        title={`Configura Partita Danno n° ${partModal.part?.numero_pd}`}
        open={partModal.isOpen}
        onCancel={cancelPartModal}
        onOk={handlePartModalOk}
        width={900}
      >
        <FormSubTitle>TIPO DANNI PROPRIETARIO</FormSubTitle>
        <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select defaultValue="---" options={OwnerRolesType} />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Danno" name="tipo_danno" tooltip="Seleziona il tipo danno">
            <Select
              defaultValue={partModal.index === 0 ? "Vehicle" : "---"}
              onChange={(val) => handleModalPartChange("owner_damage_type", val)}
              options={DamageTypeCard}
            />
          </FormInput>
        </Row>

        {partModal.part?.danni_proprietario?.tipo_danno === "Vehicle" && (
          <>
            <FormSubTitle>Danni al veicolo</FormSubTitle>

            <Row>
              <Col>
                <DamagedPartVehicle
                  readOnly={true}
                  details={
                    partModal.part?.danni_proprietario?.dettagli_danni_veicolo || ({} as PartDamagedDetailsVehicle)
                  }
                />
              </Col>
              <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
                <CarImpactSelector onChange={(areas) => handleModalPartChange("owner_collision_point", areas)} />
              </Col>
            </Row>
          </>
        )}

        {isPersonDamageType() && (
          <>
            <FormSubTitle>Danni alla Persona</FormSubTitle>
            <Row style={{ height: "450px" }}>
              <PersonDamageList>
                <PersonDamageListTitle>Parti del Corpo Lesionate </PersonDamageListTitle>
                <PersonDamageListSubtitle>Davanti </PersonDamageListSubtitle>
                {partModal.part?.danni_proprietario?.dettagli_danni_persona?.localization
                  ?.filter((l) => l.indexOf("front") !== -1)
                  .map((l) => (
                    <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                  ))}

                <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                {partModal.part?.danni_proprietario?.dettagli_danni_persona?.localization
                  ?.filter((l) => l.indexOf("rear") !== -1)
                  .map((l) => (
                    <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                  ))}
              </PersonDamageList>

              <DamagedPartPersonSelect
                onChange={(localizations: string[]) => handleModalPartChange("owner_person_damage", localizations)}
              />
            </Row>
          </>
        )}

        <Row>
          <FormInput label="Note" name="note" tooltip="Note">
            <Input />
          </FormInput>
        </Row>

        <FormSubTitle>ALTRI DANNI</FormSubTitle>
        <Col>
          {partModal.part?.danni?.map((d, i) => (
            <OtherDamageItem>
              <Row>
                <FormInput label="Tipo Ruolo" name={`tipo_ruolo_${i}`} tooltip="Seleziona il tipo ruolo">
                  <Select
                    defaultValue="---"
                    options={AllRolesType}
                    onChange={(val) => handleModalPartChange("other_role_type", { value: val, index: i })}
                  />
                </FormInput>
                <RowSpacer />
                <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                  <Select
                    defaultValue={partModal.index === 0 ? "Vehicle" : "---"}
                    onChange={(val) => handleModalPartChange("other_damage_type", { value: val, index: i })}
                    options={DamageTypeCard}
                  />
                </FormInput>
                <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                  <RiDeleteBinFill />
                </ButtonDeleteOtherDamage>
              </Row>
              <HrStyled />
            </OtherDamageItem>
          ))}
        </Col>
        <Button type="primary" size="small" onClick={handleAddDamageType}>
          +
        </Button>
      </Modal>
      <Modal
        title={"Seleziona il soggetto della partita di danno"}
        open={partModalPerson.isOpen}
        onCancel={handleModalPartPersonCancel}
        onOk={handleModalPartPersonOk}
      >
        <SearchSubject />
      </Modal>
    </>
  );
};

export default DamagedPart;
