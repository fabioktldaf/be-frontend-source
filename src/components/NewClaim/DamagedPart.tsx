import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Col, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPerson from "./DamagedPartPerson";
import DamagedPartVehicle from "./DamagedPartVehicle";
import SearchSubject from "../SearchSubject";
import { HrStyled } from "./ClaimData";

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

type PartChangeType = "damage_type" | "";

type TipoDannoType = "" | "Persone" | "Cose" | "Veicolo" | "Ubicazione" | "Generico";

type SubjectPersonalDataType = {
  isOpen: boolean;
  personalData: {
    id: number;
  };
};

export type PartDamagedDetailsPerson = {
  nature: string;
  location: string;
  note: string;
  personalData?: SubjectPersonalDataType;
};

export type PartDamagedDetailsVehicle = {
  plate: string;
  format: string;
  type: string;
};

type PartType = {
  subject: any;
  numero_pd: string;
  data_pd: string;
  stato_pd: string;
  tipo_ruolo: string;
  tipo_danno: TipoDannoType;
  dettagli_danni_persona: PartDamagedDetailsPerson[];
  dettagli_danni_veicolo: PartDamagedDetailsVehicle;
};

type PartModalType = {
  isOpen: boolean;
  part?: PartType;
  index: number;
};

const getNewDamagedPartNumber = () => Date.now().toString();

const DamagedPart = () => {
  const [parts, setParts] = useState<PartType[]>([]);
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
        stato_pd: "",
        tipo_ruolo: "",
        tipo_danno: "",
        dettagli_danni_persona: [
          {
            location: "",
            nature: "",
            note: "",
          },
        ],
        dettagli_danni_veicolo: {
          plate: "",
          format: "",
          type: "",
        },
      },
    ]);
  };

  const handleRemoveDamagedPart = (index: number) => {
    setParts((prev) => prev.filter((p, i) => i !== index));
  };

  const handleAddDamagePersonDetails = () => {
    setPartModal((prev) => ({
      isOpen: prev.isOpen,
      part: Object.assign({}, prev.part, {
        dettagli_danni_persona: [
          ...(prev.part?.dettagli_danni_persona || []),
          {
            location: "",
            nature: "",
            note: "",
          },
        ],
      }),
      index: prev.index,
    }));
  };

  const handleRemoveDamageDetails = (index: number) => {
    const newDettagliDanno = partModal.part?.dettagli_danni_persona.filter((d, i) => i !== index);

    console.log("removing part details ", index);

    console.log("newDettagliDanno ", newDettagliDanno);

    setPartModal((prev) => ({
      isOpen: prev.isOpen,
      part: Object.assign({}, prev.part, {
        dettagli_danno: prev.part?.dettagli_danni_persona.filter((d, i) => i !== index),
      }),
      index: prev.index,
    }));
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
    if (type === "damage_type") {
      setPartModal(
        (prev) =>
          ({
            isOpen: prev.isOpen,
            index: prev.index,
            part: Object.assign({}, prev.part, { tipo_danno: val }),
          } as PartModalType)
      );
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

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        {parts.map((p: PartType, i: number) => (
          <PartStyled>
            <PartResumeStyled onClick={() => showPartModal(i)}>
              {p.numero_pd ? p.numero_pd : "Configura Partita Danno"}
            </PartResumeStyled>
            <PartSpacer />
            <PartDeleteButton
              onClick={() => handleRemoveDamagedPart(i)}
              icon={<RiDeleteBinFill />}
              shape="circle"
              type="primary"
            />
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
        <FormSubTitle>Dati partita danno</FormSubTitle>
        <Row>
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
        </Row>

        {partModal.part?.tipo_danno === "Persone" && (
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
                {partModal.part?.dettagli_danni_persona.map((d, i) => (
                  <Col>
                    <Row>
                      <DamagedPartPerson index={i} details={partModal.part?.dettagli_danni_persona[i]!} />
                      <RiDeleteBinFill onClick={() => handleRemoveDamageDetails(i)} />
                    </Row>
                    <HrStyled />
                  </Col>
                ))}

                {partModal.part?.dettagli_danni_persona.length! < 3 && (
                  <Button type="primary" size="small" onClick={handleAddDamagePersonDetails}>
                    +
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )}

        {partModal.part?.tipo_danno === "Veicolo" && (
          <>
            <FormSubTitle>Dettaglio danni al veicolo</FormSubTitle>

            <Row>
              <DamagedPartVehicle details={partModal.part?.dettagli_danni_veicolo!} />
            </Row>
          </>
        )}
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
