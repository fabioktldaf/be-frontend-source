import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal, Popconfirm } from "antd";
import { CenteredRow, Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import DamagedPartModalContent from "./DamagedPartModalContent";

const DamagedPartStyled = styled.div`
  margin-bottom: 2em;
`;

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

export const DamageTypeCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
];

export const DamageTypeNoCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
  { value: "Location", label: "Ubicazione" },
  { value: "Generic", label: "Generico" },
];

export type PartChangeType = "damage_type" | "collision_point" | "person_damage" | "role_type";

export type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

export type SubjectPersonalDataType = {
  id: number;
};

export type PartDamagedDetailsPerson = {
  personWoundedPoints: string[];
  personlData?: SubjectPersonalDataType;
};

export type PartDamagedDetailsVehicle = {
  plate: string;
  format: string;
  type: string;
  collisionPoints: string[];
};

export type PartDamagedDetailsThing = {};

export type DamagedType = {
  tipo_ruolo: string;
  tipo_danno: PartChangeTypeType;
  details: PartDamagedDetailsPerson | PartDamagedDetailsVehicle | PartDamagedDetailsThing;
  note: string;
};

export type PartType = {
  subject: any;
  numero_pd: string;
  danni: DamagedType[];
  data_pd: string;
};

export type PartModalType = {
  isOpen: boolean;
  part?: PartType;
  index: number;
};

const getNewDamagedPartNumber = () => Date.now().toString();

export const OwnerRolesType = [
  { value: "---", label: "---" },
  { value: "CP", label: "CP - Conducente proprietario" },
  { value: "TP", label: "TP - Trasportato proprietario" },
  {
    value: "NP",
    label: "NP - Proprietario non presente sul veicolo",
  },
];

export const NotOwnerRolesType = [
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
  {
    value: "TD",
    label: "TD - Terzo Danneggiato",
  },
];

const DamagedParts = () => {
  const { t } = useTranslation();
  const [parts, setParts] = useState<PartType[]>([
    {
      subject: {},
      numero_pd: getNewDamagedPartNumber(),
      data_pd: "",
      danni: [
        {
          tipo_ruolo: "",
          tipo_danno: "Vehicle",
          note: "",
          details: {
            plate: "AB123DC",
            format: "Targa Italiana",
            type: "Autovettura",
            collisionPoints: [],
          } as PartDamagedDetailsVehicle,
        },
      ],
    },
  ]);

  const [partModal, setPartModal] = useState<PartModalType>({
    isOpen: false,
    part: undefined,
    index: -1,
  });

  const handlePartModalOk = () => {
    const updatedPart = Object.assign({}, partModal) as PartModalType;
    updatedPart.isOpen = false;

    const updatedParts = parts.map(
      (p: PartType, i: number) => (i === partModal.index ? updatedPart.part : p) as PartType
    );

    setPartModal({ part: updatedPart.part, index: -1, isOpen: false });
    setParts(updatedParts);
  };

  const handleAddDamagedPart = () => {
    const updatedParts = [
      ...parts,
      {
        subject: {},
        numero_pd: getNewDamagedPartNumber(),
        data_pd: "",
        danni: [],
      },
    ];
    setParts(updatedParts);
  };

  const handleRemoveDamagedPart = (index: number) => {
    setParts((prev) => prev.filter((p, i) => i !== index));
  };

  const showPartModal = (index: number) => {
    const partToEdit = parts[index];
    console.log("partToEdit ", partToEdit);

    setPartModal({
      isOpen: true,
      part: partToEdit,
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

    if (type === "damage_type") {
      updatedPart.danni[val.index].tipo_danno = val.value;
    }

    if (type === "collision_point") {
      (updatedPart!.danni[val.index].details as PartDamagedDetailsVehicle).collisionPoints = val.value.sort(
        (a: string, b: string) => (a > b ? 1 : -1)
      );
    }

    if (type === "person_damage") {
      (updatedPart!.danni[val.index].details as PartDamagedDetailsPerson).personWoundedPoints = val;
    }

    if (type === "role_type") {
      updatedPart.danni![val.index].tipo_ruolo = val.value;
    }

    console.log("updatedPart ", updatedPart);

    setPartModal({
      isOpen: partModal.isOpen,
      index: partModal.index,
      part: updatedPart,
    } as PartModalType);
  };

  const renderDamagedPartResume = (p: PartType) => {
    return `N° ${p.numero_pd}`;
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
            add partita danno
          </Button>
        </CenteredRow>
      </DamagedPartStyled>
      <Modal
        title={`Configura Partita Danno n° ${partModal.part?.numero_pd}`}
        open={partModal.isOpen}
        width={900}
        footer={
          <>
            <Popconfirm
              title="Confermi di voler cancellare i dati inseriti?"
              onConfirm={cancelPartModal}
              okText="Si"
              cancelText="No"
            >
              <Button>Cancella</Button>
            </Popconfirm>
            <Button type="primary" onClick={handlePartModalOk}>
              Salva
            </Button>
          </>
        }
      >
        {partModal.part && <DamagedPartModalContent part={partModal.part} isOwner={partModal.index === 0} />}
      </Modal>
    </>
  );
};

export default DamagedParts;
