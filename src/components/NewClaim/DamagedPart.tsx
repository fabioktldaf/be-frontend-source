import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Col, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import DamagedPartVehicle, { plateFormats } from "./DamagedPartVehicle";
import SearchSubject from "../SearchSubject";
import { HrStyled } from "./ClaimData";
import { VehicleTypeOptions } from "../../config/const";
import CarImpactSelector from "./CarImpactSelect";

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

type PartChangeType = "owner_damage_type" | "owner_collision_point";

type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

type SubjectPersonalDataType = {
  isOpen: boolean;
  personalData: {
    id: number;
  };
};

export type PartDamagedDetailsPerson = {
  localization: string;
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
  dettagli_danni_persona?: PartDamagedDetailsPerson[];
  dettagli_danni_veicolo?: PartDamagedDetailsVehicle;
  dettagli_danni_cose?: PartDamagedDetailsThing;
};

type PartType = {
  subject: any;
  numero_pd: string;
  danni: DamagedType[];
  danni_proprietario?: DamagedType;
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

const NotOwnerRolesType = [
  { value: "---", label: "---" },
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
  const [parts, setParts] = useState<PartType[]>([
    {
      subject: {},
      numero_pd: getNewDamagedPartNumber(),
      data_pd: "",
      danni_proprietario: {
        tipo_ruolo: "",
        tipo_danno: "Vehicle",
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
        danni_proprietario: undefined,
        danni: [],
      },
    ]);
  };

  const handleRemoveDamagedPart = (index: number) => {
    setParts((prev) => prev.filter((p, i) => i !== index));
  };

  const handleAddDamagePersonDetails = () => {
    // setPartModal((prev) => ({
    //   isOpen: prev.isOpen,
    //   part: Object.assign({}, prev.part, {
    //     dettagli_danni_persona: [
    //       ...(prev.part?.dettagli_danni_persona || []),
    //       {
    //         location: "",
    //         nature: "",
    //         note: "",
    //       },
    //     ],
    //   }),
    //   index: prev.index,
    // }));
  };

  // const handleRemoveDamageDetails = (index: number) => {
  //   const newDettagliDanno = partModal.part?.dettagli_danni_persona.filter((d, i) => i !== index);

  //   console.log("removing part details ", index);

  //   console.log("newDettagliDanno ", newDettagliDanno);

  //   setPartModal((prev) => ({
  //     isOpen: prev.isOpen,
  //     part: Object.assign({}, prev.part, {
  //       dettagli_danno: prev.part?.dettagli_danni_persona.filter((d, i) => i !== index),
  //     }),
  //     index: prev.index,
  //   }));
  // };

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
    if (type === "owner_damage_type") {
      setPartModal(
        (prev) =>
          ({
            isOpen: prev.isOpen,
            index: prev.index,
            part: Object.assign({}, prev.part, { danni_proprietario: { tipo_danno: val } }),
          } as PartModalType)
      );
    }

    if (type === "owner_collision_point") {
      const part = Object.assign({}, partModal.part);

      if (part.danni_proprietario?.dettagli_danni_veicolo?.collisionPoints)
        part.danni_proprietario.dettagli_danni_veicolo.collisionPoints = val.sort((a: string, b: string) =>
          a > b ? 1 : -1
        );

      setPartModal({
        isOpen: partModal.isOpen,
        index: partModal.index,
        part,
      } as PartModalType);
    }
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
    setPartModal(
      (prev) =>
        ({
          isOpen: prev.isOpen,
          index: prev.index,
          part: Object.assign({}, prev.part, {
            danni: [...(prev.part?.danni || []), {} as DamagedType],
          }),
        } as PartModalType)
    );
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
            <Row>
              <Col>
                <DamagedPartPersonSelect onChange={(localizatoins: string[]) => {}} />
              </Col>
            </Row>
          </>
        )}

        <Row>
          <FormInput label="Note" name="note" tooltip="Note">
            <Input />
          </FormInput>
        </Row>

        <FormSubTitle>ALTRI DANNI</FormSubTitle>
        {partModal.part?.danni?.map((d, i) => (
          <div></div>
        ))}

        <Button type="primary" size="small" onClick={handleAddDamageType}>
          +
        </Button>

        {/* <Row>
          <FormInput label="Tipo Ruolo" name="tipo_ruolo" tooltip="Seleziona il tipo ruolo">
            <Select
              defaultValue="---"
              options={[
                { value: "---", label: "---" },
                { value: "CP - Conducente proprietario", label: "CP - Conducente proprietario" },
                { value: "CN - Conducente non proprietario", label: "CN - Conducente non proprietario" },
                { value: "TP - Trasportato proprietario", label: "TP - Trasportato proprietario" },
                { value: "TN - Trasportato non proprietario", label: "TN - Trasportato non proprietario" },
                {
                  value: "NP - Proprietario non presente sul veicolo",
                  label: "NP - Proprietario non presente sul veicolo",
                },
                {
                  value: "CPC - Conducente proprietario controparte",
                  label: "CPC - Conducente proprietario controparte",
                },
                {
                  value: "CNC - Conducente non proprietario controparte",
                  label: "CNC - Conducente non proprietario controparte",
                },
                {
                  value: "TPC - Trasportato proprietario controparte",
                  label: "TPC - Trasportato proprietario controparte",
                },
                {
                  value: "TNC - Trasportato non proprietario controparte",
                  label: "TNC - Trasportato non proprietario controparte",
                },
                {
                  value: "NPC - Proprietario non presente sul veicolo",
                  label: "NPC - Proprietario non presente sul veicolo",
                },
                {
                  value: "TS - Terzo passante",
                  label: "TS - Terzo passante",
                },
              ]}
            />
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Danno" name="tipo_danno" tooltip="Seleziona il tipo danno">
            <Select
              defaultValue="---"
              onChange={(val) => handleModalPartChange("damage_type", val)}
              options={[
                { value: "---", label: "---" },
                { value: "Persone", label: "Persone" },
                { value: "Cose", label: "Cose" },
                { value: "Veicolo", label: "Veicolo" },
                { value: "Ubicazione", label: "Ubicazione" },
                { value: "Generico", label: "Generico" },
              ]}
            />
          </FormInput>
        </Row>
        <Row>
          <FormInput label="Stato Tipo Danno" name="stato_tipo_danno" tooltip="Seleziona lo stato tipo danno">
            <Select
              defaultValue={"Aperto"}
              options={[
                { value: "Aperto", label: "Aperto" },
                { value: "Chiuso", label: "Chiuso" },
                { value: "Chiuso senza seguito", label: "Chiuso senza seguito" },
              ]}
            />
          </FormInput>
          <RowSpacer />
          <FormInput
            label="Definizione Pagamento"
            name="definizione_pagamento"
            tooltip="Seleziona la definizione del pagamento"
          >
            <Select
              defaultValue={"Non pagato"}
              options={[
                { value: "Non pagato", label: "Non pagato" },
                { value: "Pagamento parziale", label: "Pagamento parziale" },
                { value: "Pagamento totale", label: "Pagamento totale" },
              ]}
            />
          </FormInput>
        </Row>
        <Row>
          <FormInput label="Note Danno" name="note_danno" tooltip="Note relative al danno">
            <Input placeholder="note relative al danno" />
          </FormInput>
          <RowSpacer />
          <FormInput></FormInput>
        </Row> */}

        {/* {partModal.part?.tipo_danno === "Persone" && (
          <>
            <FormSubTitle>Dettaglio danni alla persona</FormSubTitle>
            <Row>
              <Button
                type="primary"
                size="small"
                onClick={() => setPartModalPerson({ isOpen: true, personalData: { id: 0 } })}
              >
                Seleziona soggetto
              </Button>{" "}
            </Row>
            <Row>
              <Col>
                {partModal.part?.danni.dettagli_danni_persona.map((d, i) => (
                  <Col>
                    <Row>
                      <DamagedPartPerson index={i} details={partModal.part?.danni.dettagli_danni_persona[i]!} />
                      <RiDeleteBinFill onClick={() => handleRemoveDamageDetails(i)} />
                    </Row>
                    <HrStyled />
                  </Col>
                ))}

                {partModal.part?.danni.dettagli_danni_persona.length! < 3 && (
                  <Button type="primary" size="small" onClick={handleAddDamagePersonDetails}>
                    +
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )} */}

        {/* {partModal.part?.tipo_danno === "Veicolo" && (
          <>
            <FormSubTitle>Dettaglio danni al veicolo</FormSubTitle>

            <Row>
              <DamagedPartVehicle details={partModal.part?.danni.dettagli_danni_veicolo!} />
            </Row>
          </>
        )} */}
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
