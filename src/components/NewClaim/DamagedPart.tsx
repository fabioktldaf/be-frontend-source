import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, DatePicker, Modal } from "antd";
import { CenteredRow, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

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

type NaturaDannoType = {};

type TipoDannoType = {
  natura_danno: NaturaDannoType;
};

type PartType = {
  subject: any;
  numero_pd: string;
  data_pd: string;
  stato_pd: string;
  tipo_ruolo: string;
  tipo_danno: TipoDannoType;
};

type PartModalType = {
  isOpen: boolean;
  partType?: PartType;
  index: number;
};

const DamagedPart = () => {
  const [parts, setParts] = useState<PartType[]>([]);
  const [partModal, setPartModal] = useState<PartModalType>({
    isOpen: false,
    partType: undefined,
    index: -1,
  });

  const handlePartModalOk = () => {
    const updatedParts = parts.map(
      (p: PartType, i: number) => (i === partModal.index ? partModal.partType : p) as PartType
    );
    setParts(updatedParts);
  };

  const handleAddDamagedPart = () => {
    setParts((prev) => [
      ...prev,
      {
        subject: {},
        numero_pd: "",
        data_pd: "",
        stato_pd: "",
        tipo_ruolo: "",
        tipo_danno: {
          natura_danno: {},
        },
      },
    ]);
  };

  const handleRemoveDamagedPart = (index: number) => {
    setParts((prev) => prev.filter((p, i) => i !== index));
  };

  const showPartModal = (index: number) => {
    setPartModal({
      isOpen: true,
      partType: parts[index],
      index,
    });
  };

  const cancelPartModal = () => {
    setPartModal((prev) => ({
      isOpen: false,
      partType: prev.partType,
      index: prev.index,
    }));
  };

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        {parts.map((p: PartType, i: number) => (
          <PartStyled>
            <PartResumeStyled onClick={() => showPartModal(i)}>
              {p.numero_pd ? p.numero_pd : "Inserisci Dati"}
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
            Add Partita Danno
          </Button>
        </CenteredRow>
      </DamagedPartStyled>
      <Modal
        title="Configura Partita Danno"
        open={partModal.isOpen}
        onCancel={cancelPartModal}
        onOk={handlePartModalOk}
        width={900}
      >
        ...
      </Modal>
    </>
  );
};

export default DamagedPart;
